'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/
let systemContextMap = require('../systemContextMap');
let translatorMap = require('./translatorMap');
let {
    middle_context
} = require('../../res/models');

let nencModules = {};

let importModule = (name) => {
    if (!nencModules[name]) {
        throw new Error(`missing module ${name}`);
    }
    if (!nencModules[name].resolved) {
        let moduleCode = nencModules[name].moduleCode;
        let module = runProgram(moduleCode, new middle_context(systemContextMap, null));

        nencModules[name].module = module;
        nencModules[name].resolved = true;

        return module;
    } else {
        return nencModules[name].module;
    }
};

let defineModule = function(name, moduleCode) {
    nencModules[name] = {
        moduleCode: moduleCode,
        resolved: false
    };
};

/**
 * run program at specific context
 */
let runProgram = (programData, ctx) => {
    let parser = translatorMap[programData.className];
    return parser(programData, ctx, runProgram, importModule);
};

module.exports = {
    importModule,
    defineModule
};
