import { IntegrationDetails } from './integration-details.model';
/**
 * Integration high level details model.
 */
export declare class IntegrationDetailsResponse {
    /** Details */
    integrationDetails: IntegrationDetails;
    /** A unique identifier for the integration that can be used as a reference. */
    integrationKey: string;
    /** Type of the integration (OAuth2 Client Credentials, OAuth2 JWT Assertion etc..) */
    type: string;
    /** Is the user logged in  */
    loggedIn: boolean;
    /** Token details */
    tokenInformation: object;
    constructor(integrationDetails: IntegrationDetails, integrationKey: string, type: string, loggedIn: boolean, tokenInformation: object);
}
