## @storkdomains/js
Client library to interact with the Stork Domains smart contract.

Install with [npm](https://www.npmjs.com/):
```shell
$ npm install @storkdomains/js
```

Install with [yarn](https://yarnpkg.com):
```shell
$ yarn add @storkdomains/js
```

### Examples
Below are some of our available query methods.

#### Resolve a Domain to its addresses
This is the core query of Stork Domains and resolves a domain to its configured address.

```typescript
import {ClientApi, ChainType} from '@storkdomains/js';

const api = new ClientApi();

// Resolve domain to its Sui Address
const sui_address = await api.domains.resolveAddress(
    "anthony.stork", ChainType.SUI
);

// Resolve domain to its ETH Address
const eth_address = await api.domains.resolveAddress(
    "anthony.stork", ChainType.ETH
);
```

#### Fetch a Domain Object
```typescript
const domain = await api.domains.getDomainObject("anthony.stork");
```

#### Get the owner of the Domain Object
This will return a Sui Address because Stork Domains are natively stored on the Sui blockchain.
```typescript
const owner: SuiAddress = await api.domains.getOwner("anthony.stork");
```

### Open Source
This package is open source and available at [github.com/storkdomains/js](https://github.com/storkdomains/js).

### Support
If you have integrated with Stork Domains or require assistance with integration, please ping us on our discord at [discord.gg/stork](https://discord.gg/stork), or email us at [anthony@stork.domains](mailto:anthony@stork.domains).