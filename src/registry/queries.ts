import {JsonRpcProvider, ObjectId} from "@mysten/sui.js";
import {Registry} from "./index";

async function getRegistry(id: ObjectId, rpc: JsonRpcProvider): Promise<Registry> {
    const objectResponse = await rpc.getObject({
        id,
        options: {
            showContent: true
        }
    });

    if(objectResponse.data) {
        const registryFields = objectResponse.data.content['fields'];

        return {
            id,
            registry_cap: registryFields.registry_cap,
            version: registryFields.version,

            domain_tld: registryFields.domain_tld,
            treasury_wallet: registryFields.treasury_wallet,

            affiliate_basis_points: registryFields.affiliate_basis_points,
            total_domains: registryFields.total_domains,
            timestamp: registryFields.timestamp
        };
    }

    return null;
}

export {
    getRegistry
};