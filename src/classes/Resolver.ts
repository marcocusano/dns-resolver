export abstract class Resolver {

    abstract A(domain: string):Promise<string[]>;
    abstract CNAME(domain: string):Promise<string[]>;
    abstract NS(domain: string):Promise<string[]>;
    abstract TXT(domain: string):Promise<string[]>;

}