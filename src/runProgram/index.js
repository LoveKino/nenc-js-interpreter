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
    NULL, ARRAY, OBJECT, NUMBER, STRING, TRUE, FALSE, STRING
}= require('../programDSL/constants');

var {applyMethod, slice}= require('../util/hostLangApis');
var {Context, BasicContainer, ordinaryAbstraction}= require('../programDSL/dataContainer');
var {
    fillOrdinaryAbstractionVariable, isOrdinaryAbstractionReducible, lookupVariable, updateAbstractionContext, isType, getType, isCallerType, cloneOrdinaryAbstraction
}= require('../dslBehavior');

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
var runProgram = function(program, ctx) {
    var statements = program.content.statements;

    var value = null;

    for (var i = 0; i < statements.length; i++) {
        var statement = statements[i];

        switch (getType(statement)) {
        case IMPORT_STATEMENT:
            return runImportStatement(statement, slice(statements, i + 1), ctx); // re-arrange rest statements
        case LET_BINDING_STATEMENT:
            return letBindingArrangement(statement, slice(statements, i + 1), ctx); // re-arrange rest statements
        }

        var ret = runStatement(statement, ctx);

        if (!isType(statement, VOID)) {
            value = ret;
        }
    }

    return value;
};

var runImportStatement = (statement, nextStatements, ctx) => {
    var modulePath = statement.content.modulePath;
    var variable = statement.content.variable;

    var abstraction = ordinaryAbstraction([variable],
        BasicContainer(STATEMENTS, {
            statements: nextStatements
        }),
        ctx);

    return runOrdinaryAbstraction(abstraction, [importModule(modulePath)]);
};

var letBindingArrangement = function(letStatement, nextStatements, ctx) {
    var bindings = letStatement.content.bindings;

    var variables = [],
        bodys = [];
    for (var j = 0; j < bindings.length; j++) {
        var binding = bindings[j];
        variables[j] = binding[0];
        bodys[j] = binding[1];
    }

    var abstraction = ordinaryAbstraction(variables,
        BasicContainer(STATEMENTS, {
            statements: nextStatements
        }),

        ctx);

    return runOrdinaryAbstraction(abstraction, resolveExpList(bodys, ctx));
};

var runStatement = function(statement, ctx) {
    switch (getType(statement)) {
    case VOID:
        return null;
    case EXPRESSION:
        return runExp(statement.content.expression, ctx);
    default:
        throw new Error('unrecognized statement: ' + JSON.stringify(statement));
    }
};

var runExp = (exp, ctx) => {
    switch (getType(exp)) {
    case VARIABLE:
        return lookupVariable(ctx, exp.content.variableName);
    case GUARDED_ABSTRACTION:
        return updateAbstractionContext(exp, ctx);
    case ORDINARY_ABSTRACTION:
        return updateAbstractionContext(exp, ctx);
    case APPLICATION:
        return runApplication(exp, ctx);
    case DATA:
        return runDataExp(exp, ctx);
    case CONDITION_EXP:
        return runConditionExp(exp, ctx);
    default:
        throw new Error('unrecognized expression: ' + JSON.stringify(exp));
    }
};

var runDataExp = function(exp, ctx) {
    var data = exp.content.data;
    var content = data.content;
    switch(getType(data)) {
    case NULL:
        return null;
    case TRUE:
        return true;
    case FALSE:
        return false;
    case NUMBER:
        return Number(content.data);
    case ARRAY:
        let arrList = content.list;
        let array = [], arrLen = arrList.length;
        for(let j = 0; j < arrLen; j++) {
            array[j] = runProgram(arrList[j], ctx);
        }
        return array;
    case STRING:
        return content.data;
    case OBJECT:
        let list = content.list;
        if(!list.length) return {};
        let result = {};
        let i = 0, len = list.length;
        while(i < len) {
            let key = list[i];
            let value = list[i + 1];
            result[key.content.data] = runProgram(value, ctx);
            i += 2;
        }
        return result;
    default:
        throw new Error(`unexpect data type ${getType(data)}`)
    }
};

var runConditionExp = function(exp, ctx) {
    var expContent = exp.content;
    var conditionExp = expContent.conditionExp;
    var option1Exp = expContent.option1Exp;
    var option2Exp = expContent.option2Exp;

    var conditionResult = runExp(conditionExp, ctx);

    if (conditionResult) {
        return runExp(option1Exp, ctx);
    } else {
        return runExp(option2Exp, ctx);
    }
};

var runApplication = function(application, ctx) {
    var callerRet = runExp(application.content.caller, ctx);

    if (!isCallerType(callerRet)) {
        throw new Error('Expect function to run application, but got ' + callerRet);
    }

    var params = application.content.params;
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
    var absContent = callerRet.content;
    var ctx = absContent.context;
    var guardLines = absContent.guardLines;
    var len = guardLines.length;

    for (var i = 0; i < len; i++) {
        var guardLine = guardLines[i];
        var guardLineContent = guardLine.content;
        var ordinaryAbstraction = guardLineContent.ordinaryAbstraction;
        var variables = ordinaryAbstraction.content.variables;
        var varLen = variables.length;

        var guards = guardLineContent.guards || [];
        var guardLen = guards.length;

        var finded = true;
        for (var j = 0; j < guardLen; j++) {
            var guard = guards[j];
            var curContext = {};

            for (var k = 0; k < varLen; k++) {
                var paramRet = paramsRet[k];
                var variableName = variables[k].content.variableName;
                curContext[variableName] = paramRet === undefined ? null : paramRet;
            }

            var ret = runExp(guard, new Context(curContext, ctx));

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
        paramsRet.push(runExp(params[i], ctx));
    }

    return paramsRet;
};

var runOrdinaryAbstraction = function(sourceAbstraction, paramsRet) {
    // create a new abstraction
    var abstraction = cloneOrdinaryAbstraction(sourceAbstraction);

    // fill with some params
    for (var i = 0; i < paramsRet.length; i++) {
        fillOrdinaryAbstractionVariable(abstraction, i, paramsRet[i]);
    }

    if (isOrdinaryAbstractionReducible(abstraction)) {
        // take out all variables
        var variables = abstraction.content.variables;
        var fillMap = abstraction.content.fillMap;
        var variableMap = {};
        for (var j = 0; j < variables.length; j++) {
            var variableName = variables[j].content.variableName;
            variableMap[variableName] = fillMap[j];
        }
        // attach variables to context
        var newCtx = new Context(variableMap, sourceAbstraction.content.context);

        // run body expression with new context
        var body = abstraction.content.body;
        if (isType(body, STATEMENTS)) {
            return runProgram(body, newCtx);
        } else {
            return runExp(body, newCtx);
        }
    }

    return abstraction;
};

module.exports = {
    importModule,
    defineModule
};
