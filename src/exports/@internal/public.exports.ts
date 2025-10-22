/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/restrict-template-expressions: 0 */

import { enableProdMode, NgModuleRef, PlatformRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../../environments/environment';
import { afterBootstrap } from '../public.module.metadata';
import PublicModule from './public.module';

if (environment.production) {
    enableProdMode();
}

declare const require: any;
const ngVersion = require('../../../package.json').dependencies['@angular/core'] as string;

const regexpResult = /[0-9]+/.exec(ngVersion);
let major = 'latest';
if (regexpResult && regexpResult.length > 0) {
    major = regexpResult[0];
}

(window as any).platform = (window as any).platform || {};
let platform: PlatformRef = (window as any).platform[major];
if (!platform) {
    platform = platformBrowserDynamic();
    (window as any).platform[major] = platform;
}

let m: NgModuleRef<PublicModule>;

async function bootstrap() {
    try {
        m = await platform.bootstrapModule(PublicModule, { ngZone: (window as any).ngZone });
    } catch (err) {
        throw new Error(`Failed to bootstrap module. Error: ${err}`);
    }

    try {
        await afterBootstrap(m.instance);
    } catch (err) {
        throw new Error(`Failed to run afterBootstrap function. Error: ${err}`);
    }

    return m.instance;
}

export default bootstrap();
