/**
 * A model for integrations proxy request payload.
 */
export declare class IntegrationsProxyRequestPayload {
    /** The proxy request url. */
    readonly url: string;
    /** The proxy http verb of request. (GET,POST,PUT,DELETE,PATCH) */
    readonly httpVerb: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    /** The proxy request body. */
    readonly body?: string;
    /** The proxy request headers. */
    readonly headers: Array<{
        key: string;
        value: string;
    }>;
    /** Integration key for integration proxy requests. */
    integrationKey?: string;
    /** True to force token refresh. */
    forceTokenRefresh?: boolean;
    /** True if proxy response headers should be returned in response. */
    includeHeadersInResponse?: boolean;
    constructor(url: string, httpVerb?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', body?: string, headers?: Array<{
        key: string;
        value: string;
    }>);
    addHeader(key: string, value: string): void;
}
