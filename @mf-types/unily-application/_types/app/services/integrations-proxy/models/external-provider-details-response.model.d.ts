import { IntegrationDetailsResponse } from './integration-details-response.model';
/**
 * Response model of about request.
 */
export declare class ExternalProviderDetailsResponse {
    /** The fallback integration details */
    fallbackIntegrationDetails: IntegrationDetailsResponse;
    /** The logged in users identity */
    userIdentity: string;
    /** The provider matched with the URL */
    matchingProvider: string;
    /** All available providers */
    availableProviders: string[];
    /** Is the user logged in via the provider */
    loggedInViaProvider: boolean;
    /** The fallback integration id */
    fallBackIntegrationId: string | null;
    /** The key for the fallback integration */
    fallBackIntegrationKey: string;
    /** Is the user logged in via the fallback integration */
    loggedInViaFallbackIntegration: boolean;
    /** Is the user logged in  */
    loggedIn: boolean;
    /** Is the user logged in via azure */
    loggedInViaAzure: boolean;
    /** Token details */
    tokenInformation: object;
    constructor(fallbackIntegrationDetails: IntegrationDetailsResponse, userIdentity: string, matchingProvider: string, availableProviders: string[], loggedInViaProvider: boolean, fallBackIntegrationId: string, fallBackIntegrationKey: string, loggedInViaFallbackIntegration: boolean, loggedIn: boolean, loggedInViaAzure: boolean, tokenInformation: object);
}
