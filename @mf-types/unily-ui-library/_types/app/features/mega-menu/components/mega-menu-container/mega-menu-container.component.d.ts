import { AfterContentInit, OnDestroy, OnInit, Signal, TemplateRef } from '@angular/core';
import { Portal } from '@angular/cdk/portal';
import { AnimationEvent } from '@angular/animations';
export declare class MegaMenuContainerComponent implements OnInit, AfterContentInit, OnDestroy {
    private readonly elementRef;
    private readonly overlay;
    private readonly focusTrapService;
    private readonly animationService;
    private readonly injector;
    private readonly renderer2;
    private readonly domPortalParkingLot;
    private focusTrapIndex;
    readonly animationStore: {
        isActive: Signal<boolean | undefined>;
        currentAnimationState: Signal<string>;
        setActive: (isActive: boolean) => void;
        reset: () => void;
    } & import("@ngrx/signals").StateSource<{
        isActive: boolean | undefined;
    }>;
    portalInstance: Portal<unknown> | undefined;
    placeholder: TemplateRef<unknown> | undefined;
    showPlaceholder: Signal<boolean>;
    /** Array of 12 items for skeleton loading grid */
    readonly skeletonItems: any[];
    handleEscKeyPressed(event: KeyboardEvent): Promise<void>;
    handleTabKeyPressed(event: KeyboardEvent): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onAnimationEvent(event: AnimationEvent): void;
    close(): Promise<void>;
    private initPlaceholderTemplate;
    private createPortalInstance;
    private getInjectionTokens;
    private createInjectionTokens;
}
