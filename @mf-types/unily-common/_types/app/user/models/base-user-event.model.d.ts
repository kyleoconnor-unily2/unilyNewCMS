/**
 * Base model for user events.
 */
export interface BaseUserEventModel {
    /**
     * Event type.
     */
    type: string;
    /**
     * User Id.
     */
    id: number;
    /**
     * User action raising event.
     */
    action: string;
}
