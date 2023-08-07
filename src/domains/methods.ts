import {TransactionBlock} from "@mysten/sui.js";
import {
    AddAddressBody,
    AddAddressesBody,
    RemoveAddressBody,
    RemoveAddressesBody, RemoveTextRecordsBody,
    SetImageBody,
    SetTextRecordsBody
} from "./index";
import {ASCII_STRING_TYPE, STORK_DOMAINS_PACKAGE_ID} from "../objects";

async function addAddress(txBlock: TransactionBlock, body: AddAddressBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::domain::add_address`,
        arguments: [
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.domain,
            },
            {
                kind: 'Input',
                index: 1,
                type: 'pure',
                value: body.chain
            },
            {
                kind: 'Input',
                index: 2,
                type: 'pure',
                value: body.address
            }
        ]
    });
}

async function removeAddress(txBlock: TransactionBlock, body: RemoveAddressBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::domain::remove_address`,
        arguments: [
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.domain,
            },
            {
                kind: 'Input',
                index: 1,
                type: 'pure',
                value: body.chain
            },
        ]
    });
}

async function addAddresses(txBlock: TransactionBlock, body: AddAddressesBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::domain::add_address`,
        arguments: [
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.domain,
            },
            txBlock.pure(
                body.addresses,
                `vector<${ASCII_STRING_TYPE}>`
            ),
        ]
    });
}

async function removeAddresses(txBlock: TransactionBlock, body: RemoveAddressesBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::domain::remove_addresses`,
        arguments: [
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.domain,
            },
            txBlock.pure(
                body.chains,
                `vector<${ASCII_STRING_TYPE}>`
            )
        ]
    });
}

async function setTextRecords(txBlock: TransactionBlock, body: SetTextRecordsBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::domain::set_text_records`,
        arguments: [
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.domain,
            },
            txBlock.pure(
                body.keys,
                `vector<${ASCII_STRING_TYPE}>`
            ),
            txBlock.pure(
                body.values,
                `vector<${ASCII_STRING_TYPE}>`
            )
        ]
    });
}

async function removeTextRecords(txBlock: TransactionBlock, body: RemoveTextRecordsBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::domain::remove_text_records`,
        arguments: [
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.domain,
            },
            txBlock.pure(
                body.keys,
                `vector<${ASCII_STRING_TYPE}>`
            )
        ]
    });
}

async function setImage(txBlock: TransactionBlock, body: SetImageBody) {
    txBlock.moveCall({
        target: `${STORK_DOMAINS_PACKAGE_ID}::domain::set_image`,
        arguments: [
            {
                kind: 'Input',
                index: 0,
                type: 'object',
                value: body.domain,
            },
            {
                kind: 'Input',
                index: 1,
                type: 'pure',
                value: body.image_url
            }
        ]
    });
}

export {
    addAddress,
    removeAddress,
    addAddresses,
    removeAddresses,
    setTextRecords,
    removeTextRecords,
    setImage
};