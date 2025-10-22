/**
 * A model for a SPA navigation completed event.
 */
export declare class NavigationCompletedEventModel {
    /** The navigation event type. */
    readonly type: 'Navigation';
    /** The navigation event action. */
    readonly action: 'Completed';
    /** The target url for the SPA navigation. */
    readonly targetUrl: string;
    /** The time taken in millisecond for the SPA navigation to complete. */
    readonly durationMs: number;
    constructor(type: 'Navigation', action: 'Completed', targetUrl: string, durationMs: number);
}
