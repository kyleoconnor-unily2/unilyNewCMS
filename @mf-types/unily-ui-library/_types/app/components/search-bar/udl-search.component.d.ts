import { OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchBarButton } from './interfaces/search-bar-button.interface';
import { MarginBlockEnd } from './types/margin-block-end.type';
/**
 * UDL Search Component
 *
 * A reusable search component designed for use across multiple MFE applications.
 * Provides a standardized search interface with internationalization support,
 * customizable behavior, and comprehensive event handling.
 *
 * @example
 * ```html
 * <udl-search
 *   [placeholder]="'Search products...'"
 *   [inputDisabled]="isInputLocked"
 *   [buttonDisabled]="isSearchDisabled"
 *   [value]="'initial search'"
 *   [buttons]="searchButtons"
 *   (searchTextChanged)="onSearch($event)"
 *   (clearClicked)="onClear()"
 *   (focusChanged)="onFocus($event)"
 *   (blurChanged)="onBlur($event)"
 *   (enterKeyPressed)="onEnter($event)">
 * </udl-search>
 * ```
 */
export declare class UdlSearchComponent implements OnChanges {
    private readonly destroyRef;
    /**
     * Placeholder text for the search input field.
     * If not provided, will default to internationalized "Placeholder.Search" term.
     * @default '' - Will fall back to translated 'Placeholder.Search' if empty
     */
    readonly placeholder: import("@angular/core").InputSignal<string>;
    /**
     * Controls whether the search input field is disabled.
     * When true, prevents user interaction with the input field.
     * @default false
     */
    readonly inputDisabled: import("@angular/core").InputSignal<boolean>;
    /**
     * Controls whether the search button is disabled.
     * When true, prevents search actions but keeps the input field enabled for typing.
     * @default false
     */
    readonly buttonDisabled: import("@angular/core").InputSignal<boolean>;
    /**
     * Initial value for the search input field.
     * Useful for pre-populating search terms or restoring previous search state.
     * @default ''
     */
    readonly value: import("@angular/core").InputSignal<string>;
    /**
     * Array of custom buttons to render inside the search bar.
     * Useful for adding filters, actions, or shortcuts with icons.
     */
    readonly buttons: import("@angular/core").InputSignal<SearchBarButton[]>;
    /**
     * Emitted when the user performs a search action.
     * Triggered by input changes, Enter key press, or search button click.
     * @event SearchEvent containing search term and timestamp
     */
    readonly searchTextChanged: import("@angular/core").OutputEmitterRef<string>;
    /**
     * Emitted when the user clears the search input.
     * Currently triggered programmatically when clear functionality is implemented.
     * @event void
     */
    readonly clearClicked: import("@angular/core").OutputEmitterRef<void>;
    /**
     * Emitted when the search input gains focus.
     * Useful for analytics, showing search suggestions, or UI state management.
     * @event FocusEvent from the native focus event
     */
    readonly focusChanged: import("@angular/core").OutputEmitterRef<FocusEvent>;
    /**
     * Emitted when the search input loses focus.
     * Useful for hiding search suggestions or validating input.
     * @event FocusEvent from the native blur event
     */
    readonly blurChanged: import("@angular/core").OutputEmitterRef<FocusEvent>;
    /**
     * Emitted specifically when the Enter key is pressed in the search input.
     * Allows differentiation between typing-triggered search and explicit Enter key search.
     * @event SearchEvent containing search term and timestamp
     */
    readonly enterKeyPressed: import("@angular/core").OutputEmitterRef<string>;
    /**
     * Reactive form control bound to the search input field.
     */
    readonly searchControl: FormControl<string>;
    /**
     * Controls the margin-block-end applied to the search button.
     * @default 'large'
     */
    readonly marginBlockEnd: import("@angular/core").InputSignal<MarginBlockEnd>;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Handles Enter key press on the search input field.
     * Triggers an immediate search with the current input value.
     */
    onEnterKeyPress(): void;
    /**
     * Handles click events on the search button.
     * Triggers an immediate search with the current input value.
     */
    onSearchButtonClick(): void;
    /**
     * Handles keyup events on the search input field.
     * Triggers search actions based on specific key presses.
     */
    onKeyUp(event: KeyboardEvent): void;
}
