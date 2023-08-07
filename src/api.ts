import {JsonRpcProvider, mainnetConnection} from "@mysten/sui.js";
import {DomainsApi} from "./domains";
import {RegistryApi} from "./registry";

class ApiClient {

    provider: JsonRpcProvider;
    domains: DomainsApi;
    registry: RegistryApi;

    constructor(provider: JsonRpcProvider = new JsonRpcProvider(mainnetConnection)) {
        this.provider = provider;

        this.domains = new DomainsApi(this);
        this.registry = new RegistryApi(this);
    }
}

export { ApiClient };