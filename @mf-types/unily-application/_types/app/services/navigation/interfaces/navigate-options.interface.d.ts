import { BaseNavigationOptions } from './base-navigation-options.interface';
export interface NavigateOptions extends BaseNavigationOptions {
    /**
     * When true, navigates while replacing the current state in history.
     */
    replaceUrl?: boolean;
    /**
     * When doing a non full page navigation, decides if the provided query params should be added to existing ones or
     * replace them entirely.
     */
    mergeQueryParams?: boolean;
}
