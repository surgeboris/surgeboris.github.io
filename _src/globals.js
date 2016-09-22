const path = require('path');

global.globalRootRequire = (module) => require(path.join(__dirname, module));

module.exports = global.globalRootRequire;
