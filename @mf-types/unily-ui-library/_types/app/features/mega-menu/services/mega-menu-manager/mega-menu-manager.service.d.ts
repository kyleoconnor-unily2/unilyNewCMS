import { MegaMenuOverlayModel } from '../../models/mega-menu-overlay.model';
export declare class MegaMenuManagerService {
    private componentRef;
    private readonly injector;
    private readonly overlayService;
    private readonly defaultOverlayConfig;
    createAndOpen<TContext>(megaMenu: MegaMenuOverlayModel<TContext>): void;
    close(): Promise<void>;
    private buildOverlayConfig;
}
