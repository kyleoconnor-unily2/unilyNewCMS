import { ComponentType } from '@angular/cdk/portal';
import { DialogState } from './dialog.state';
import { DialogButtonModel } from './dialog-button.model';
import BaseDialogComponent from '../base-dialog.component';
/**
 * The interface for the DialogModel.
 */
export interface DialogModel<TDialogContext> {
    /** The component to render inside of the dialog body. The component needs to inherit from BaseDialogComponent. */
    readonly component: ComponentType<BaseDialogComponent<TDialogContext>>;
    /** The context supplied to the component rendered inside the dialog body. */
    readonly context?: TDialogContext;
    /** If supplied, a title would render in the dialog header. */
    readonly title?: string;
    /** If supplied, this button would override the default close button. */
    closeButton?: DialogButtonModel;
    /** If supplied, this button would be rendered. */
    submitButton?: DialogButtonModel;
    /** The state of the dialog component. */
    readonly initialState?: DialogState;
    /** Whether or not to show the search bar at the bottom of the dialog model. */
    readonly showSearchBar?: boolean;
    /** Whether or not to show current step info in the dialog. */
    readonly showStepInfo?: boolean;
    /** Whether or not to hide the subtitle in the dialog */
    readonly hideSubtitle?: boolean;
}
