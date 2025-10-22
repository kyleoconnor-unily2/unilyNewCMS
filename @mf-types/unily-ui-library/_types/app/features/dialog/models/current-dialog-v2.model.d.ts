import { Observable } from 'rxjs';
import { DialogButtonV2Model } from './dialog-button-v2.model';
import { DialogV2State } from './dialog-v2.state';
/**
 * The current dialog model to be inherited by any dialog implementation.
 * Its properties can be used for further functionality to change the state of the dialog.
 * This model would be injected in the [Dialog Component](#basepath/classes/v1_dialog_api.BaseDialogComponent).
 */
export interface CurrentDialogV2Model {
    /** Closes the dialog. */
    readonly close: () => Promise<void>;
    /** Calls the submit button's onClick action, then closes the dialog if the action resolves to true. */
    readonly submit: (event?: any) => Promise<void>;
    /**
     * Calls the cancel button's onClick action, then closes the dialog if the action resolves to true.
     * Note: To force close the dialog, use `close()` instead.
     */
    readonly cancel: (withAnimation: boolean, event?: any) => Promise<boolean>;
    /**
     * Set the dialog's current state through the `DialogState` properties.
     * Note: This can be used to perform partial update of the state model.
     * This means that as a developer you can supply only a subset of the available
     * properties and only the provided properties will be over written.
     */
    readonly setState: (state: DialogV2State) => void;
    /**
     * Set the dialog's submit button.
     * If undefined, the dialog will have no submit button.
     * Undefined properties will not overwrite the current button's properties.
     */
    readonly setSubmitButton: (button: DialogButtonV2Model) => void;
    /** Gets the dialog's submit button. */
    readonly getSubmitButton: () => DialogButtonV2Model;
    /**
     * Set the dialog's cancel button.
     * If undefined, will close the dialog instead.
     * Undefined properties will not overwrite the current button's properties.
     */
    readonly setCancelButton: (button: DialogButtonV2Model) => void;
    /** Emits a `true` value only when the dialog is fully opened. */
    readonly onAnimationReady: Observable<boolean>;
    /** Emits a `true` value when the dialog is fully closed and the component is about to be destroyed. */
    readonly onClose: Observable<boolean>;
    /** Emits a string represeting the current state of the search text in the search bar if applicable. */
    readonly onSearchTextChanged: Observable<string>;
    /**
     * Get the dialog's current `DialogState` properties.
     * `state` is an accessor that returns a copy of the current dialog's state.
     * Any changes made on the returned state will not be reflected in the current dialog's state.
     * Use `setState` to make changes to the current dialog's state.
     */
    readonly state: DialogV2State;
}
