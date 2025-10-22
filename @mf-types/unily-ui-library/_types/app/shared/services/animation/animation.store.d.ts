export declare const AnimationStore: import("@angular/core").Type<{
    isActive: import("@angular/core").Signal<boolean | undefined>;
    currentAnimationState: import("@angular/core").Signal<string>;
    setActive: (isActive: boolean) => void;
    reset: () => void;
} & import("@ngrx/signals").StateSource<{
    isActive: boolean | undefined;
}>>;
