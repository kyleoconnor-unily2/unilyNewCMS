import { AnimationEvent } from '@angular/animations';
import { Observable } from 'rxjs';
import { OverlayModel } from '../overlay/overlay.model';
export declare class AnimationService {
    private readonly animationStore;
    private readonly maxDialogTimeout;
    private readonly animationClosedInterrupt;
    private readonly animationReadySubject;
    private animationCloseSubscription;
    /**
     * Handle animation events
     */
    onAnimationEvent(event: AnimationEvent, overlay: OverlayModel<unknown>): void;
    /**
     * Prepare for close animation
     */
    prepareCloseAnimation(withAnimation: boolean): Promise<void>;
    /**
     * Check if animation is active
     */
    isAnimationActive(): boolean | undefined;
    /**
     * Reset animation state
     */
    resetAnimation(): void;
    /**
     * Get animation ready observable
     */
    get animationReady$(): Observable<boolean>;
    /**
     * Track close animation completed with a maximum timeout
     */
    private onCloseAnimationCompleted;
}
