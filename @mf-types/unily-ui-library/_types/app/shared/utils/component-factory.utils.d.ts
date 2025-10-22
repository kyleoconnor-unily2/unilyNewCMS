import { Provider, Type } from '@angular/core';
import { RemoteNgModule } from '@unily/remote-service';
/**
 * Creates a factory function that generates custom web elements from Angular components.
 * The factory function can be called with optional providers to create a custom element
 * with a unique selector based on the component's original selector and the specified type.
 *
 * @param component - The Angular component class to convert into a custom web element
 * @param type - The type of dialog element ('content' | 'header') that will be appended to the selector
 * @param module - The RemoteNgModule instance used to create the custom element and manage dependencies
 * @param suffix - Optional suffix to append to the generated selector for additional uniqueness
 * @returns A factory function that accepts optional providers and returns the custom element selector string
 *
 * @throws {Error} When the component cannot be reflected or doesn't have a selector
 *
 * @example
 * ```typescript
 * const factory = createCustomElementFactory(MyComponent, 'content', module, '-v2');
 * const selector = factory([{ provide: MyService, useValue: myServiceInstance }]);
 * // Returns something like: 'my-component-dialog-content-v2'
 * ```
 */
export declare function createCustomElementFactory(component: Type<any>, type: 'content' | 'header', module: RemoteNgModule, suffix?: string): (providers?: Array<Provider>) => string;
