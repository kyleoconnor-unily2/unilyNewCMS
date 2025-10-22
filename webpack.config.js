const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { FederatedTypesPlugin } = require('@unily/module-federation-typescript');
const { SasPlugin } = require('@unily/sas-plugin');
const path = require('path');

const remoteData = require('./module-federation/remotes');
const remotes = {};
for (const remote of remoteData) {
    remotes[remote.name] = remote.url;
}

const sharedMappings = shareAll({ requiredVersion: 'auto' });
delete sharedMappings['@unily/remote-service']

const federationConfig = {
    name: 'unily-futures',
    filename: 'remoteEntry.js',
    remotes,
    exposes: {
        './Public': './src/exports/@internal/public.exports.ts'
    },
    shared:  {
        // This allows us to import modules with different versions of angular.
        // This also lets us re-use packages that have already been loaded either by the shell or by previously loaded remote modules.
        ...sharedMappings
    }
}

module.exports = withModuleFederationPlugin(federationConfig);
module.exports.plugins.push(
    // new FederatedTypesPlugin({ federationConfig }), // Temporarily disabled due to invalid URLs
    new SasPlugin()
);
module.exports.experiments.topLevelAwait = true;
module.exports.devServer = {
    static: {
        directory: path.join(__dirname, 'dist')
    }
}
