/**
 * A model for content.
 */
export interface ContentModel {
    /**
     * The content's ID
     */
    id: number;
    /**
     * The content's key
     */
    key: string;
    /**
     * The content's title
     */
    title: string;
    /**
     * The content's document type path
     */
    documentTypePath: string;
    /**
     * The content's document type
     */
    documentType: string;
    /**
     * The additional properties which describe the content item
     */
    properties: any;
}
