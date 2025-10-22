import { ComponentType } from '@angular/cdk/portal';
import { DialogButtonV2Model } from './dialog-button-v2.model';
import { DialogAnimationType } from './dialog-animation.type';
import { DialogV2State } from './dialog-v2.state';
import { Provider } from '@angular/core';
/**
 * The interface for the DialogModel.
 */
export interface DialogV2Model<TDialogContext> {
    /** The component to render inside the dialog body. */
    readonly component: ComponentType<unknown>;
    /** The component to render inside the dialog header. */
    readonly headerComponent?: ComponentType<unknown>;
    /** The context supplied to the component rendered inside the dialog body. */
    readonly context?: TDialogContext;
    /** If supplied, a title would render in the dialog header. */
    readonly title?: string;
    /** If supplied, this button would override the default close button. */
    closeButton?: DialogButtonV2Model;
    /** If supplied, this button would be rendered. */
    submitButton?: DialogButtonV2Model;
    /** The state of the dialog component. */
    readonly initialState?: DialogV2State;
    /** Whether to show the search bar at the bottom of the dialog model. */
    readonly showSearchBar?: boolean;
    /** Whether to show current step info in the dialog. */
    readonly showStepInfo?: boolean;
    /** Whether to hide the subtitle in the dialog */
    readonly hideSubtitle?: boolean;
    /** The animation type for the dialog */
    readonly animationType?: DialogAnimationType;
    readonly dialogContentFactory?: (providers: Array<Provider>) => string;
    readonly dialogHeaderFactory?: (providers: Array<Provider>) => string;
}
