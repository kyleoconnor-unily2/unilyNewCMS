export declare class TermsService {
    private readonly ts;
    private readonly http;
    private cachedTerms?;
    private loadingPromise?;
    private readonly termsService;
    constructor();
    /**
     * Fetches the complete dictionary of localized terms from the token provider.
     *
     * @returns A promise that resolves to the full `TermsDictionary` object,
     *          or `undefined` if not available.
     */
    private getTerms;
    /**
     * Resolves a localized term based on the given key.
     *
     * If the key exists in the loaded terms dictionary, the corresponding localized term is returned.
     * Otherwise, the input key is returned as a fallback.
     *
     * @param term The key to resolve in the localized dictionary.
     * @returns A promise that resolves to the localized string or the original key if not found.
     */
    getTerm(term: string): Promise<string>;
    /**
     * Resolves and caches the dictionary of terms.
     *
     * - If the terms are already cached, returns them directly.
     * - If a previous load is in progress, returns the same promise.
     * - Otherwise, loads the terms from the token provider or via HTTP fallback.
     *
     * @returns A promise that resolves to the loaded `TermsDictionary`, or `undefined` if not found.
     */
    private resolveTerms;
    /**
     * Loads the terms from the primary source or falls back to an HTTP endpoint if necessary.
     *
     * Attempts to fetch the terms from the token provider. If the returned dictionary is empty,
     * it will attempt to load the terms from a fallback HTTP endpoint using the current locale.
     *
     * @returns A promise that resolves to a populated `TermsDictionary`, or `undefined` if none could be loaded.
     */
    private loadTerms;
}
