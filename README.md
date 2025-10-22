# Extendexample

This project was generated from running the schematic `@unily/angular-sdk:new-mfe`. The schematic has automatically setup scaffolding for a micro frontend module build, it generated the essential files and configurations needed to make Angular Module Federation facilities available within this new workspace.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4201`. 
Run `npm run watch` so the application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the module. The build artifacts will be stored in the `dist/` directory.

## Deploy

Run `npm run deploy` to deploy the module. This module will be added to the client modules tab in the CMS once it's been successfully deployed.

## Deploy Ci

Run `npm run deploy-ci -- -h https://myexamplehost-api.unily.com -c myClientId -s myClientSecret` to deploy the module via CI/CD pipelines.

This script accepts the following options. Each option requires a value assigned to it. Options can be used
in the short or long version. Both will have the same result.

- -h, --host <host value> - The domain of your api gateway
- -c, --clientId <client ID> - Your client ID. Contact customer support to provide you one.
- -s, --secret <client secret> - Your secret key. Contact customer support to provide you one.
- -l, --lazy <value> - Accepts a boolean value. True or false. Defaults to true if unspecified. If true, the module will
  be configured as lazy loaded. If false, it would be loaded eagerly.
- -e, --enabled <value> - Accepts a boolean value. True or false. Defaults to true if unspecified. If true, the module
  will be enabled, otherwise it will not and will never be loaded.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
