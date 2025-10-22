/**
 * A model for an Analytics Event
 */
export declare class AnalyticsEventModel {
    /** If supplied, the correlation ID would be the identifier used to track the current event data after being recorded. */
    readonly correlationId?: string;
    /** The callback function to be executed when the request succeeds. */
    readonly onSuccess: (data: any) => void;
    /** The callback function to be executed when the request fails. */
    readonly onError: (data: any, error: any) => void;
    /**
     * If a callback formatter function is supplied, the current event data or the error data can be manipulated further
     * before being processed by the `onSuccess` or `onError` callback functions.
     */
    readonly callbackFormatter?: (data: any) => any;
    constructor(onSuccess: (data: any) => void, onError: (data: any, error: any) => void, correlationId?: string, callbackFormatter?: (data: any) => any);
}
