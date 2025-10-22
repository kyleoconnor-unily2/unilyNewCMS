import { MegaMenuModel } from './mega-menu.model';
import { Provider } from '@angular/core';
export interface MegaMenuOverlayModel<TContext> extends MegaMenuModel<TContext> {
    /** Factory function to create dialog content with dependency injection providers */
    readonly dialogContentFactory?: (providers: Array<Provider>) => string;
}
