/**
 * A interface for localized terms used throughout the front-end.
 */
export interface TermsDictionary {
    /**
     * ISO language code associated with the terms (e.g., 'en-GB', 'it-IT').
     */
    isoCode: string;
    /**
     * A dictionary of term keys and their localized display values.
     *
     * Example:
     * {
     *   "#Backoffice.Location.AdditionalImages": "Additional Images"
     * }
     */
    terms: {
        [termKey: string]: string;
    };
}
