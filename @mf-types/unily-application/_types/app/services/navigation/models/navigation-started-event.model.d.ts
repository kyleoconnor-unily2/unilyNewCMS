/**
 * A model for a SPA navigation started event.
 */
export declare class NavigationStartedEventModel {
    /** The navigation event type. */
    readonly type: 'Navigation';
    /** The navigation event action. */
    readonly action: 'Started';
    /** The target url for the SPA navigation. */
    readonly targetUrl: string;
    constructor(type: 'Navigation', action: 'Started', targetUrl: string);
}
