import { DialogModel } from '../../dialog/models/dialog.model';
/**
 * A model of the wizard page model.
 */
export declare class WizardPageModel {
    /**
     * The id of the wizard page model.
     */
    readonly id: string;
    /**
     * The title of the wizard page.
     */
    title: string;
    /**
     * The dialog model associated with the wizard page.
     */
    readonly dialog: DialogModel<any>;
    constructor(id: string, title: string, dialog: DialogModel<any>);
}
