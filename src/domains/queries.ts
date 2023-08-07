import {JsonRpcProvider, SuiAddress} from "@mysten/sui.js";
import {ChainType, Domain} from "./index";
import {ASCII_STRING_TYPE, REGISTRIES} from "../objects";

export async function resolveAddress(domain: string, chain: ChainType, provider: JsonRpcProvider): Promise<string> {
    const parts = domain.toLowerCase().split('.');

    if(parts.length == 2) {
        const domain_name = parts[0];
        const domain_tld = parts[1];

        if(domain_tld === "stork") {
            const domainObjectResponse = await provider.getDynamicFieldObject({
                parentId: REGISTRIES.stork,
                name: {
                    type: ASCII_STRING_TYPE,
                    value: domain_name,
                }
            });

            if(domainObjectResponse.data) {
                const domainObjectId = domainObjectResponse.data.content['fields']['value'];
                const addressResponse = await provider.getDynamicFieldObject({
                    parentId: domainObjectId,
                    name: {
                        type: ASCII_STRING_TYPE,
                        value: chain,
                    }
                });

                if(addressResponse.data) {
                    return addressResponse.data.content['fields']['value'];
                }
            }
        }
    }

    return null;
}

export async function getOwner(domain: string, provider: JsonRpcProvider): Promise<SuiAddress> {
    const parts = domain.toLowerCase().split('.');

    if(parts.length == 2) {
        const domain_name = parts[0];
        const domain_tld = parts[1];

        if(domain_tld === "stork") {
            const domainIdResponse = await provider.getDynamicFieldObject({
                parentId: REGISTRIES.stork,
                name: {
                    type: ASCII_STRING_TYPE,
                    value: domain_name,
                }
            });


            if(domainIdResponse.data) {
                const domainObjectId = domainIdResponse.data.content['fields']['value'];
                const domainObjectResponse = await provider.getObject({
                    id: domainObjectId,
                    options: {
                        showOwner: true
                    }
                });

                if(domainObjectResponse.data) {
                    return domainObjectResponse.data.owner['AddressOwner'];
                }
            }
        }
    }

    return null;
}

export async function getDomainObject(domain: string, provider: JsonRpcProvider): Promise<Domain> {
    const parts = domain.toLowerCase().split('.');

    if(parts.length == 2) {
        const domain_name = parts[0];
        const domain_tld = parts[1];

        if(domain_tld === "stork") {
            const domainIdResponse = await provider.getDynamicFieldObject({
                parentId: REGISTRIES.stork,
                name: {
                    type: ASCII_STRING_TYPE,
                    value: domain_name,
                }
            });


            if(domainIdResponse.data) {
                const domainObjectId = domainIdResponse.data.content['fields']['value'];
                const domainObjectResponse = await provider.getObject({
                    id: domainObjectId,
                    options: {
                        showContent: true,
                        showOwner: true
                    }
                });

                if(domainObjectResponse.data) {
                    const domainFields = domainObjectResponse.data.content['fields'];

                    return {
                        id: domainFields['id']['id'],
                        version: Number(domainFields['version']),

                        owner: domainObjectResponse.data.owner['AddressOwner'],

                        domain_name: domainFields['domain_name'],
                        domain_tld: domainFields['domain_tld'],

                        name: domainFields['name'],
                        image: domainFields['image'],

                        text_records: domainFields['text_records']['fields']['id']['id'],
                        timestamp: Number(domainFields['timestamp'])
                    }
                }
            }
        }
    }

    return null;
}