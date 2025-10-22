import { SearchBarButton } from './interfaces/search-bar-button.interface';
/** Event types supported by the header search bar */
export type SearchBarEvent = 'textChange' | 'enterPress' | 'clear' | 'focus' | 'blur';
/** Event arguments for each event type */
export interface SearchBarEventArgs {
    textChange: string;
    enterPress: string;
    clear: void;
    focus: void;
    blur: void;
}
/**
 * Header Search Bar Service
 *
 * Provides a reactive API for managing the header search bar state.
 * - Consumers update state via setters (setValue, setButtons, etc.).
 * - The component binds to these signals so UI stays in sync automatically.
 * - Consumers can also hook into events like text change, enter, focus, blur, and clear.
 */
export declare class HeaderSearchBarService {
    /** Current search input value */
    readonly value: import("@angular/core").WritableSignal<string>;
    /** Dynamic action buttons (e.g., filter, shortcuts) */
    readonly buttons: import("@angular/core").WritableSignal<SearchBarButton[]>;
    /** Whether the search input is disabled */
    readonly inputDisabled: import("@angular/core").WritableSignal<boolean>;
    /** Whether the search button is disabled */
    readonly buttonDisabled: import("@angular/core").WritableSignal<boolean>;
    /** Placeholder for the search input */
    readonly placeholder: import("@angular/core").WritableSignal<string>;
    /** Internal store of event handlers (typed) */
    private readonly handlers;
    /**
     * Register an event handler for a specific event.
     * Returns a function to remove the handler later (unregister).
     */
    registerHandler<K extends SearchBarEvent>(event: K, callback: (arg: SearchBarEventArgs[K]) => void): () => void;
    /** Trigger all registered handlers for text change */
    triggerTextChange(text: string): void;
    /** Trigger all registered handlers for enter press */
    triggerEnterPress(text: string): void;
    /** Trigger all registered handlers for clear */
    triggerClear(): void;
    /** Trigger all registered handlers for focus */
    triggerFocus(): void;
    /** Trigger all registered handlers for blur */
    triggerBlur(): void;
    /** Programmatically set the search input value */
    setValue(value: string): void;
    /** Define or update action buttons */
    setButtons(buttons: SearchBarButton[]): void;
    /** Enable or disable the search input field */
    setInputDisabled(disabled: boolean): void;
    /** Enable or disable the search button */
    setButtonDisabled(disabled: boolean): void;
    /** Programmatically set the search input placeholder */
    setPlaceholder(placeholder: string): void;
}
