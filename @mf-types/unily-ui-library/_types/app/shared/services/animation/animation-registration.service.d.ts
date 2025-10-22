import { AnimationTriggerMetadata } from '@angular/animations';
export declare class AnimationRegistrationService {
    private static registeredAnimations;
    private static init;
    static register(animationTriggerMetadata: AnimationTriggerMetadata): void;
    static get(name: string): AnimationTriggerMetadata | undefined;
}
