import { MegaMenuModel } from '../../models/mega-menu.model';
export declare class MegaMenuService {
    private readonly megaMenuManagerService;
    /**
     * Open a mega menu with the supplied model.
     *
     * This API signature is deprecated and should no longer be used. Use [open(megaMenu, moduleName)]{@link open(megaMenu, moduleName)} instead.
     *
     * @param data The mega menu model.
     *
     * @deprecated
     */
    open(data: MegaMenuModel<unknown>): void;
    /**
     * Open a mega menu with the supplied model.
     *
     * This API is compatible with MFEs created with @unily/angular-sdk@19.1.0 and above.
     *
     * @param data The mega menu model.
     * @param moduleName The name associated with the MFE module calling this API.
     */
    open(data: MegaMenuModel<unknown>, moduleName: string): void;
    /**
     * Close the currently open mega menu.
     */
    close(): Promise<void>;
}
