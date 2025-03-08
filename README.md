# DNS Resolver

A TypeScript library for DNS resolution using DNS over HTTPS (DoH).

## Table of Contents

- [Installation](#installation)
- [Build](#build)
- [Usage](#usage)
- [Options](#options)
- [API](#api)
- [Testing](#testing)
- [License](#license)

---

## Installation

To install the dependencies, run:

```sh
npm install
```

## Build

To build the project, run:

```sh
npm run build
```

This will compile the TypeScript code and generate the output in the `dist` directory.

## Usage

Here's an example of how to use the `DoHResolver` class:

```typescript
import { DoHResolver } from "./dist";

// Create a new instance of DoHResolver
const resolver = new DoHResolver();

// Define the domain to be resolved
const domain = 'example.com';

// Resolve A records
resolver.A(domain).then(records => {
    console.log('A records:', records);
});

// Resolve CNAME records
resolver.CNAME(domain).then(records => {
    console.log('CNAME records:', records);
});

// Resolve NS records
resolver.NS(domain).then(records => {
    console.log('NS records:', records);
});

// Resolve TXT records
resolver.TXT(domain).then(records => {
    console.log('TXT records:', records);
});
```

---

## API

### `DoHResolver`

#### Methods

- `A(domain: string): Promise<string[]>`
  - Resolves the given domain name to an array of "A" records.

- `CNAME(domain: string): Promise<string[]>`
  - Resolves the given domain name to an array of "CNAME" records.

- `NS(domain: string): Promise<string[]>`
  - Resolves the given domain name to an array of "NS" records.

- `TXT(domain: string): Promise<string[]>`
  - Resolves the given domain name to an array of "TXT" records.

#### Options

The `DoHResolver` class can be configured with different DNS endpoints. By default, it uses well-known endpoints.

###### Constructor

```typescript
constructor(DNS = wellknown.endpoints())
```

- `DNS`: A promise that resolves to an array of DNS endpoints to be used for resolution. Each endpoint is an object with the following structure:

```typescript
interface HTTPEndpoint {
    name: string;
    protocol: string;
    port: number;
    host: string;
    path: string;
    method: string;
    ipv4?: string;
    ipv6?: string;
    url: URL;
}
```

###### Example

```typescript
import { DoHResolver } from "./dist";
import { type HTTPEndpoint } from "dns-query";

const customEndpoints:HTTPEndpoint = [
    {
        name: 'google',
        protocol: 'https:',
        port: 443,
        host: '8.8.4.4',
        path: '/dns-query',
        method: 'GET',
        ipv4: '8.8.4.4',
        ipv6: '8.8.4.4',
        url: URL {
            href: 'https: //8.8.4.4/dns-query',
            origin: 'https: //8.8.4.4',
            protocol: 'https:',
            username: '',
            password: '',
            host: '8.8.4.4',
            hostname: '8.8.4.4',
            port: '',
            pathname: '/dns-query',
            search: '',
            searchParams: URLSearchParams {},
            hash: ''
        }
    }
];

const resolver = new DoHResolver(customEndpoints);
```

##### Reference

For more details on the `dns-query` library and its usage, refer to the [dns-query documentation](https://www.npmjs.com/package/dns-query). Also, you can find more in [WELLKNOWN.md](WELLKNOWN.md)

---

## Testing

To run the tests, use the following command:

```sh
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.