import { ComponentType } from '@angular/cdk/portal';
import { Signal, TemplateRef } from '@angular/core';
/**
 * Configuration model for mega menu components
 * @template T - The type of context data passed to the component
 */
export interface MegaMenuModel<T> {
    /** The Angular component to render in the mega menu */
    component: ComponentType<unknown>;
    /** Optional context data passed to the component instance */
    context?: T;
    /** Template to display while the component is loading */
    placeholder?: TemplateRef<unknown>;
    /** Signal indicating the loading state of the mega menu */
    isLoading?: Signal<boolean>;
    /** Element or selector where the mega menu should be appended */
    appendTo?: HTMLElement | string;
    /** Display title for the mega menu */
    title?: string;
}
