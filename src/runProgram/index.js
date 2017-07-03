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

let dataTypes = require('../programDSL/dataTypes');

let rewriteMap = require('./translator/rewrite');
let runProgramMap = require('./translator/runMap');
let transformMap = require('./translator/transform');
let atomFunMap = require('./translator/atomFun');

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

    if (config.type === 'atom') {
        return config.value;
    } else if (config.type === 'bypass') {
        return bypass(programData, ctx);
    } else if (config.type === 'id') {
        return id(programData);
    } else if (config.type === 'bind_context') {
        // update context
        return bindContext(programData, ctx);
    } else {
        let programParams = getContentValues(programData);
        if (config.type === 'atomFun') {
            return atomFunMap[programType](programParams, ctx);
        } else if (config.type === 'transform') {
            return runProgram(transformMap[programType](programParams, ctx, runProgram), ctx);
        } else if (config.type === 'rewrite') {
            return runProgram(rewriteMap[programType](programParams, ctx), ctx);
        } else {
            return runProgramMap[programType](programParams, ctx, runProgram, importModule);
        }
    }
};

let bindContext = (programData, ctx) => {
    return updateAbstractionContext(programData, ctx);
};

let bypass = (programData, ctx) => {
    return runProgram(getContentValues(programData)[0], ctx);
};

let id = (programData) => {
    return getContentValues(programData)[0];
};

module.exports = {
    importModule,
    defineModule
};
