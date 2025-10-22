/**
 * A model for a Page Impression
 */
export declare class PageImpressionModel {
    /** The page URL path. */
    readonly url: string;
    /** The page title. */
    readonly title: string;
    /** The page type name. */
    readonly pageTypeName: string;
    /** The referrer page URL path. */
    readonly referrer: string;
    /** The page ID. */
    readonly pageId: number;
    constructor(url: string, title: string, pageTypeName: string, referrer: string, pageId: number);
}
