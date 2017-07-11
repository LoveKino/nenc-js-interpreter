'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/
let systemContextMap = require('../systemContextMap');

let {
    getType, getContentValues
} = require('../programDSL/dataContainer');

let {
    updateAbstractionContext
} = require('./abstraction');

let {
    Context
} = require('./context');

let dataTypes = require('../../res/idlDataTypes');

let rewriteMap = require('./translator/rewrite');
let runProgramMap = require('./translator/runMap');
let transformMap = require('./translator/transform');
let atom_funMap = require('./translator/atom_fun');

let {
    ATOM,
    BYPASS,
    ID,
    BIND_CONTEXT,
    ATOM_FUN,
    TRANSFORM,
    REWRITE
} = require('../../res/parserTypeConstants');

let nencModules = {};

let importModule = (name) => {
    if (!nencModules[name]) {
        throw new Error(`missing module ${name}`);
    }
    if (!nencModules[name].resolved) {
        let moduleCode = nencModules[name].moduleCode;
        let module = runProgram(moduleCode, new Context(systemContextMap, null));

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
    let programType = getType(programData);
    let config = dataTypes[programType].parser || {};
    if (!config) {
        throw new Error('unexpect type of program dsl data');
    }

    let parserType = config.type;

    let parser = parserMap[parserType];
    if (parser) {
        return parser(programData, ctx, config);
    } else {
        return defaultParser(programData, ctx);
    }
};

let parserMap = {
    [ATOM]: (programData, ctx, config) => {
        return config.value;
    },

    [ID]: (programData) => {
        return getContentValues(programData)[0];
    },

    [BIND_CONTEXT]: (programData, ctx) => {
        return updateAbstractionContext(programData, ctx);
    },

    [BYPASS]: (programData, ctx) => {
        return runProgram(getContentValues(programData)[0], ctx);
    },

    [TRANSFORM]: (programData, ctx) => {
        let programType = getType(programData);
        let programParams = getContentValues(programData);

        return runProgram(transformMap[programType](programParams, ctx, runProgram), ctx);
    },

    [ATOM_FUN]: (programData, ctx) => {
        let programType = getType(programData);
        let programParams = getContentValues(programData);
        return atom_funMap[programType](programParams, ctx);
    },

    [REWRITE]: (programData, ctx) => {
        let programType = getType(programData);
        let programParams = getContentValues(programData);

        return runProgram(rewriteMap[programType](programParams, ctx), ctx);
    }
};

let defaultParser = (programData, ctx) => {
    let programType = getType(programData);
    let programParams = getContentValues(programData);

    return runProgramMap[programType](programParams, ctx, runProgram, importModule);
};

module.exports = {
    importModule,
    defineModule
};
