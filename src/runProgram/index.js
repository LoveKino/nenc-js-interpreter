'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/
var systemContextMap = require('../systemContextMap');

var {
    DATA, VOID, META_METHOD, APPLICATION, ORDINARY_ABSTRACTION, VARIABLE, STATEMENTS, EXPRESSION, GUARDED_ABSTRACTION, LET_BINDING_STATEMENT, CONDITION_EXP, IMPORT_STATEMENT,
    NULL, ARRAY, OBJECT, NUMBER, STRING, TRUE, FALSE
}= require('../programDSL/constants');

var {applyMethod, slice}= require('../util/hostLangApis');
var {BasicContainer, ordinaryAbstraction}= require('../programDSL/dataContainer');
let {
    isType, getType, getContentValue
} = require('../dslBehavior');

let {
    fillOrdinaryAbstractionVariable, isOrdinaryAbstractionReducible, updateAbstractionContext, isCallerType, cloneOrdinaryAbstraction, createAbstractionBodyContext
}= require('./abstraction');

let {Context, lookupVariable} = require('./context');

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

/****************************************************
 * run program
 *****************************************************/
var runProgram = function(programData, ctx) {
    switch(getType(programData)) {
    case STATEMENTS:
        return runStatements(programData, ctx);
    case VOID:
        return null;
    // expression
    case EXPRESSION:
        return runProgram(getContentValue(programData, 'expression'), ctx);
    case VARIABLE:
        return lookupVariable(ctx, getContentValue(programData, 'variableName'));
    case GUARDED_ABSTRACTION:
        // update context
        return updateAbstractionContext(programData, ctx);
    case ORDINARY_ABSTRACTION:
        return updateAbstractionContext(programData, ctx);
    case APPLICATION:
        return runApplication(programData, ctx);
    case DATA:
        return runProgram(getContentValue(programData, 'data'), ctx);
    case CONDITION_EXP:
        return runConditionExp(programData, ctx);
    // data
    case NULL:
        return null;
    case TRUE:
        return true;
    case FALSE:
        return false;
    case NUMBER:
        return Number(getContentValue(programData, 'data'));
    case ARRAY: //eslint-disable-line
        let arrList = null, array = null, arrLen = 0, j = 0;
        arrList = getContentValue(programData, 'list');
        array = [];
        arrLen = arrList.length;
        for(j = 0; j < arrLen; j++) {
            array[j] = runProgram(arrList[j], ctx);
        }
        return array;
    case STRING:
        return getContentValue(programData, 'data');
    case OBJECT: // eslint-disable-line
        let list = null, result = null, i = 0, len = 0;
        list = getContentValue(programData, 'list');
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

    default:
        throw new Error('unexpect type of program dsl data');
    }
};

let runStatements = (program, ctx) => {
    var statements = getContentValue(program, 'statements');

    var value = null;

    for (var i = 0; i < statements.length; i++) {
        var statement = statements[i];

        switch (getType(statement)) {
        case IMPORT_STATEMENT:
            return runImportStatement(statement, slice(statements, i + 1), ctx); // re-arrange rest statements
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

var runImportStatement = (statement, nextStatements, ctx) => {
    var modulePath = getContentValue(statement, 'modulePath');
    var variable = getContentValue(statement, 'variable');

    var abstraction = ordinaryAbstraction([variable],
        BasicContainer(STATEMENTS, [nextStatements]),
        ctx);

    return runOrdinaryAbstraction(abstraction, [importModule(modulePath)]);
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

    return runOrdinaryAbstraction(abstraction, resolveExpList(bodys, ctx));
};

var runConditionExp = function(exp, ctx) {
    var conditionExp = getContentValue(exp, 'conditionExp');
    var option1Exp = getContentValue(exp, 'option1Exp');
    var option2Exp = getContentValue(exp, 'option2Exp');

    var conditionResult = runProgram(conditionExp, ctx);

    if (conditionResult) {
        return runProgram(option1Exp, ctx);
    } else {
        return runProgram(option2Exp, ctx);
    }
};

var runApplication = function(application, ctx) {
    var callerRet = runProgram(getContentValue(application, 'caller'), ctx);

    if (!isCallerType(callerRet)) {
        throw new Error('Expect function to run application, but got ' + callerRet);
    }

    var params = getContentValue(application, 'params');
    var paramsRet = resolveExpList(params, ctx);

    // run abstraction
    switch (getType(callerRet)) {
    case GUARDED_ABSTRACTION:
        return runGuardedAbstraction(callerRet, paramsRet);
    case ORDINARY_ABSTRACTION:
        return runOrdinaryAbstraction(callerRet, paramsRet);
    case META_METHOD:
        return runMetaMethod(callerRet, paramsRet);
    default:
        throw new Error('Expect function to run application, but got ' + callerRet);
    }
};

var runGuardedAbstraction = function(callerRet, paramsRet) {
    var ctx = getContentValue(callerRet, 'ctx');
    var guardLines = getContentValue(callerRet, 'guardLines');
    var len = guardLines.length;

    for (var i = 0; i < len; i++) {
        var guardLine = guardLines[i];
        var ordinaryAbstraction = getContentValue(guardLine, 'ordinaryAbstraction');
        var guards = getContentValue(guardLine, 'guards') || [];
        var variables = getContentValue(ordinaryAbstraction, 'variables');

        var varLen = variables.length;
        var guardLen = guards.length;

        var finded = true;
        for (var j = 0; j < guardLen; j++) {
            var guard = guards[j];
            var curContext = {};

            for (var k = 0; k < varLen; k++) {
                var paramRet = paramsRet[k];
                var variableName = getContentValue(variables[k], 'variableName');
                curContext[variableName] = paramRet === undefined ? null : paramRet;
            }

            var ret = runProgram(guard, new Context(curContext, ctx));

            if (ret === false || ret === null || ret === 0 || ret === undefined) {
                finded = false;
                break;
            }
        }

        if (finded) {
            updateAbstractionContext(ordinaryAbstraction, ctx);
            return runOrdinaryAbstraction(ordinaryAbstraction, paramsRet);
        }
    }

    throw new Error('could not find guard for params');
};

var runMetaMethod = function(metaMethod, paramsRet) {
    // TODO check some restraints
    return applyMethod(metaMethod.content.method, paramsRet);
};

var resolveExpList = function(params, ctx) {
    var paramsRet = [];
    var len = params.length;
    for (var i = 0; i < len; i++) {
        paramsRet.push(runProgram(params[i], ctx));
    }

    return paramsRet;
};

let runOrdinaryAbstraction = function(sourceAbstraction, paramsRet) {
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
        if (isType(body, STATEMENTS)) {
            return runProgram(body, newCtx);
        } else {
            return runProgram(body, newCtx);
        }
    }

    return abstraction;
};

module.exports = {
    importModule,
    defineModule
};
