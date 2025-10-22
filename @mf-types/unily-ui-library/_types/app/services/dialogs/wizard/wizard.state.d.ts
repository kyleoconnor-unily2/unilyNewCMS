import { Observable } from 'rxjs';
import { WizardModel } from './models/wizard.model';
import { WizardPageModel } from './models/wizard-page.model';
import { PageChangeModel } from './models/page-change.model';
import { DialogModel } from '../dialog/models/dialog.model';
/**
 * A representation of the current Wizard's state.
 */
export declare class WizardState {
    private readonly _wizardState?;
    /**
     * Get a wizard page model with the currently open page.
     */
    get currentPage(): WizardPageModel;
    /**
     * Get the current page number, with the first page being page 1.
     */
    get currentPageNumber(): number;
    /**
     * Get whether the wizard dialog page should show a search bar.
     */
    get shouldShowSearchBar(): boolean;
    /**
     * Get whether the step info should be shown.
     */
    get shouldShowStepInfo(): boolean;
    /**
    * Get whether the subtitle should be hidden.
    */
    get shouldHideSubtitle(): boolean;
    /**
     * Get the number of pages in the wizard.
     */
    get pageCount(): number;
    /**
     * Get the title of the wizard.
     */
    get title(): string;
    /**
     * Get the subtitle of the wizard.
     */
    get subtitle(): string;
    /**
     * Get whether the wizard is currently on the first page.
     */
    get isFirstPage(): boolean;
    /**
     * Get whether the wizard is currently on the last page.
     */
    get isLastPage(): boolean;
    /**
     * Get the styles that are currently applied to the wizard.
     */
    get styleClasses(): string;
    /**
     * Emits an event when the page changes containing a model with the previous page and the next page.
     */
    readonly onPageChange: Observable<PageChangeModel>;
    constructor(model: WizardModel, initialPage?: number);
    /**
     * Go to the next page and emit a page change event.
     * If the wizard is already on the last page, this is ignored.
     */
    gotoNextPage(): DialogModel<any>;
    /**
     * Go to the previous page and emit a page change event.
     * If the wizard is already on the first page, this is ignored.
     */
    gotoPreviousPage(): DialogModel<any>;
    /**
     * Go to a specific page and emit a page change event.
     * If the page is out of range of the wizard's page count, the closest page will be chosen.
     * @param pageNumber The page number to go to.
     */
    gotoPage(pageNumber: number): DialogModel<any>;
}
