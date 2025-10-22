import { DialogV2Model } from '../../models/dialog-v2.model';
export declare class DialogV2Service {
    private readonly dialogManagerService;
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
    open<TDialogContext>(dialog: DialogV2Model<TDialogContext>): Promise<boolean>;
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
    open<TDialogContext>(dialog: DialogV2Model<TDialogContext>, moduleName: string): Promise<boolean>;
    /**
     * Cancel all open dialogs
     */
    cancelAll(): Promise<boolean>;
    /**
     * Close all open dialogs
     */
    closeAll(): Promise<void>;
}
