/**
 * The Application Context service.
 */
export declare class ApplicationContextService {
    private readonly applicationContextService;
    constructor(applicationContextService: any);
    /**
     * @returns Resolves to true when running from a mobile context.
     */
    isMobile(): Promise<boolean>;
    /**
     * @returns Resolves to true when running from a mobile application context.
     */
    isMobileApp(): Promise<boolean>;
    /**
     * @returns Resolves to the URL path of the host, for example: https://envname.unily.com
     */
    getHostUrl(): Promise<string>;
    /**
     * @returns Resolves to the URL path of the CMS, for example: https://envname-cms.unily.com
     */
    getCmsUrl(): Promise<string>;
    /**
     * @returns Resolves to the ISO code of the default language.
     */
    getDefaultLanguageIsoCode(): Promise<string>;
    /**
     * @returns Resolves to the SPA instance id. This id would be consistent throughout the lifetime of any given SPA instance.
     */
    getCurrentSpaInstanceId(): Promise<string>;
    /**
     * @returns Resolves to the elapsed time in ms since the initialisation of the SPA instance.
     */
    getSpaInstanceUptimeMs(): Promise<number>;
    /**
     * @returns Resolves to the elapsed time in ms since initiating navigation to the current route.
     */
    getRouteInstanceUptimeMs(): Promise<number>;
    /**
     * @returns Resolves to the current item's view id.
     */
    getViewId(): Promise<string>;
    /**
    * @returns Resolves to true when the current page is being displayed within the preview frame.
    */
    isInPreviewMode(): Promise<boolean>;
}
