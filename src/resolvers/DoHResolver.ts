import { Resolver } from "@/classes/Resolver";
import { query, wellknown, combineTXT, HTTPEndpoint, } from "dns-query";

export type ResolveType = "A" | "CNAME" | "NS" | "TXT";

/**
 * The `DoHResolver` class extends the `Resolver` class to provide DNS resolution
 * using DNS over HTTPS (DoH).
 */
export class DoHResolver extends Resolver {

    /**
     * The DNS endpoints to be used for resolution.
     */
    private DNS:undefined|HTTPEndpoint[];

    /**
     * Constructs a new `DoHResolver` instance.
     * @param DNS - The DNS endpoints to be used for resolution. Defaults to well-known endpoints.
     */
    constructor(DNS?:HTTPEndpoint[]) {
        super();
        if (DNS) { this.DNS = DNS; }
    }

    /**
     * Resolves the given domain name to the specified DNS record type.
     * @param domain - The domain name to resolve.
     * @param type - The type of DNS record to resolve (e.g., "A", "CNAME", "NS", "TXT").
     * @returns A promise that resolves to an array of strings containing the resolved DNS records.
     * @throws Will log an error message if the resolution fails.
     */
    private async resolve(domain: string, type: ResolveType): Promise<string[]> {
        try {
            const response = await query(
                { question: { type, name: domain } },
                { endpoints: this.DNS }
            );
            if (response.answers) {
                if (type === 'TXT') {
                    return response.answers.map(answer => combineTXT(answer.data as Uint8Array[]).toString()) || [];
                }
                return response.answers.map(answer => answer.data) as string[] || [];
            } else {
                return [];
            }
        } catch (error) {
            console.error(`[DoHResolver] Error resolving ${type} for ${domain}:`, error);
            return [];
        }
    }

    /**
     * Resolves the given domain name to an array of "A" records.
     * @param domain - The domain name to resolve.
     * @returns A promise that resolves to an array of strings containing the resolved "A" records.
     */
    async A(domain: string): Promise<string[]> {
        return await this.resolve(domain, "A");
    }

    /**
     * Resolves the given domain name to an array of "CNAME" records.
     * @param domain - The domain name to resolve.
     * @returns A promise that resolves to an array of strings containing the resolved "CNAME" records.
     */
    async CNAME(domain: string): Promise<string[]> {
        return await this.resolve(domain, "CNAME") as string[];
    }

    /**
     * Resolves the given domain name to an array of "NS" records.
     * @param domain - The domain name to resolve.
     * @returns A promise that resolves to an array of strings containing the resolved "NS" records.
     */
    async NS(domain: string): Promise<string[]> {
        return await this.resolve(domain, "NS") as string[];
    }

    /**
     * Resolves the given domain name to an array of "TXT" records.
     * @param domain - The domain name to resolve.
     * @returns A promise that resolves to an array of strings containing the resolved "TXT" records.
     */
    async TXT(domain: string): Promise<string[]> {
        return await this.resolve(domain, "TXT") as string[];
    }
}

export default new DoHResolver;
