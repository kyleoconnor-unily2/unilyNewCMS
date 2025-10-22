/**
 * A model for integrations proxy service response.
 */
export declare class IntegrationProxyServiceResponse {
    /** the response body of proxy request as string */
    body: string;
    /** the response headers of proxy request */
    headers: Array<{
        key: string;
        value: string[];
    }>;
    constructor(body: string, headers: Array<{
        key: string;
        value: string[];
    }>);
}
