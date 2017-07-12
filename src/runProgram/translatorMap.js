'use strict';

let {
    getAllLeafs
} = require('pfc-idl-model-translator/library/js');

let {
    middle_applyGuardedAbstraction,
    middle_applyOrdinaryAbstraction,
    middle_applyMetaMethod,
    middle_importStatement,
    middle_identity,
    middle_letStatement,
    middle_statements_list,

    middle_ordinary_abstraction,

    Context
} = require('../../res/models');

let {
    slice, applyMethod
} = require('../util/hostLangApis');

module.exports = {
    'sys_statements': (programData, ctx, runProgram) => {
        let statements = pairToList(programData.getStatements());

        return runProgram(middle_statements_list(statements), ctx);
    },

    'sys_exp': (programData, ctx, runProgram) => {
        return runProgram(programData.getExpression(), ctx);
    },

    'sys_void': () => null,

    'sys_ordinary_abstraction': (programData, ctx) => {
        let variableList = pairToList(programData.getVariables());

        return middle_ordinary_abstraction(
            variableList,
            programData.getBody(),
            passContext(ctx, variableList, []));
    },

    'sys_variable': (programData, ctx) => {
        return lookupVariable(ctx, programData.getVariableName());
    },

    'sys_pair': (programData) => {
        return getAllLeafs(programData, {
            branchClasses: ['sys_pair']
        });
    },

    'sys_data': (programData, ctx, runProgram) => runProgram(programData.getData(), ctx),

    'sys_number': (programData) => Number(programData.getData()),

    'sys_null': () => null,

    'sys_true': () => true,

    'sys_false': () => false,

    'sys_string': (programData) => programData.getData(),

    'sys_array': (programData, ctx, runProgram) => {
        let arrList = pairToList(programData.getList());

        let array = [],
            arrLen = 0,
            j = 0;
        arrLen = arrList.length;
        for (j = 0; j < arrLen; j++) {
            array[j] = runProgram(arrList[j], ctx);
        }
        return array;
    },

    'sys_object': (programData, ctx, runProgram) => {
        let result = null,
            i = 0,
            len = 0;

        let list = pairToList(programData.getList());

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
    },

    'sys_application': (programData, ctx, runProgram) => {
        let callerRet = runProgram(programData.getCaller(), ctx);
        let params = pairToList(programData.getParams());
        let className = callerRet.className;

        if (className === 'middle_applyGuardedAbstraction') {
            return runProgram(middle_applyGuardedAbstraction(callerRet, params), ctx);
        } else if (className === 'middle_ordinary_abstraction') {
            return runProgram(middle_applyOrdinaryAbstraction(callerRet, params), ctx);
        } else if (className === 'sys_metaMethod') {
            return runProgram(middle_applyMetaMethod(callerRet, params), ctx);
        } else {
            throw new Error(`can not find suitable caller type. Current caller type is ${className}.`);
        }
    },

    'middle_applyMetaMethod': (programData, ctx, runProgram) => {
        let paramsRet = resolveExpList(programData.getParams(), ctx, runProgram);

        // TODO check some restraints
        return applyMethod(programData.getMetaMethod().getMethod(), paramsRet);
    },

    'middle_applyOrdinaryAbstraction': (programData, ctx, runProgram) => {
        let paramExps = programData.getParams();
        let abstractionMiddle = programData.getAbstractionMiddle();
        let body = abstractionMiddle.getBody(),
            variableList = abstractionMiddle.getVariableList(),
            context = abstractionMiddle.getContext();
        // discard extra params
        if (paramExps.length > variableList.length) {
            paramExps = slice(paramExps, 0, variableList.length);
        }

        // resolve
        let paramsRet = resolveExpList(paramExps, ctx, runProgram);

        let newCtx = passContext(context, variableList, paramsRet);

        let newFun = middle_ordinary_abstraction(slice(variableList, paramsRet.length), body, newCtx);

        if (variableList.length <= paramsRet.length) {
            return runProgram(body, newCtx);
        }

        return newFun;
    },

    'middle_importStatement': (programData, ctx, runProgram) => {
        let abstractionBody = middle_statements_list(programData.getNextStatements());

        let abstractionMiddle = middle_ordinary_abstraction([programData.getVariable().getVariableName()], abstractionBody, ctx);

        return runProgram(middle_applyOrdinaryAbstraction(abstractionMiddle, [programData.getModule()]), ctx);
    },

    'middle_statements_list': (programData, ctx, runProgram, importModule) => {
        let statements = programData.getStatementList();

        let value = null;

        for (let i = 0; i < statements.length; i++) {
            let statement = statements[i];

            if (statement.className === 'sys_import') {
                // re-arrange rest statements to construct middle import statements
                return runProgram(
                    middle_importStatement(
                        // wrap with id function
                        middle_identity(importModule(statement.getModulePath())),
                        statement.getVariable(),
                        slice(statements, i + 1)
                    ), ctx);
            } else if (statement.className === 'sys_letBinding') {
                return runProgram(middle_letStatement(statement, slice(statements, i + 1)), ctx);
            }

            let ret = runProgram(statement, ctx);

            if (statement.className !== 'sys_void') {
                value = ret;
            }
        }

        return value;
    },

    'middle_letStatement': (programData, ctx, runProgram) => {
        let letStatement = programData.getLetStatement();
        let bindings = pairToList(letStatement.getBindings());

        let variableList = [],
            bodys = [];

        for (let j = 0; j < bindings.length; j = j + 2) {
            variableList[j] = bindings[j].getVariableName();
            bodys[j] = bindings[j + 1];
        }
        let abstractionBody = middle_statements_list(programData.getNextStatements());

        let abstractionMiddle = middle_ordinary_abstraction(variableList, abstractionBody, ctx);

        return runProgram(middle_applyOrdinaryAbstraction(abstractionMiddle, bodys), ctx);
    },

    'middle_identity': (programData) => {
        return programData.getValue();
    }
};

let resolveExpList = (params, ctx, runProgram) => {
    let paramsRet = [];
    let len = params.length;
    for (let i = 0; i < len; i++) {
        paramsRet.push(runProgram(params[i], ctx));
    }

    return paramsRet;
};

let pairToList = (list) => {
    return getAllLeafs(list, {
        branchClasses: ['sys_pair'],
        ignoreClasses: ['sys_void']
    });
};

/**
 * create a new context with params results
 */
let passContext = (ctx, variableList, paramsRet) => {
    // take out all variables
    let variableMap = {};

    let len = variableList.length;
    if (paramsRet.length < len) {
        len = paramsRet.length;
    }

    for (let j = 0; j < len; j++) {
        let variableName = variableList[j];
        variableMap[variableName] = paramsRet[j];
    }

    // attach variables to context
    return Context(variableMap, ctx);
};

let lookupVariable = function(ctx, variableName) {
    var variableMap = ctx.getVariableMap();
    // lookup variable map
    var value = variableMap[variableName];
    if (value !== undefined) {
        return value;
    } else {
        let parent = ctx.getParent();
        if (!parent) {
            throw new Error('Missing definition for variable ' + variableName);
        } else {
            return lookupVariable(parent, variableName);
        }
    }
};
