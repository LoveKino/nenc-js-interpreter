'use strict';

let {
    SYS_VARIABLE, SYS_STATEMENTS, SYS_LETBINDING, SYS_IMPORT,

    SYS_ARRAY, SYS_OBJECT, SYS_IDENTITY,

    SYS_LET_STATEMENT_MIDDLE, SYS_IMPORT_STATEMENT_MIDDLE, SYS_APPLY_GUARDED_ABSTRACTION,

    SYS_APPLY_ORDINARY_ABSTRACTION, SYS_APPLY_META_METHOD
} = require('../../../res/funNameConstants');

let {
    applyMethod, slice
} = require('../../util/hostLangApis');
let {
    isType, getType, getContentValue
} = require('../../programDSL/dataContainer');

let {
    BasicContainer
} = require('../../../res/models');

let {
    fillOrdinaryAbstractionVariable, isOrdinaryAbstractionReducible, updateAbstractionContext, cloneOrdinaryAbstraction, createAbstractionBodyContext
} = require('../abstraction');

let {
    Context, lookupVariable
} = require('../context');

let runVariable = ([variableName], ctx) => {
    return lookupVariable(ctx, variableName);
};

let runObject = ([list], ctx, runProgram) => {
    let result = null,
        i = 0,
        len = 0;
    if (!list.length) return {};
    result = {};
    len = list.length;
    while (i < len) {
        let key = list[i];
        let value = list[i + 1];
        result[key.content.data] = runProgram(value, ctx);
        i += 2;
    }
    return result;
};

let runArray = ([arrList], ctx, runProgram) => {
    let array = null,
        arrLen = 0,
        j = 0;
    array = [];
    arrLen = arrList.length;
    for (j = 0; j < arrLen; j++) {
        array[j] = runProgram(arrList[j], ctx);
    }
    return array;
};

let runStatements = ([statements], ctx, runProgram, importModule) => {
    let value = null;

    for (let i = 0; i < statements.length; i++) {
        let statement = statements[i];
        let stateType = getType(statement);

        if (stateType === SYS_IMPORT) {
            // re-arrange rest statements to construct middle import statements
            return runProgram(new BasicContainer(SYS_IMPORT_STATEMENT_MIDDLE, [
                // wrap with id function
                new BasicContainer(SYS_IDENTITY, [importModule(getContentValue(statement, 'modulePath'))]),

                getContentValue(statement, 'variable'),
                slice(statements, i + 1)
            ]), ctx);

        } else if (stateType === SYS_LETBINDING) {
            return runProgram(new BasicContainer(SYS_LET_STATEMENT_MIDDLE, [
                statement,
                slice(statements, i + 1)
            ]), ctx);

        }

        let ret = runProgram(statement, ctx);

        if (statement.className !== 'Void') {
            value = ret;
        }
    }

    return value;
};

let runGuardedAbstraction = ([callerRet, params], _, runProgram) => {
    let ctx = getContentValue(callerRet, 'ctx');
    let paramsRet = resolveExpList(params, ctx, runProgram);
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
            return runOrdinaryAbstractionWithParamRets(ordinaryAbstraction, paramsRet, runProgram);
        }
    }

    throw new Error('could not find guard for params');
};

let runMetaMethod = ([metaMethod, params], ctx, runProgram) => {
    let paramsRet = resolveExpList(params, ctx, runProgram);
    // TODO check some restraints
    return applyMethod(metaMethod.getContent().method, paramsRet);
};

let runOrdinaryAbstraction = ([sourceAbstraction, params], ctx, runProgram) => {
    let paramsRet = resolveExpList(params, ctx, runProgram);

    return runOrdinaryAbstractionWithParamRets(sourceAbstraction, paramsRet, runProgram);
};

let runOrdinaryAbstractionWithParamRets = (sourceAbstraction, paramsRet, runProgram) => {
    // create a new abstraction
    let abstraction = cloneOrdinaryAbstraction(sourceAbstraction);

    // fill with some params
    for (let i = 0; i < paramsRet.length; i++) {
        fillOrdinaryAbstractionVariable(abstraction, i, paramsRet[i]);
    }

    if (isOrdinaryAbstractionReducible(abstraction)) {
        let newCtx = createAbstractionBodyContext(abstraction);

        // run body expression with new context
        let body = getContentValue(abstraction, 'body');
        return runProgram(body, newCtx);
    }

    return abstraction;
};

let resolveExpList = (params, ctx, runProgram) => {
    let paramsRet = [];
    let len = params.length;
    for (let i = 0; i < len; i++) {
        paramsRet.push(runProgram(params[i], ctx));
    }

    return paramsRet;
};

module.exports = {
    [SYS_STATEMENTS]: runStatements,
    [SYS_VARIABLE]: runVariable,

    [SYS_APPLY_GUARDED_ABSTRACTION]: runGuardedAbstraction,
    [SYS_APPLY_ORDINARY_ABSTRACTION]: runOrdinaryAbstraction,

    [SYS_APPLY_META_METHOD]: runMetaMethod,
    [SYS_ARRAY]: runArray,
    [SYS_OBJECT]: runObject
};
