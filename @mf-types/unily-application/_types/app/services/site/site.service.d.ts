import { SiteModel } from './site.model';
/**
 * The Site service.
 */
export declare class SiteService {
    private readonly siteService;
    constructor(siteService: any);
    /**
     * @returns Resolves to the site currently loaded.
     */
    getCurrentSite(): Promise<SiteModel>;
    /**
     * @returns Resolves to the ID of the root site.
     */
    getRootSiteId(): Promise<number>;
}
