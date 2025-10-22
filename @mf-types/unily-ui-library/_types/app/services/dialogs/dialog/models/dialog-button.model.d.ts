/**
 * The interface for the DialogButtonModel.
 */
export interface DialogButtonModel {
    /** The text shown on the button. */
    title: string;
    /**
     * The action performed when the button is clicked.
     * Note: The dialog closes when returning the boolean value `true` or `undefined`,
     * or stays open when returning the boolean value `false` from the supplied function.
     */
    onClick: (event?: any) => Promise<boolean>;
    /** If supplied, the icon to be shown on the button. */
    icon?: string;
    /** If supplied, will add a class to this button. */
    buttonClass?: string;
    /** If true, will set the initial state of the button to disabled. */
    isDisabled?: boolean;
    /** If true the supplied icon will be rendered as an SVG. */
    isSvgIcon?: boolean;
    /** If true, will hide the text and will only use it for accessibility purposes. */
    hideText?: boolean;
}
