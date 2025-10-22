/**
 * A model for a Confirmation Dialog
 */
export interface ConfirmationDialogModel {
    /** The message to display inside the confirmation dialog. */
    message: string;
    /** The title of the confirmation dialog. */
    title: string;
    /** The text inside the confirm button. */
    confirmButtonText: string;
    /** The text inside the cancel button. */
    cancelButtonText: string;
    /** An optional value for the icon of the confirm button. This is only applicable to confirmation dialogs on mobile. */
    icon?: string;
    /** An optional value for whether the supplied icon is an svg icon. */
    isSvgIcon?: boolean;
    /** The template to display inside the confirmation dialog. */
    template?: string;
    /**
     * An optional value for the function to call when the confirm button is clicked.
     * Returning true or undefined will close the confirmation dialog window.
     * Defaults to an empty function that returns true.
     */
    onConfirm?: () => Promise<boolean>;
    /**
     * An optional value for the function to call when the cancel button is called.
     * Returning true or undefined will close the confirmation dialog window.
     * Defaults to an empty function that returns true.
     */
    onCancel?: () => Promise<boolean>;
}
