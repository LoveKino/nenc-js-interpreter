'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/
var systemContextMap = require('../systemContextMap');

var {
    VOID, META_METHOD, APPLICATION, ORDINARY_ABSTRACTION, VARIABLE, STATEMENTS, GUARDED_ABSTRACTION, LET_BINDING_STATEMENT, CONDITION_EXP, IMPORT_STATEMENT,
    ARRAY, OBJECT, NUMBER, STRING,

    IMPORT_STATEMENT_MIDDLE, APPLY_GUARDED_ABSTRACTION, APPLY_ORDINARY_ABSTRACTION, APPLY_META_METHOD
}= require('../programDSL/constants');

var {applyMethod, slice}= require('../util/hostLangApis');
var {BasicContainer, ordinaryAbstraction}= require('../programDSL/dataContainer');
let {
    isType, getType, getContentValue, getContentValues
} = require('../dslBehavior');

let {
    fillOrdinaryAbstractionVariable, isOrdinaryAbstractionReducible, updateAbstractionContext, isCallerType, cloneOrdinaryAbstraction, createAbstractionBodyContext
}= require('./abstraction');

let {Context, lookupVariable} = require('./context');

let transltorConfig = require('./translatorConfig');

var nencModules = {};

var importModule = function(name) {
    if (!nencModules[name]) {
        throw new Error(`missing module ${name}`);
    }
    if (!nencModules[name].resolved) {
        var moduleCode = nencModules[name].moduleCode;
        var module = runProgram(moduleCode, new Context(systemContextMap, null));

        nencModules[name].module = module;
        nencModules[name].resolved = true;

        return module;
    } else {
        return nencModules[name].module;
    }
};

var defineModule = function(name, moduleCode) {
    nencModules[name] = {
        moduleCode: moduleCode,
        resolved: false
    };
};

/**
 * run program at specific context
 */
var runProgram = function(programData, ctx) {
    let programType = getType(programData);
    let config = transltorConfig[programType];
    if(!config) {
        throw new Error('unexpect type of program dsl data');
    }

    if(config.type === 'atom') {
        return config.value;
    } else if(config.type === 'bypass') {
        return bypass(programData, ctx);
    } else if(config.type === 'bind_context') {
        // update context
        return bindContext(programData, ctx);
    } else {
        let programParams = getContentValues(programData);
        if (config.type === 'transfrom') {
            return runProgram(transfromMap[programType](programParams, ctx), ctx);
        } else {
            return runProgramMap[programType](programParams, ctx);
        }
    }
};

let bindContext = (programData, ctx) => {
    return updateAbstractionContext(programData, ctx);
};

let runVariable = ([variableName], ctx) => {
    return lookupVariable(ctx, [variableName]);
};

let bypass = (programData, ctx) => {
    return runProgram(getContentValues(programData)[0], ctx);
};

let runString = ([data]) => {
    return data;
};

let runNumber = ([number]) => {
    return Number(number);
};

let runObject = ([list], ctx) => {
    let result = null, i = 0, len = 0;
    if(!list.length) return {};
    result = {};
    len = list.length;
    while(i < len) {
        let key = list[i];
        let value = list[i + 1];
        result[key.content.data] = runProgram(value, ctx);
        i += 2;
    }
    return result;
};

let runArray = ([arrList], ctx) => {
    let array = null, arrLen = 0, j = 0;
    array = [];
    arrLen = arrList.length;
    for(j = 0; j < arrLen; j++) {
        array[j] = runProgram(arrList[j], ctx);
    }
    return array;
};

let runStatements = ([statements], ctx) => {
    var value = null;

    for (var i = 0; i < statements.length; i++) {
        var statement = statements[i];

        switch (getType(statement)) {
        case IMPORT_STATEMENT:
            // re-arrange rest statements to construct middle import statements
            return runProgram(BasicContainer(IMPORT_STATEMENT_MIDDLE, [statement, slice(statements, i + 1)]), ctx);
        case LET_BINDING_STATEMENT:
            return letBindingArrangement(statement, slice(statements, i + 1), ctx); // re-arrange rest statements
        }

        var ret = runProgram(statement, ctx);

        if (!isType(statement, VOID)) {
            value = ret;
        }
    }

    return value;
};

let runImportStatement = ([statement, nextStatements], ctx) => {
    let modulePath = getContentValue(statement, 'modulePath');
    let variable = getContentValue(statement, 'variable');

    let abstraction = ordinaryAbstraction([variable],
        BasicContainer(STATEMENTS, [nextStatements]),
        ctx);

    return runOrdinaryAbstraction([abstraction, [importModule(modulePath)]]);
};

