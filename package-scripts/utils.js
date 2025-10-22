const AdmZip = require('adm-zip');
const config = require("../module-federation/mf.config");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const https = require("https");
const packageJson = require('../package.json');
const angularJson = require("../angular.json");

const compressFolder = (folder, target) => {
    const zip = new AdmZip();
    zip.addLocalFolder(folder);
    zip.writeZip(target);
}

exports.compressDistFolder = () => {
    try {
        compressFolder('dist', 'dist.zip');
    } catch (err) {
        throw new Error(`Error: ${err.message}. Ensure that you have called 'npm run build' before deploying.`);
    }
}

exports.uploadModule = async (authToken, metadata, zipFile, endpoint) => {
    let error = '';
    if (!endpoint && (!config.endpoint || config.endpoint === '')) {
        error = 'Error: No deploy endpoint configured. Please add a deploy endpoint to the mf.config.js file.';
    } else if (!metadata) {
        error = 'Error: No metadata provided.';
    } else if (metadata.isLazyLoaded === undefined || metadata.isLazyLoaded === null) {
        error = 'Error: Lazy loaded value not provided as part of the metadata';
    } else if (metadata.enabled === undefined || metadata.enabled === null) {
        error = 'Error: enabled value not provided  as part of the metadata';
    } else if (!metadata.prefix) {
        error = 'Error: prefix value not provided in metadata';
    } else if (!metadata.version) {
        error = 'Error: version value not provided in metadata';
    } else if (!metadata.description) {
        error = 'Error: description value not provided in metadata';
    } else if (!metadata.name) {
        error = 'Error: name value not provided in metadata';
    }

    if (error) {
        console.error(error);
        process.exitCode = 1;

        return;
    }

    const deployEndpoint = `${endpoint ?? config.endpoint}/api/module-federation/client/deploy`;

    try {
        const form = new FormData();
        const zipBuffer = fs.readFileSync(zipFile)
        form.append('file', zipBuffer, {
            filename: zipFile,
            contentType: 'application/zip'
        });

        form.append('metadata', JSON.stringify(metadata));
        console.log('> Uploading module');
        const isLocalHost = deployEndpoint.startsWith('https://localhost');

        await axios.post(deployEndpoint, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${authToken}`
            },
            httpsAgent: new https.Agent({rejectUnauthorized: !isLocalHost})
        });

        console.log('✔ Module uploaded!');
    } catch (error) {
        let msg = '';

        if (error.response) {
            // Handle errored requests with a response. We use the status code here since it is more specific than the error code.
            // For example, 404 gives ERR_BAD_REQUEST, which is also the error code for 400.
            switch (error.response.status) {
                case 401:
                    msg = `${error.message}. Ensure that you have the correct value for 'authToken' in mf.config.js.`;
                    break;
                case 404:
                    msg = `${error.message}. Ensure that you have the correct value for 'endpoint' in mf.config.js.`;
                    break;
            }
        } else if (error.code) {
            // Handle errored requests without a response
            switch (error.code) {
                case 'ENOTFOUND':
                    msg = `${error.message}. Ensure that you have the correct value for 'endpoint' in mf.config.js.`;
                    break;
                case 'ETIMEDOUT':
                    msg = 'Request timed out.';
                    break;
                case 'ECONNREFUSED':
                    msg = 'Ensure that your environment is running.';
                    break;
            }
        }

        if (msg === '') {
            if (error.response && error.response.data && error.response.data.exceptionMessage) {
                msg = error.response.data.exceptionMessage
            } else if (error.response && error.response.data && error.response.data.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                msg = error.message;
            }
        }

        console.error(`Failed to deploy module. Error: ${msg}`);
    }
};

exports.resolveGenericErrorMessage = (error) => {
    if (error?.response?.data?.exceptionMessage) {
        return error.response.data.exceptionMessage
    } else if (error?.response?.data?.message) {
        return error.response.data.message;
    } else if (error?.message) {
        return error.message;
    }

    return '';
}

exports.getBasicMetadata = () => {
    const projectName = config.projectName;

    if (projectName.length > 100) {
        throw new Error("Project name exceeds 100 characters.");
    }

    if (!packageJson.description || packageJson.description.length === 0) {
        throw new Error("Missing or empty 'description' field in package.json.");
    }

    if (!packageJson.name || packageJson.name.length === 0) {
        throw new Error("Missing or empty 'name' field in package.json.");
    }

    if (!angularJson.projects[projectName]) {
        throw new Error(`Project with name '${projectName}' is missing in angular.json. Ensure that the same name in mf.config.js is used.`);
    }

    if (!angularJson.projects[projectName].prefix || angularJson.projects[projectName].prefix.length === 0) {
        throw new Error("Missing or empty 'prefix' field in angular.json.");
    }

    return {
        name: packageJson.name,
        description: packageJson.description,
        version: 'production',
        prefix: angularJson.projects[projectName].prefix
    };
}

exports.printMetadataInfo = (metadata) => {
    console.info(`Module Metadata:
    Name: ${metadata.name}
    Prefix: ${metadata.prefix}
    Description: ${metadata.description}
    Lazy Loaded: ${metadata.isLazyLoaded ? 'Yes' : 'No'}
    Enabled: ${metadata.enabled ? 'Yes' : 'No'}`);
};