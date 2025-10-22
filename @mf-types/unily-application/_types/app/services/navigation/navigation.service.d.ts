import { NavigationStartedEventModel } from './models/navigation-started-event.model';
import { NavigationCompletedEventModel } from './models/navigation-completed-event.model';
import { BaseNavigationOptions } from './interfaces/base-navigation-options.interface';
import { NavigateOptions } from './interfaces/navigate-options.interface';
/**
 * The Navigation service.
 */
export declare class NavigationService {
    private readonly navigationService;
    constructor(navigationService: any);
    onNavigation(success: (value: NavigationStartedEventModel | NavigationCompletedEventModel) => void, error?: (error: any) => void): Function;
    /**
     * @param success The callback function to execute on success, when a SPA navigation event takes place.
     * @param error The callback function to execute on error.
     * @returns This method provides a way to register to SPA navigation events.
     * Any non SPA navigation, such as opening a resource in a new window or tab, will not yield a navigation event.
     *
     * The consumer of this event should de-register the event by calling the returned function when the subscription
     * is no longer needed. Failure to do so may result in memory leaks which slow down the SPA performance.
     */
    subscribe(success: (value: NavigationStartedEventModel | NavigationCompletedEventModel) => void, error?: (error: any) => void): Function;
    /**
     * Navigates to the provided URL. This API accepts urls relative to the domain.
     *
     * The URLs provided must be part of the unily instance. External URLs (such as www.google.com) will not work.
     *
     * @param url A URL relative to the base path to navigate to.
     * @param options Options which will effect navigation
     */
    navigate(url: string, options?: NavigateOptions): void;
    /**
     * Performs a full page navigation to the provided URL. URLs must be absolute URLs, or URLs starting with https://
     * or http://
     *
     * This API accepts and allows navigation to external urls such as https://google.com
     *
     * @param url The URL to navigate to.
     * @param options Options which will effect navigation
     */
    fullPageNavigation(url: string, options?: BaseNavigationOptions): void;
    private createURL;
}
