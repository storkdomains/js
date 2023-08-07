import {InternalRegisterBody} from "./index";
import {TransactionBlock} from "@mysten/sui.js";
import {STORK_DOMAINS_PACKAGE_ID} from "../objects";

async function internalRegister(txBlock: TransactionBlock, body: InternalRegisterBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::register::internal_register`,
        arguments: [
            // object ids
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.registry_cap,
            },
            {
                kind: 'Input',
                index: 1,
                type: 'object',
                value: body.registry,
            },

            // domain & custody_address
            {
                kind: 'Input',
                index: 2,
                type: 'pure',
                value: body.domain,
            },
            {
                kind: 'Input',
                index: 3,
                type: 'pure',
                value: body.custody_address,
            },

            // clock
            {
                kind: 'Input',
                index: 4,
                type: 'object',
                value: '0x6'
            }
        ]
    });
}

export { internalRegister };