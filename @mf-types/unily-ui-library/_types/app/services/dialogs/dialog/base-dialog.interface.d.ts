import BaseDialogComponent from './base-dialog.component';
import { CurrentDialogModel } from './models/current-dialog.model';
export interface BaseDialogInterface<TDialogContext> {
    /**
     * A unique dialog identifier.
     * This is initialised automatically.
     */
    readonly dialogId: string;
    /**
     * The dialog context to be injected, containing properties which can be manipulated when the dialog is open.
     */
    readonly context: TDialogContext;
    /**
     * The current dialog model to be injected.
     * Provides additional dialog functionality which can be used to change the state of the dialog.
     */
    readonly currentDialog: CurrentDialogModel;
    new (context: TDialogContext, currentDialog: CurrentDialogModel): BaseDialogComponent<TDialogContext>;
}
