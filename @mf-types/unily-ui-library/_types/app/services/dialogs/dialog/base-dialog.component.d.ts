import { CurrentDialogModel } from './models/current-dialog.model';
/**
 * This class should be extended by any dialog implementation.
 *
 * IMPORTANT: export default is required since importRemote currently is unable to load named exports
 */
export default abstract class BaseDialogComponent<TDialogContext> {
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
    constructor(context: TDialogContext, currentDialog: CurrentDialogModel);
}
