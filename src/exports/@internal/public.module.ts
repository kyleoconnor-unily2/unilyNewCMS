/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { DoBootstrap, FactoryProvider, Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { metadata } from '../public.module.metadata';

@NgModule({
    imports: metadata.imports,
    declarations: metadata.declarations,
    exports: metadata.exports,
    providers: metadata.providers,
    schemas: metadata.schemas

})
export default class PublicModule implements DoBootstrap {
    constructor(private readonly injector: Injector) { }

    /**
     * This is the first function that is called when this module is imported into another micro frontend and bootstrapped.
     * Note that it automatically creates custom elements from the components in the exports list.
     */
    ngDoBootstrap(): void {
        metadata.exports?.forEach((directive: any | Type<any>) => {
            if (directive.ɵcmp) {
                directive.ɵcmp.selectors.forEach((selector: string) => {
                    const el = createCustomElement(directive, { injector: this.injector });
                    customElements.define(selector, el);
                });
            }
        });
    }

    /**
     * This is a helper function that returns a list of service providers.
     * Use this to facilitate dependency injection in Angular.
     */
    public getProviders(token: any, asToken?: any): FactoryProvider[] {
        if (asToken === undefined) {
            asToken = token;
        }

        let services = this.injector.get(token);

        const multi = Array.isArray(services);
        if (!multi) {
            services = [services];
        }

        return services.map((service: any) => {
            return {
                provide: asToken,
                useFactory: () => service,
                multi
            } as FactoryProvider;
        }) as FactoryProvider[];
    }

    /**
     * This is a helper function that gets a service directly by calling the factory function of its provider.
     * Use this in cases where dependency injection is not an option.
     */
    public getService<T>(token: any): T {
        const provider = this.getProviders(token)[0];

        if (!provider) {
            console.error(`Failed to retrieve service for: ${token}. No provider found.`);

            return <T>{};
        }

        return provider.useFactory() as T;
    }
}
