/**
 * The interface for the DialogButtonModel.
 */
export interface DialogButtonV2Model {
    /** The text shown on the button. */
    title: string | undefined;
    /**
     * The action performed when the button is clicked.
     * Note: The dialog closes when returning the boolean value `true` or `undefined`,
     * or stays open when returning the boolean value `false` from the supplied function.
     */
    onClick: (event?: any) => Promise<boolean> | undefined;
    /** If supplied, the icon to be shown on the button. */
    icon?: string;
    /** If supplied, will add a class to this button. */
    buttonClass?: string;
    /** If true, will set the initial state of the button to disable. */
    isDisabled?: boolean;
    /** If true the supplied icon will be rendered as an SVG. */
    isSvgIcon?: boolean;
    /** If true, will hide the text and will only use it for accessibility purposes. */
    hideText?: boolean;
}
/**
 * Merges two dialog button models, with the second button taking precedence for defined properties.
 * @param baseButton The base button model (can be undefined)
 * @param overrideButton The override button model (can be undefined)
 * @returns The merged button model, or undefined if both inputs are undefined
 */
export declare function mergeDialogButtons(baseButton?: DialogButtonV2Model, overrideButton?: DialogButtonV2Model): DialogButtonV2Model | undefined;
/**
 * Creates a copy of a dialog button model.
 * @param button The button to copy
 * @returns A new button model with the same properties
 */
export declare function copyDialogButton(button: DialogButtonV2Model): DialogButtonV2Model;
/**
 * Sets properties on a dialog button model.
 * @param target The target button to modify
 * @param source The source button to copy properties from
 */
export declare function setDialogButton(target: DialogButtonV2Model, source: DialogButtonV2Model): void;
