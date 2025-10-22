import { AnimationEvent } from '@angular/animations';
import { OnDestroy, OnInit, Signal } from '@angular/core';
import { DialogContainerState } from '../../services/dialog-manager/dialog-manager.service';
import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { DialogV2Model } from '../../models/dialog-v2.model';
import { DialogButtonAlignment } from '../../models/dialog-button-alignment.type';
import { OverlayModel } from '../../../../shared/services/overlay/overlay.model';
export declare class DialogContainerComponent implements OnInit, OnDestroy {
    private readonly focusTrapService;
    private readonly dialogManager;
    private readonly elementRef;
    private readonly ngZone;
    private readonly changeDetectorRef;
    private readonly renderer2;
    private readonly domPortalParkingLot;
    readonly animationStore: {
        isActive: Signal<boolean | undefined>;
        currentAnimationState: Signal<string>;
        setActive: (isActive: boolean) => void;
        reset: () => void;
    } & import("@ngrx/signals").StateSource<{
        isActive: boolean | undefined;
    }>;
    overlay: OverlayModel<DialogV2Model<unknown>>;
    dialogContainerState: DialogContainerState;
    styleClasses: import("@angular/core").WritableSignal<string>;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    onAnimationEvent(event: AnimationEvent): void;
    onInstanceAttached(componentRef: CdkPortalOutletAttachedRef): void;
    handleEscape(event: KeyboardEvent): Promise<boolean>;
    cancel(withAnimation: boolean, event?: any): Promise<boolean>;
    submit(event?: any): Promise<void>;
    close(withAnimation: boolean): Promise<void>;
    get dialogState(): import("../../models/dialog-v2.state").DialogV2State;
    get portalInstance(): import("@angular/cdk/portal").Portal<unknown> | undefined;
    get headerPortalInstance(): import("@angular/cdk/portal").Portal<unknown> | undefined;
    get footerButtonAlignment(): DialogButtonAlignment;
    private createPortalInstance;
    private createHeaderPortalInstance;
}
