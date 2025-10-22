/**
 * The Tracking Link service.
 */
export declare class TrackingLinkService {
    private readonly trackingLinkService;
    constructor(trackingLinkService: any);
    /**
     * @returns The tracking link for the request payload.
     */
    createContentTrackingLink(action: string, contentId: number, source: object, event: object): Promise<string>;
    /**
     * @returns The tracking link for the request payload.
     */
    createUrlTrackingLink(action: string, url: string, source: object, event: object): Promise<string>;
}
