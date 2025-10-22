/**
 * A model of the wizard page change model.
 */
export interface PageChangeModel {
    /**
     * The previous page number when the page was changed.
     */
    readonly previousPageNumber: number;
    /**
     * The next page number when the page was changed.
     */
    readonly nextPageNumber: number;
}
