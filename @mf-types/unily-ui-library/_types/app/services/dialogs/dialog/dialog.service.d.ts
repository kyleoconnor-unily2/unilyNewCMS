import { DialogModel } from './models/dialog.model';
export declare class DialogService {
    private readonly dialogService;
    constructor(dialogService: any);
    /**
     * Open a dialog with the supplied model.
     *
     * This API signature is deprecated and should no longer be used. Use [open(dialog, moduleName)]{@link open(dialog, moduleName)} instead.
     *
     * @param dialog The dialog model.
     *
     * @returns Resolves to the value 'true' if the dialog has opened, or to the value 'false' if the dialog has closed.
     * @deprecated
     */
    open<TDialogContext>(dialog: DialogModel<TDialogContext>): Promise<boolean>;
    /**
     * Open a dialog with the supplied model.
     *
     * This API is compatible with MFEs created with @unily/angular-sdk@19.1.0 and above.
     *
     * @param dialog The dialog model.
     * @param moduleName The name associated with the MFE module calling this API.
     *
     * @returns Resolves to the value 'true' if the dialog has opened, or to the value 'false' if the dialog has closed.
     */
    open<TDialogContext>(dialog: DialogModel<TDialogContext>, moduleName: string): Promise<boolean>;
    /**
     * Close all open dialogs.
     */
    closeAll(): Promise<void>;
    /**
     * Close all open dialogs by calling their cancel action.
     * If you want to force close dialogs, use `closeAll()` instead.
     * @returns Resolves to the value 'true' if all dialogs have been canceled and have closed, or to the value 'false'
     *     if not.
     */
    cancelAll(): Promise<boolean>;
}
