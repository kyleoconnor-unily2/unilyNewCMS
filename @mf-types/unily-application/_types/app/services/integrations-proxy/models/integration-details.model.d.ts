/**
 * Integration low level details model.
 */
export declare class IntegrationDetails {
    /** The integration descrition */
    description: string;
    /** The image id set for the integration */
    imageMediaId: string;
    /** The image url set for the integration */
    imageUrl: string;
    /** A unique identifier for the integration that can be used as a reference. */
    integrationKey: string;
    /** The root URL of the end points being called. This must match API requests. */
    domain: string;
    /** To be used where the domain for API calls and the front end domain for browsing to an external provider differ. */
    frontendDomain: string;
    /** Original author name */
    creatorName: string;
    /** Original author id */
    creatorId: number;
    /** Editor name */
    writerName: string;
    /** Date created */
    createDate: string;
    /** Date updated */
    updateDate: string;
    /** Node name */
    nodeName: string;
    /** Title */
    title: string;
    constructor(description: string, imageMediaId: string, imageUrl: string, integrationKey: string, domain: string, frontendDomain: string, creatorName: string, creatorId: number, writerName: string, createDate: string, updateDate: string, nodeName: string, title: string);
}
