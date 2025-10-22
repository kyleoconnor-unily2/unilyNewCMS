import { ChangeDetectorRef, ComponentRef, ElementRef, Injector, NgZone, Provider } from '@angular/core';
import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { DialogV2State } from '../../models/dialog-v2.state';
import { DialogV2Model } from '../../models/dialog-v2.model';
import { AnimationEvent } from '@angular/animations';
import { OverlayModel } from '../../../../shared/services/overlay/overlay.model';
import { CustomOverlayConfig } from '../../../../shared/services/overlay/overlay-config.interface';
export interface DialogContainerState {
    dialogState: DialogV2State;
    portalInstance: Portal<unknown> | undefined;
    headerPortalInstance: Portal<unknown> | undefined;
    attachedComponent: ComponentType<unknown>;
    focusTrapIndex: number;
}
export declare class DialogManagerService {
    openDialogs: ComponentRef<any>[];
    private readonly injector;
    private readonly overlayService;
    private readonly focusTrapService;
    private readonly accessibilityService;
    private readonly buttonService;
    private readonly portalService;
    private readonly stateService;
    private readonly animationService;
    private readonly closeSubject;
    private readonly onSearchTextChangedSubject;
    private previouslyFocusedElement;
    /**
     * Initialize dialog container with the provided overlay and element reference
     */
    initializeDialog(overlay: OverlayModel<DialogV2Model<unknown>>, elementRef: ElementRef): DialogContainerState;
    /**
     * Open a dialog with the provided data and injector
     */
    createAndOpen(data: DialogV2Model<unknown>, waitForCancellation?: boolean, closeExistingDialogs?: boolean): Promise<boolean>;
    /**
     * Create portal instance for the dialog component
     */
    createPortalInstance(overlay: OverlayModel<DialogV2Model<unknown>>, injector: Injector, ngZone: NgZone, state: DialogContainerState): ComponentPortal<unknown>;
    /**
     * Create header portal instance if header component exists
     */
    createHeaderPortalInstance(overlay: OverlayModel<DialogV2Model<any>>, injector: Injector, ngZone: NgZone, state: DialogContainerState): ComponentPortal<unknown> | undefined;
    getInjectionTokensData(overlay: OverlayModel<DialogV2Model<any>>, ngZone: NgZone, state: DialogContainerState): Array<Provider>;
    /**
     * Handle animation events
     */
    onAnimationEvent(event: AnimationEvent, overlay: OverlayModel<DialogV2Model<any>>, state: DialogContainerState): void;
    /**
     * Handle component instance attachment
     */
    onInstanceAttached(componentRef: ComponentRef<unknown>, state: DialogContainerState, changeDetectorRef: ChangeDetectorRef): void;
    /**
     * Cancel dialog
     */
    cancel(overlay: OverlayModel<DialogV2Model<any>>, withAnimation: boolean, event?: any): Promise<boolean>;
    cancelAllExcept(except?: ComponentRef<any>, withAnimation?: boolean): Promise<boolean>;
    /**
     * Submit dialog
     */
    submit(overlay: OverlayModel<DialogV2Model<any>>, state: DialogContainerState, event?: any): Promise<void>;
    /**
     * Close dialog
     */
    close(overlay: OverlayModel<DialogV2Model<unknown>>, withAnimation: boolean): Promise<void>;
    closeAllExcept(except?: ComponentRef<any>, withAnimation?: boolean): Promise<void>;
    removeDialogOnDestroy(componentRef: ComponentRef<any>): void;
    buildOverlayConfig(data: DialogV2Model<unknown>): CustomOverlayConfig;
    /**
     * Set dialog state
     */
    setState(state: DialogContainerState, overlay: OverlayModel<DialogV2Model<any>>, newState: DialogV2State): void;
    /**
     * Get style classes for dialog
     */
    getStyleClasses(state: DialogContainerState): string;
    /**
     * Cleanup resources
     */
    cleanup(state: DialogContainerState): void;
    get animationReady$(): Observable<boolean>;
    get close$(): Observable<boolean>;
    get searchTextChanged$(): Observable<string>;
    private setupButtons;
    private createDialogActions;
    private setSubmitButton;
    private setCancelButton;
    private getDialogButtonModelFromLegacyParams;
    private returnFocus;
}
