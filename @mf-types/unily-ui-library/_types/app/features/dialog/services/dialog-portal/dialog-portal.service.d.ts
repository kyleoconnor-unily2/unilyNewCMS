import { Injector } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogV2Model } from '../../models/dialog-v2.model';
import { CurrentDialogV2Model } from '../../models/current-dialog-v2.model';
import { OverlayModel } from '../../../../shared/services/overlay/overlay.model';
export declare class DialogPortalService {
    /**
     * Create portal instance for the dialog component
     */
    createPortalInstance(overlay: OverlayModel<DialogV2Model<any>>, injector: Injector, dialogActions: CurrentDialogV2Model): ComponentPortal<unknown>;
    /**
     * Create header portal instance if header component exists
     */
    createHeaderPortalInstance(overlay: OverlayModel<DialogV2Model<any>>, injector: Injector, dialogActions: CurrentDialogV2Model): ComponentPortal<unknown> | undefined;
    createInjectionTokens(data: unknown, dialogActions: CurrentDialogV2Model): Array<{
        provide: string;
        useValue: unknown;
    }>;
    private getCurrentDialogState;
    private createInjector;
}
