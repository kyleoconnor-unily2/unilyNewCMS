import { IntegrationsProxyRequestPayload } from './models/request-payload.model';
import { IntegrationProxyServiceResponse } from './models/integration-proxy-response.model';
import { ExternalProviderDetailsResponse } from './models/external-provider-details-response.model';
/**
 * Provides access to functions concerning the Integrations Proxy
 */
export declare class IntegrationsProxyService {
    private readonly integrationsProxyService;
    constructor(integrationsProxyService: any);
    /**
     * Creates a request payload to be used to make proxy requests
     * @returns payload of type IntegrationsProxyRequestPayload.
     */
    createRequestPayload(url: string, httpVerb?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', body?: object | string, headers?: Array<{
        key: string;
        value: string;
    }>): IntegrationsProxyRequestPayload;
    /**
     * Used in Azure AD Integrations
     * @returns Promise to resolve azure proxy request response
     */
    azureRequest(payload: IntegrationsProxyRequestPayload, includeHeadersInResponse: boolean): Promise<IntegrationProxyServiceResponse>;
    /**
     * Used in Custom Requests
     * @returns Promise to resolve custom proxy request response
     */
    customRequest(payload: IntegrationsProxyRequestPayload, includeHeadersInResponse: boolean): Promise<IntegrationProxyServiceResponse>;
    /**
     * Used in External Requests
     * @returns Promise to resolve external proxy request response
     */
    externalRequest(payload: IntegrationsProxyRequestPayload, includeHeadersInResponse: boolean): Promise<IntegrationProxyServiceResponse>;
    /**
     * Used in About Requests
     * @returns Promise to resolve about request response
     */
    about(url: string): Promise<ExternalProviderDetailsResponse>;
    /**
     * Used in OAuth2 Code Grant Integrations OAuth2 JWT Assertion Integrations OAuth2 Self-Issued SAML Assertion
     * @returns Promise to resolve integration proxy request response
     */
    integrationRequest(payload: IntegrationsProxyRequestPayload, integrationKey: string, forceTokenRefresh?: boolean, includeHeadersInResponse?: boolean): Promise<IntegrationProxyServiceResponse>;
}
