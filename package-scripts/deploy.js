const readline = require('readline');
const utils = require('./utils');
const config = require('../module-federation/mf.config');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (question, answerCallback) => () => new Promise((resolve, reject) => {
    rl.question(question, (answer) => answerCallback(answer, resolve, reject));
});

const questions = {
    isLazyLoaded: question('Lazy Loaded ([Y]/N): ', async (answer, resolve, reject) => {
        if (answer.length === 0 || answer.toUpperCase() === 'Y') {
            console.log(`Note: Remember to call 'await importRemote<RemoteNgModule>('${config.projectName}')' to load the module before using it.`)
            resolve(true);

            return;
        }

        if (answer.toUpperCase() === 'N') {
            resolve(false);

            return;
        }

        console.error(`Error: Expected input 'Y' or 'N'. Got '${answer}'.`);
        resolve(await questions.isLazyLoaded());
    }),
    enabled: question('Starts enabled: ([Y]/N): ', async (answer, resolve, reject) => {
        if (answer.length === 0 || answer.toUpperCase() === 'Y') {
            resolve(true);

            return;
        }

        if (answer.toUpperCase() === 'N') {
            resolve(false);

            return;
        }

        console.error(`Error: Expected input 'Y' or 'N'. Got '${answer}'.`);
        resolve(await questions.enabled());
    })
};

const getMetadata = async () => {
    let basicMeta = {};
    try {
        basicMeta = utils.getBasicMetadata();
    } catch (e) {
        rl.close();
        throw e;
    }
    
    const inputMeta = {};

    for (const key of Object.keys(questions)) {
        try {
            inputMeta[key] = await questions[key]();
        } catch (err) {
            console.error(err);
            rl.close();

            return;
        }
    }

    rl.close();

    return {...inputMeta, ...basicMeta};
};

const uploadModuleWithMetadata = async () => {
    utils.compressDistFolder();

    try {
        const metadata = await getMetadata();
        utils.printMetadataInfo(metadata);
        await utils.uploadModule(config.authToken, metadata, 'dist.zip');
    } catch (err) {
        console.error('Error:', err.message);

        process.exit();
    }
};

uploadModuleWithMetadata();