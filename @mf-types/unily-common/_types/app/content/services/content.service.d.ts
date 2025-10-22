import { ContentModel } from '../models/content.model';
export declare class ContentService {
    private readonly ts;
    private readonly contentService;
    constructor();
    /**
     * @returns Resolves to an object containing properties related to the current content or member item.
     */
    getCurrentItem(): Promise<ContentModel>;
}
