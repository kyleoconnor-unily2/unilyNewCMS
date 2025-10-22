import { Renderer2 } from '@angular/core';
import { DomPortal } from '@angular/cdk/portal';
/**
 * Creates a DomPortal for the specified selector, either by finding an existing element
 * or creating a new one if it doesn't exist.
 * @param selector The HTML tag selector to create or find
 * @param renderer2 Angular Renderer2 instance for DOM manipulation
 * @param attachContainer The container element to attach to
 * @param fallbackContainer The fallback container if attachContainer is not available
 * @returns DomPortal instance for the selector
 */
export declare function createDomPortalForSelector(selector: string, renderer2: Renderer2, attachContainer: HTMLElement | undefined, fallbackContainer: HTMLElement): DomPortal<HTMLElement>;
