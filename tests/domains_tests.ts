import {JsonRpcProvider, mainnetConnection} from "@mysten/sui.js";
import {ApiClient} from "../src";
import {ChainType} from "../src/domains";
import * as assert from 'assert';
import {REGISTRIES} from "../src/objects";

describe("DomainApi - Query Tests", async () => {
    const client = new ApiClient();
    const ADMIN_ADDRESS = "0x015ef4a7d4800fd1c8e557add32880ff6e945fa5beaf00cd6540deb03c337b41";
    const ANTHONY_STORK_ADDRESS = "0xb969e8ff09bdc4e440c8d9bf094f1ca027a7d6bb252db341aa10c55cb550cf7f";

    it("resolveAddress", async () => {
        const address = await client.domains.resolveAddress("anthony.stork", ChainType.SUI);
        assert.equal(address, ADMIN_ADDRESS);
    });

    it("getOwner", async () => {
        const owner = await client.domains.getOwner("anthony.stork");
        assert.equal(owner, ADMIN_ADDRESS);
    });

    it("getDomainObject", async () => {
        const domainObject = await client.domains.getDomainObject("anthony.stork");

        assert.equal(domainObject.id, ANTHONY_STORK_ADDRESS);
        assert.equal(domainObject.owner, ADMIN_ADDRESS);
        assert.equal(domainObject.domain_name, "anthony");
        assert.equal(domainObject.domain_tld, "stork");
        assert.equal(domainObject.name, "anthony.stork");
    });
});

describe("RegistryApi - Query Tests", async () => {
    const rpc = new JsonRpcProvider(mainnetConnection);
    const client = new ApiClient(rpc);

    it("getRegistry", async () => {
        const registry = await client.registry.getRegistry(REGISTRIES.stork);

        assert.equal(registry.id, "0x73480218cb3d81419a4be118be5af3e8586980780a50dbf7d18b3c5d98cb89a6");
        assert.equal(registry.domain_tld, "stork");
        assert.ok(registry.total_domains >= 1);
    });

});