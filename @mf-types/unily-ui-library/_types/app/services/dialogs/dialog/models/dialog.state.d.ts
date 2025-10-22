import { DialogButtonAlignment } from './dialog-button-alignment.type';
import { DialogDimensions } from './dialog-dimensions.interface';
import { DialogPosition } from './dialog-position.interface';
import { DialogPresets } from './dialog-presets.enum';
/**
 * A model for dialog state.
 */
export interface DialogState {
    /** If true, will hide actionable buttons to prevent user input before content is loaded. */
    loading?: boolean;
    /** If true will disable the close and submit buttons, and show an overlay with a message defined by `processingMessage`. */
    processing?: boolean;
    /**
     * If false, will hide the submit button.
     * If a submit button is not defined for the component, then the submit button will still not be visible even if
     * this is set to true.
     */
    showSubmitButton?: boolean;
    /** The message shown on the overlay when `processing` is set to true. */
    processingMessage?: string;
    /**
     * If true, will set the `processing` state automatically before and after the submit button action is called.
     * Default set to `true`.
     */
    autoSetProcessingState?: boolean;
    /** The class to be attached to the root element of the dialog. */
    dialogClass?: string;
    /**
     * A combination of dialog preset classes.
     * Example: DialogPresets.NARROW | DialogPresets.BODY_BOTTOM_PAD.
     * `dialogClass` styles take precedence.
     */
    dialogPresets?: DialogPresets;
    /**
     * The DOM element or selector string to which the dialog is appended.
     * If undefined, defaults to `document.body`.
     */
    appendTo?: HTMLElement | string;
    /**
     * Optional custom sizing and positioning options for the dialog.
     */
    dimensions?: DialogDimensions;
    /**
     * The position of the dialog relative to its trigger element.
     */
    position?: DialogPosition;
    /**
     * If `true`, disables the backdrop color (makes it transparent). Defaults to `false`.
    */
    disableBackdropColor?: boolean;
    /**
     * Optional alignment for footer buttons.
     * Determines the horizontal positioning of the button within the footer (left, center, or right).
     * Defaults to 'right' if not specified.
     */
    footerButtonAlignment?: DialogButtonAlignment;
}
