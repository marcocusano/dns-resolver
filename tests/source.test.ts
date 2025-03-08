import { DoHResolver } from "../src";

// Describe the test suite for DNS Resolver
describe("[SOURCE] DNS Resolver Tests", () => {

    //////////////////
    // Expectations //
    //////////////////

    // Define the domain to be tested
    const domain = 'marcocusano.dev';

    // Expected responses for different DNS record types
    const expectResponses = {
        a: '51.38.125.136',
        ns: 'ns102.ovh.net',
        txt: `1|www.${domain}` // Remove www for subdomains
    }

    ///////////
    // Tests //
    ///////////

    // Test case for resolving A records
    test("DoHResolver: Resolve A", async () => {
        const response = await (new DoHResolver).A(domain);
        expect(response.length).toBeGreaterThan(0);
        expect(response).toEqual(expect.arrayContaining([expectResponses.a]));
    });

    // Test case for resolving NS records
    test("DoHResolver: Resolve NS", async () => {
        const response = await (new DoHResolver).NS(domain);
        expect(response.length).toBeGreaterThan(0);
        expect(response).toEqual(expect.arrayContaining([expectResponses.ns]));
    });

    // Test case for resolving TXT records
    test("DoHResolver: Resolve TXT", async () => {
        const response = await (new DoHResolver).TXT(domain);
        expect(response.length).toBeGreaterThan(0);
        expect(response).toEqual(expect.arrayContaining([expectResponses.txt]));
    });

});
