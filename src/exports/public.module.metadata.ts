import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../services/logging/logging.service';
import { ExclamationMarkPipe } from '../pipes/exlamation-mark/exclamation-mark.pipe';
import { RemoteNgModule, importRemote } from '@unily/remote-service';
import PublicModule from './@internal/public.module';
import { FederatedEventService } from 'src/services/event-reciever/event-reciever.service';

// Import the new modular CMS module
import { CmsModule } from '../components/cms/cms.module';

// Initialize remote imports
importRemote<RemoteNgModule>('@angular/forms');

export const metadata = {
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CmsModule
    ],
    declarations: [
        ExclamationMarkPipe
    ],
    exports: [
        // These components will be immediately available when a module is imported.
        CmsModule,
        ExclamationMarkPipe
    ],
    providers: [
        // These are the services that will be publicly exposed by this module.
        // To use these services, we would need to provide them to a new module using `getProviders(...)` or get the service directly using `getService(...)`.
        // The string token allows us to have a reference to the injector without requiring any reference to a specific construct inside this module.
        // Specified dependencies do not need to be exported, but they need to be specified here for the services that require them.
        {
            provide: 'LoggingService',
            useClass: LoggingService
        },
        {
            provide: 'FederatedEventService',
            useClass: FederatedEventService
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
} as NgModule;

export const afterBootstrap = async (instance: PublicModule) => {
    // Do something after bootstrapping the module.
    // This will be immediately called for modules that are not lazy loaded.
    const logService = instance.getService('LoggingService') as LoggingService;
    logService.log('Hello world example has been bootstrapped!');

    // Ensure FederatedEventService is constructed and initialized
    const federatedEventService = instance.getService('FederatedEventService') as FederatedEventService;
};
