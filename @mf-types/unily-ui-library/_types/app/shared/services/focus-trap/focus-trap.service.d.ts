import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ElementRef } from '@angular/core';
/**
 * Wrapper for ConfigurableFocusTrapFactory and ConfigurableFocusTrap.
 * Used to keep only one focus trap enabled at a time.
 * This allows multiple focus traps to be instantiated and to be reliably tested
 * for whether they are the currently active focus trap.
 * When a focus trap is destroyed, the next most recent focus trap is enabled.
 */
export declare class FocusTrapService {
    private readonly focusTrapFactory;
    private readonly focusTraps;
    private lastEnabledIndex;
    constructor(focusTrapFactory: FocusTrapFactory);
    /**
     * A new focusTrap is created and pushed to the end of the array.
     * If available, the previous focus trap is disabled to keep only one
     * focus trap
     * @param element The element within which to trap focus.
     * @returns The array index of the new focusTrap.
     */
    create(element: ElementRef): number;
    /**
     * If a `focusTrap` parameter is defined, it will be destroyed.
     * If a `focusTrap` parameter is not defined, the most recently created focus trap will be destroyed.
     * If the destroyed focus trap was previously enabled, the most recent non-destroyed focus trap will
     * be enabled.
     * @param focusTrap The focus trap to pop.
     */
    destroy(focusTrapIndex?: number): void;
    /**
     * Enable a focus trap with the given index.
     * If a different focus trap was previously enabled, it will become disabled.
     * Will do nothing if the focus trap is already enabled.
     * @param focusTrapIndex The index of the focus trap to enable.
     */
    enable(focusTrapIndex: number): void;
    /**
     * Disable a focus trap with the given index.
     * After disabling a focus trap, the most recent non-destroyed focus trap will be enabled.
     * Will do nothing if the focus trap is already disabled.
     * @param focusTrapIndex The index of the focus trap to disable.
     */
    disable(focusTrapIndex: number): void;
    /**
     * Attach a focus trap and focus on the first tabbable element.
     * If the focus trap is disabled, then it will be enabled.
     * @param focusTrapIndex The index of the focus trap to attach and change focus on.
     */
    attachAndFocus(focusTrapIndex: number): void;
    /**
     * Attach a focus trap.
     * If the focus trap is disabled, then it will be enabled.
     * @param focusTrapIndex The index of the focus trap to attach and change focus on.
     */
    attach(focusTrapIndex: number): void;
    /**
     * @param focusTrapIndex The index of the focus trap being tested.
     * @returns True if the focus trap is enabled, false otherwise.
     */
    isEnabled(focusTrapIndex: number): boolean;
    private isValidIndexRange;
}
