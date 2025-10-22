import { WizardPageModel } from './wizard-page.model';
/**
 * A wizard model containing the current pages.
 */
export interface WizardModel {
    /**
     * A map of wizard model ids to wizard page models.
     */
    readonly pages: Map<string, WizardPageModel>;
    /**
     * An ordered list of wizard model ids.
     */
    readonly orderedPages: Array<string>;
    /**
     * The number of pages inside the wizard model.
     */
    readonly length: number;
    /**
     * The wizard model id.
     */
    readonly id: string;
    /**
     * Get a wizard page model at the given page.
     * @param pageNumber The page number to retrieve.
     * @returns The wizard page model associated with that page.
     */
    getPage(pageNumber: number): WizardPageModel | undefined;
}
