/**
 * This is a public service and is exposed as a provider in public.module.ts.
 * Note that in this case we do not provide the service in root. This ensures that it is always injected using an injection token and we have a single instance across all modules.
 */
export declare class TokenService {
    private readonly providers;
    setProvider(tokenName: string, service: any): void;
    getProvider<T>(tokenName: string): T;
}
