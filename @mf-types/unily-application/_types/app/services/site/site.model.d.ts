/**
 * A model for a site.
 */
export declare class SiteModel {
    /** The site's ID. */
    readonly id: number;
    /** The site's title. */
    readonly title: string;
    /** The site's URL path. */
    readonly urlPath: string;
    /** The site's CSS class which will be appended to the HTML tag for content from this site. Value is prepended with 'unilysite-' on load. */
    readonly cssClass: string;
    /** The site's URL path to the default page. */
    readonly defaultPageUrl: string;
    /** The site's icon. */
    readonly icon: string;
    /** The site's image URL path. */
    readonly imageUrl: string;
    /** Whether to include site navigation in the menu. */
    readonly includeNavigation: boolean;
    constructor(id: number, title: string, urlPath: string, cssClass: string, defaultPageUrl: string, icon: string, imageUrl: string, includeNavigation: boolean);
}
