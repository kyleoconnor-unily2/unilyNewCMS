import { ConfirmationDialogModel } from './confirmation-dialog.model';
/**
 * The Confirmation Dialog service
 */
export declare class ConfirmationDialogService {
    private readonly confirmationDialogService;
    constructor(confirmationDialogService: any);
    /**
     * Open a confirmation dialog with the supplied model.
     * @param model The confirmation dialog model.
     * @returns Resolves to true if the confirmation dialog has opened, false otherwise.
     */
    confirm(model: ConfirmationDialogModel): Promise<boolean>;
    /**
     * Forcefully closes the open confirmation dialog if one is currently open.
     */
    close(): Promise<void>;
}
