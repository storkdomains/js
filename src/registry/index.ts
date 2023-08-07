import {ObjectId, SuiAddress, TransactionBlock} from "@mysten/sui.js";
import {ApiClient} from "../api";
import {getRegistry} from "./queries";
import {internalRegister} from "./methods";

/*
 * Structs
 */

export interface Registry {
    id: ObjectId;
    registry_cap: ObjectId;
    version: number;

    domain_tld: String;
    treasury_wallet: SuiAddress;

    affiliate_basis_points: number;
    total_domains: number;

    timestamp: number;
}

/*
 * Params
 */

export interface InternalRegisterBody {
    registry_cap: ObjectId;
    registry: ObjectId;
    domain: string;
    custody_address: SuiAddress;
}

export class RegistryApi {

    _client: ApiClient;

    constructor(client: ApiClient) {
        this._client = client;
    }

    /*
     * Queries
     */

    async getRegistry(id: ObjectId) {
        return getRegistry(id, this._client.provider);
    }

    /*
     * Methods
     */

    async internalRegister(txBlock: TransactionBlock, body: InternalRegisterBody) {
        return internalRegister(txBlock, body);
    }
}