import { ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injector } from '@angular/core';
import { CustomOverlayConfig } from './overlay-config.interface';
export declare class OverlayService {
    private readonly overlay;
    private readonly zone;
    private readonly platformLocation;
    /**
     * create custom overlay with configuration
     * @param component : a component to display on the overlay
     * @param data : data which will be passed to the overlay component
     * @param overlayConfig : custom configuration for overlay
     * @param injector
     * @param onReady
     */
    open<R>(component: ComponentType<unknown>, data: R, overlayConfig?: CustomOverlayConfig, injector?: Injector, onReady?: () => void): ComponentRef<any>;
    /**
     * Close an overlay with optional data
     */
    close(componentRef: ComponentRef<any>, withAnimation?: boolean): Promise<void>;
    /**
     * Cancel an overlay with optional data and event
     */
    cancel(componentRef: ComponentRef<any>, event?: unknown, data?: any): Promise<boolean>;
    private subscribeToPopState;
    private subscribeToBackDropClick;
    private createOverlay;
    private getOverlayConfig;
    private createConnectedPositionStrategy;
    private createGlobalPositionStrategy;
    private createInjector;
}
