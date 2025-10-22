export interface BaseNavigationOptions {
    /**
     * A Record of query parameters that will be appended to the URL.
     *
     * Eg : {
     *     user: 'John Smith',
     *     id: '380k230dc83',
     *     preferredLang:'en',
     *     languages: ['en','fr','de']
     * }
     */
    queryParams?: Record<string, string | Array<string>>;
    /**
     * When true, navigates without pushing a new state into history.
     */
    skipLocationChange?: boolean;
}
