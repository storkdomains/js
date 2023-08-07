import {ObjectId, SuiAddress, TransactionBlock} from "@mysten/sui.js";
import {ApiClient} from "../api";
import {getDomainObject, getOwner, resolveAddress} from "./queries";
import * as methods from "./methods";

/*
 * Structs
 */

export interface Domain {
    id: ObjectId;
    version: number;

    owner: SuiAddress;

    domain_name: String;
    domain_tld: String;

    name: String;
    image: String;

    // object id to table
    text_records: ObjectId;
    timestamp: number;
}

export enum ChainType {
    ALGO='ALGO',
    APT='APT',
    ARB='ARB',
    AVAX='AVAX',
    BASE='BASE',
    BNB='BNB',
    BTC='BTC',
    BCH='BCH',
    ADA='ADA',
    ATOM='ATOM',
    DOGE='DOGE',
    ETH='ETH',
    FTM='FTM',
    HBAR='HBAR',
    LTC='LTC',
    OP='OP',
    DOT='DOT',
    SOL='SOL',
    SUI='SUI',
    XTZ='XTZ'
}

/*
 * Params
 */

export interface AddAddressBody {
    domain: ObjectId;
    chain: ChainType;
    address: string;
}

export interface RemoveAddressBody {
    domain: ObjectId;
    chain: ChainType;
}

export interface AddAddressesBody {
    domain: ObjectId;
    chains: [ChainType],
    addresses: [string];
}

export interface RemoveAddressesBody {
    domain: ObjectId;
    chains: [ChainType];
}

export interface SetTextRecordsBody {
    domain: ObjectId;
    keys: [string];
    values: [string];
}

export interface RemoveTextRecordsBody {
    domain: ObjectId;
    keys: [string];
}

export interface SetImageBody {
    domain: ObjectId;
    image_url: string;
}


export class DomainsApi {

    _client: ApiClient;

    constructor(client: ApiClient) {
        this._client = client;
    }

    /*
     * Queries
     */

    async resolveAddress(domain: string, chain: ChainType): Promise<string> {
        return resolveAddress(domain, chain, this._client.provider);
    }

    async getOwner(domain: string): Promise<SuiAddress> {
        return getOwner(domain, this._client.provider);
    }

    async getDomainObject(domain: string): Promise<Domain> {
        return getDomainObject(domain, this._client.provider);
    }

    /*
     * Methods
     */

    async addAddress(txBlock: TransactionBlock, body: AddAddressBody) {
        return methods.addAddress(txBlock, body);
    }

    async removeAddress(txBlock: TransactionBlock, body: RemoveAddressBody) {
        return methods.removeAddress(txBlock, body);
    }

    async addAddresses(txBlock: TransactionBlock, body: AddAddressesBody) {
        return methods.addAddresses(txBlock, body);
    }

    async removeAddresses(txBlock: TransactionBlock, body: RemoveAddressesBody) {
        return methods.removeAddresses(txBlock, body);
    }

    async setTextRecords(txBlock: TransactionBlock, body: SetTextRecordsBody) {
        return methods.setTextRecords(txBlock, body);
    }

    async removeTextRecords(txBlock: TransactionBlock, body: RemoveTextRecordsBody) {
        return methods.removeTextRecords(txBlock, body);
    }

    async setImage(txBlock: TransactionBlock, body: SetImageBody) {
        return methods.setImage(txBlock, body);
    }

}