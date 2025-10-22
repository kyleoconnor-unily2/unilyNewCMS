const fs = require('fs');
const config = require('../module-federation/mf.config');
const { manifestFactory } = require('@unily/manifest-factory');

manifestFactory(config).then(result => {
    const esModule = `module.exports = ${JSON.stringify(result)}`;
    fs.writeFileSync('module-federation/remotes.js', esModule, { flag: 'w' });
});
