const {program} = require('commander');
const axios = require("axios");
const https = require("https");
const utils = require('./utils');

program
    .requiredOption('-c, --clientId <client ID>')
    .requiredOption('-s, --secret <client secret>')
    .requiredOption('-h, --host <host>')
    .option('-l, --lazy <boolean>', 'Specifies if the MFE should be lazy loaded. Defaults to true.')
    .option('-e, --enabled <boolean>', 'Specifies if the MFE should be enabled or not. Defaults to true');

program.parse();

const options = program.opts();

options.clientId = options.clientId?.trim();
options.secret = options.secret?.trim();

if (!options.clientId) {
    console.error(`Provide a valid clientId for option '-c, --clientId <client ID>'. Do not provide an empty string.`);
    process.exitCode = 1;
    return;
}

if (!options.secret) {
    console.error(`Provide a valid secret for option '-s, --secret <client secret>'. Do not provide an empty string.`);
    process.exitCode = 1;
    return;
}

const hostRegex = /^(https?:\/\/)?([\w-]+\.)*[\w-]+(\.[a-z]+)$/;

options.host = options.host?.trim();

if (!hostRegex.test(options.host)) {
    console.error(`Value for option -h, --host <host> does not contain a valid host url. Value is : ${options.host}`);
    process.exitCode = 1;
    return;
}

const httpPrefixRegex = /^https?:\/\//;
if (!httpPrefixRegex.test(options.host)) {
    options.host = `https://${options.host}`;
}

options.lazy = options.lazy?.trim().toLowerCase();
options.enabled = options.enabled?.trim().toLowerCase();

// If provided validate lazy / enabled inputs
if (options.lazy && options.lazy !== 'false' && options.lazy !== 'true') {
    console.error(`Value for option -l, --lazy <true|false> should be a boolean value. Value provided: ${options.lazy}`);
    process.exitCode = 1;
    return;
}

if (options.enabled && options.enabled !== 'false' && options.enabled !== 'true') {
    console.error(`Value for option -e, --enabled <true|false> should be a boolean value. Value provided: ${options.enabled}`);
    process.exitCode = 1;
    return;
}

// Convert to boolean value if provided. Default to true if not provided.
options.lazy = options.lazy ? options.lazy === "true" : true;
options.enabled = options.enabled ? options.enabled === "true" : true;

const getPATData = async (authToken, host) => {
    let errorMsg;

    if (!authToken) {
        errorMsg = `Failed to retrieve PAT Data. No auth token provided.`;
    } else if (!host?.trim()) {
        errorMsg = `Failed to retrieve PAT Data. No host url provided.`;
    }

    if (errorMsg) {
        console.error(errorMsg);
        process.exitCode = 1;
        return;
    }

    try {
        const connectEndpoint = `${host}/api/v1/federated-modules/config`;
        const data = {
            tokenLifetime: 3600
        };

        let response = await axios.post(connectEndpoint, data, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        return response.data;
    } catch (error) {
        let msg = '';
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    msg = `${error.message}. Malformed request. Make sure that a tokenLifetime is provided.`;
                    break;
                case 401:
                    msg = `${error.message}. Ensure that you have the correct client id and client secret provided`;
                    break;
                case 404:
                case 405:
                    msg = `${error.message}. Please ensure the host URL (${options.host}) points to a valid API host.`;
                    break;
            }
        } else if (error.code) {
            // Handle errored requests without a response
            switch (error.code) {
                case 'ETIMEDOUT':
                    msg = 'Request timed out.';
                    break;
                case 'ECONNREFUSED':
                    msg = 'Ensure that your environment is running.';
                    break;
                case 'ENOTFOUND':
                    msg = `Invalid host URL (${options.host}). Please ensure the host URL points to a valid API host.`;
                    break;
            }
        }

        if (msg === '') {
            msg = utils.resolveGenericErrorMessage(error);
        }

        console.error(`Failed to fetch PAT Data. Error: ${msg}`);
        process.exitCode = 1;
    }
};

const getCredentials = async (clientId, clientSecret, host) => {
    let errorMsg;

    if (!clientId?.trim()) {
        errorMsg = `Failed to fetch credentials. No client ID provided.`;
    } else if (!clientSecret?.trim()) {
        errorMsg = `Failed to fetch credentials. No client secret provided.`;
    } else if (!host?.trim()) {
        errorMsg = `Failed to fetch credentials. No host url provided.`;
    }

    if (errorMsg) {
        console.error(errorMsg);
        process.exitCode = 1;
        return;
    }

    try {
        const connectEndpoint = `${host}/connect/token`;

        const data = {
            grant_type: 'client_credentials',
            scope: 'gateway.modulefederationworkspace:readWrite',
            client_id: clientId,
            client_secret: clientSecret
        };

        let response = await axios.post(connectEndpoint, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        let token = response.data?.access_token;
        if (!token) {
            console.error(`Failed to fetch credentials. Error: Invalid host URL (${options.host}). Please ensure the host URL points to a valid API host`);
            process.exitCode = 1;
            return;
        }

        return token;

    } catch (error) {
        let msg = '';

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    msg = `${error.message}. Response body: ${JSON.stringify(error.response.data)}. Ensure that you have the correct client id and client secret provided`
                    break;
                case 404:
                case 405:
                    msg = `${error.message}. Please ensure the host URL (${options.host}) points to a valid API host.`;
                    break;
            }
        } else if (error.code) {
            switch (error.code) {
                case 'ETIMEDOUT':
                    msg = 'Request timed out.';
                    break;
                case 'ECONNREFUSED':
                    msg = 'Ensure that your environment is running.';
                    break;
                case 'ENOTFOUND':
                    msg = `Invalid host URL (${options.host}). Please ensure the host URL points to a valid API host.`;
                    break;
            }
        }

        if (msg === '') {
            msg = utils.resolveGenericErrorMessage(error);
        }

        console.error(`Failed to fetch credentials. Error: ${msg}`);
        process.exitCode = 1;
    }
}

(async () => {
    try {
        let authToken = await getCredentials(options.clientId, options.secret, options.host);
        if (!authToken) {
            return;
        }

        let patData = await getPATData(authToken, options.host);
        if (!patData) {
            return;
        }
        let metadata = {
            isLazyLoaded: options.lazy,
            enabled: options.enabled,
            ...utils.getBasicMetadata()
        }

        utils.printMetadataInfo(metadata);
        utils.compressDistFolder();

        await utils.uploadModule(patData.authToken, metadata, 'dist.zip', patData.endpoint);
    } catch (err) {
        let msg = err.message && !err.message.startsWith('Error:') ? `Error: ${err.message}` : err.message;
        console.error(msg);

        process.exitCode = 1;
    }
})();