var letBindingArrangement = function(letStatement, nextStatements, ctx) {
    var bindings = getContentValue(letStatement, 'bindings');

    var variables = [],
        bodys = [];

    for (var j = 0; j < bindings.length; j = j + 2) {
        variables[j] = bindings[j];
        bodys[j] = bindings[j + 1];
    }

    var abstraction = ordinaryAbstraction(variables,
        BasicContainer(STATEMENTS, [nextStatements]),

        ctx);

    return runOrdinaryAbstraction([abstraction, resolveExpList(bodys, ctx)]);
};

var transformConditionExp = function([conditionExp, option1Exp, option2Exp], ctx) {
    // run condition
    var conditionResult = runProgram(conditionExp, ctx);

    if (conditionResult) {
        return option1Exp;
    } else {
        return option2Exp;
    }
};

let transfromApplication = function([caller, params], ctx) {
    let paramsRet = resolveExpList(params, ctx);
    let callerRet = runProgram(caller, ctx);

    if (!isCallerType(callerRet)) {
        throw new Error('Expect function to run application, but got ' + callerRet);
    }

    // run abstraction
    switch (getType(callerRet)) {
    case GUARDED_ABSTRACTION:
        return BasicContainer(APPLY_GUARDED_ABSTRACTION, [callerRet, paramsRet]);
    case ORDINARY_ABSTRACTION:
        return BasicContainer(APPLY_ORDINARY_ABSTRACTION, [callerRet, paramsRet]);
    case META_METHOD:
        return BasicContainer(APPLY_META_METHOD, [callerRet, paramsRet]);
    }
};

let runGuardedAbstraction = function([callerRet, paramsRet]) {
    let ctx = getContentValue(callerRet, 'ctx');
    let guardLines = getContentValue(callerRet, 'guardLines');
    let len = guardLines.length;

    for (let i = 0; i < len; i++) {
        let guardLine = guardLines[i];
        let ordinaryAbstraction = getContentValue(guardLine, 'ordinaryAbstraction');
        let guards = getContentValue(guardLine, 'guards') || [];
        let variables = getContentValue(ordinaryAbstraction, 'variables');

        let varLen = variables.length;
        let guardLen = guards.length;

        let finded = true;
        for (let j = 0; j < guardLen; j++) {
            let guard = guards[j];
            let curContext = {};

            for (let k = 0; k < varLen; k++) {
                let paramRet = paramsRet[k];
                let variableName = getContentValue(variables[k], 'variableName');
                curContext[variableName] = paramRet === undefined ? null : paramRet;
            }

            let ret = runProgram(guard, new Context(curContext, ctx));

            if (ret === false || ret === null || ret === 0 || ret === undefined) {
                finded = false;
                break;
            }
        }

        if (finded) {
            updateAbstractionContext(ordinaryAbstraction, ctx);
            return runOrdinaryAbstraction([ordinaryAbstraction, paramsRet]);
        }
    }

    throw new Error('could not find guard for params');
};

var runMetaMethod = function([metaMethod, paramsRet]) {
    // TODO check some restraints
    return applyMethod(metaMethod.content.method, paramsRet);
};

let runOrdinaryAbstraction = function([sourceAbstraction, paramsRet]) {
    // create a new abstraction
    var abstraction = cloneOrdinaryAbstraction(sourceAbstraction);

    // fill with some params
    for (var i = 0; i < paramsRet.length; i++) {
        fillOrdinaryAbstractionVariable(abstraction, i, paramsRet[i]);
    }

    if (isOrdinaryAbstractionReducible(abstraction)) {
        var newCtx = createAbstractionBodyContext(abstraction);

        // run body expression with new context
        var body = getContentValue(abstraction, 'body');
        return runProgram(body, newCtx);
    }

    return abstraction;
};

var resolveExpList = function(params, ctx) {
    var paramsRet = [];
    var len = params.length;
    for (var i = 0; i < len; i++) {
        paramsRet.push(runProgram(params[i], ctx));
    }

    return paramsRet;
};

let transfromMap = {
    [CONDITION_EXP]: transformConditionExp,
    [APPLICATION]: transfromApplication
};

let runProgramMap = {
    [STATEMENTS]: runStatements,
    [VARIABLE]: runVariable,
    [IMPORT_STATEMENT_MIDDLE]: runImportStatement,

    [APPLY_GUARDED_ABSTRACTION]: runGuardedAbstraction,
    [APPLY_ORDINARY_ABSTRACTION]: runOrdinaryAbstraction,
    [APPLY_META_METHOD]: runMetaMethod,

    [NUMBER]: runNumber,
    [ARRAY]: runArray,
    [STRING]: runString,
    [OBJECT]: runObject
};

module.exports = {
    importModule,
    defineModule
};
