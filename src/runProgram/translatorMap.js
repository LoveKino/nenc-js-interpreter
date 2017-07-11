'use strict';

let {
    getAllLeafs
} = require('pfc-idl-model-translator/library/js');

let {
    sys_applyGuardedAbstraction,
    sys_applyOrdinaryAbstraction,
    sys_applyMetaMethod,
    sys_importStatementMiddle,
    sys_identity,
    sys_letStatementMiddle,
    sys_statements_middle,

    sys_ordinary_abstraction_middle
} = require('../../res/models');

let {
    lookupVariable, Context
} = require('./context');

let {
    slice, applyMethod
} = require('../util/hostLangApis');

module.exports = {
    'sys_identity': (programData) => {
        return programData.getValue();
    },
    'sys_statements_middle': (programData, ctx, runProgram, importModule) => {
        let statements = programData.getStatementList();

        let value = null;

        for (let i = 0; i < statements.length; i++) {
            let statement = statements[i];

            if (statement.className === 'sys_import') {
                // re-arrange rest statements to construct middle import statements
                return runProgram(
                    sys_importStatementMiddle(
                        // wrap with id function
                        sys_identity(importModule(statement.getModulePath())),
                        statement.getVariable(),
                        slice(statements, i + 1)
                    ), ctx);
            } else if (statement.className === 'sys_letBinding') {
                return runProgram(sys_letStatementMiddle(statement, slice(statements, i + 1)), ctx);
            }

            let ret = runProgram(statement, ctx);

            if (statement.className !== 'sys_void') {
                value = ret;
            }
        }

        return value;

    },
    'sys_statements': (programData, ctx, runProgram) => {
        let statements = getParamList(programData.getStatements());

        return runProgram(sys_statements_middle(statements), ctx);
    },

    'sys_letStatementMiddle': (programData, ctx, runProgram) => {
        let letStatement = programData.getLetStatement();
        let bindings = getParamList(letStatement.getBindings());

        let variableList = [],
            bodys = [];

        for (let j = 0; j < bindings.length; j = j + 2) {
            variableList[j] = bindings[j].getVariableName();
            bodys[j] = bindings[j + 1];
        }
        let abstractionBody = sys_statements_middle(programData.getNextStatements());

        let abstractionMiddle = sys_ordinary_abstraction_middle(variableList, abstractionBody, ctx);

        return runProgram(sys_applyOrdinaryAbstraction(abstractionMiddle, bodys), ctx);
    },

    'sys_exp': (programData, ctx, runProgram) => {
        return runProgram(programData.getExpression(), ctx);
    },

    'sys_void': () => null,

    'sys_importStatementMiddle': (programData, ctx, runProgram) => {
        let abstractionBody = sys_statements_middle(programData.getNextStatements());

        let abstractionMiddle = sys_ordinary_abstraction_middle([programData.getVariable().getVariableName()], abstractionBody, ctx);

        return runProgram(sys_applyOrdinaryAbstraction(abstractionMiddle, [programData.getModule()]), ctx);
    },

    'sys_ordinary_abstraction': (programData, ctx) => {
        let variableList = getParamList(programData.getVariables());

        return sys_ordinary_abstraction_middle(
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
        let arrList = getParamList(programData.getList());

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

        let list = getParamList(programData.getList());

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

    'sys_applyMetaMethod': (programData, ctx, runProgram) => {
        let paramsRet = resolveExpList(programData.getParams(), ctx, runProgram);

        // TODO check some restraints
        return applyMethod(programData.getMetaMethod().getMethod(), paramsRet);
    },

    'sys_application': (programData, ctx, runProgram) => {
        let callerRet = runProgram(programData.getCaller(), ctx);
        let params = getParamList(programData.getParams());
        let className = callerRet.className;

        if (className === 'sys_applyGuardedAbstraction') {
            return runProgram(sys_applyGuardedAbstraction(callerRet, params), ctx);
        } else if (className === 'sys_ordinary_abstraction_middle') {
            return runProgram(sys_applyOrdinaryAbstraction(callerRet, params), ctx);
        } else if (className === 'sys_metaMethod') {
            return runProgram(sys_applyMetaMethod(callerRet, params), ctx);
        } else {
            throw new Error(`can not find suitable caller type. Current caller type is ${className}.`);
        }
    },

    'sys_applyOrdinaryAbstraction': (programData, ctx, runProgram) => {
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

        let newFun = sys_ordinary_abstraction_middle(slice(variableList, paramsRet.length), body, newCtx);

        if (variableList.length <= paramsRet.length) {
            return runProgram(body, newCtx);
        }

        return newFun;
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

let getParamList = (list) => {
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
