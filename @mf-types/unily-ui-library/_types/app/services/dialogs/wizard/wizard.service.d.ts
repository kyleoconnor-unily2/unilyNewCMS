import { WizardState } from './wizard.state';
import { DialogModel } from '../dialog/models/dialog.model';
/**
 * The Wizard service.
 */
export declare class WizardService {
    private readonly wizardService;
    constructor(wizardService: any);
    /**
     * Open a wizard with the supplied dialog models as pages.
     * The ordering of the dialog models is the order of the pages.
     * @param title The title that will be shown at the top of the wizard.
     * @param dialogs The dialog models that will be used as pages.
     * @param initialPage The first page to show in the wizard.
     *
     * @returns True if the wizard is successfully opened.
     *
     * @deprecated Use the open() function which accepts a moduleName. This function is not compatible with cross
     *     angular versions, and should not be used.
     */
    open(title: string, dialogs: Array<DialogModel<unknown>>, initialPage?: number): Promise<boolean>;
    /**
     * Open a wizard with the supplied dialog models as pages.
     * The ordering of the dialog models is the order of the pages.
     * @param title The title that will be shown at the top of the wizard.
     * @param dialogs The dialog models that will be used as pages.
     * @param moduleName The name of the MFE module calling this API. The component will be loaded from
     *     the MFE directly and uses the module's injector.
     * @param initialPage The first page to show in the wizard. Defaults to 0
     *
     * @returns True if the wizard is successfully opened.
     */
    open(title: string, dialogs: Array<DialogModel<unknown>>, moduleName: string, initialPage?: number): Promise<boolean>;
    /**
     * Get the wizard state of the given dialog ID, if it exists.
     * @param dialogId The dialog ID for the wizard state to be obtained.
     * @returns A wizard state, if it exists, for the given dialog ID.
     */
    getWizardState(dialogId: string): Promise<WizardState>;
    /**
     * Close all open wizards by calling the cancel action of the currently open dialogs.
     * If you want to force close wizards, use `closeAll()` instead.
     * @returns True if all wizards are successfully closed.
     */
    cancelAll(): Promise<boolean>;
    /**
     * Force close all open wizards.
     */
    closeAll(): Promise<void>;
}
