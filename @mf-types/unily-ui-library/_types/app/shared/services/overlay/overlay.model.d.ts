import { OverlayRef } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
export interface OverlayModel<T> {
    readonly data: T;
    readonly overlayRef: OverlayRef;
    readonly injector?: Injector;
    readonly dispose: () => void;
    readonly onReady?: () => void;
}
