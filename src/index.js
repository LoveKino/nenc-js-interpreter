'use strict';

let programDSL = require('../res/models');
let systemContextMap = require('./systemContextMap');
let {
    importModule, defineModule
} = require('./runProgram');
let {
    sys_metaMethod
} = programDSL;

module.exports = {
    sys_runProgram: function(name) {
        return importModule(name);
    },

    sys_module: function(name, moduleCode) {
        defineModule(name, moduleCode);
    },

    addMetaMethod: function(name, method) {
        systemContextMap[name] = sys_metaMethod(method);
    },

    sys_programDSL: programDSL
};
