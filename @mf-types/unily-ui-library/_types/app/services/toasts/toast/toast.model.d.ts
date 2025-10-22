/**
 * A model for a toast.
 */
export declare class ToastModel {
    /** The message to display inside the toast. */
    readonly message: string;
    /** If a URL link is supplied, navigation to this URL location would take place when the toast is clicked. */
    readonly url?: string;
    /** If an icon class name is supplied, it would replaces the default icon inside the toast. */
    readonly icon?: string;
    /** The title to display in the header of the toast. */
    readonly title?: string;
    /** If a callback function is supplied, it would trigger when the toast is clicked. */
    readonly onClick?: (toast: ToastModel) => void;
    constructor(message: string, url?: string, icon?: string, onClick?: (toast: ToastModel) => void, title?: string);
}
