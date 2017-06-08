'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/

var CONSTANTS = require('./constants');
var hostLangApis = require('./hostLangApis');
var dataContainer = require('./dataContainer');

var applyMethod = hostLangApis.applyMethod;

var DATA = CONSTANTS.DATA,
    VOID = CONSTANTS.VOID,

    META_METHOD = CONSTANTS.META_METHOD,
    APPLICATION = CONSTANTS.APPLICATION,
    ABSTRACTION = CONSTANTS.ABSTRACTION,
    VARIABLE = CONSTANTS.VARIABLE,
    EXPRESSION = CONSTANTS.EXPRESSION;

var Abstraction = dataContainer.Abstraction,
    Context = dataContainer.Context,

    lookupVariable = dataContainer.lookupVariable,
    fillAbstractionVariable = dataContainer.fillAbstractionVariable,
    isAbstractionReducible = dataContainer.isAbstractionReducible,
    isType = dataContainer.isType;

/****************************************************
 * run program
 *****************************************************/
var runProgram = function(program, ctx) {
    var statements = program.content.statements;

    var value = null;
    for (var i = 0; i < statements.length; i++) {
        var statement = statements[i];
        var ret = runStatement(statement, ctx);
        if (!isType(statement, VOID)) {
            value = ret;
        }
    }

    return value;
};

var runStatement = function(statement, ctx) {
    if (isType(statement, VOID)) {
        return null;
    } else if (isType(statement, EXPRESSION)) {
        return runExp(statement.content.expression, ctx);
    } else {
        throw new Error('unrecognized statement');
    }
};

let runExp = (exp, ctx) => {
    if (isType(exp, VARIABLE)) {
        return lookupVariable(ctx, exp.content.variableName);
    } else if (isType(exp, ABSTRACTION)) {
        exp.content.context = ctx;
        return exp;
    } else if (isType(exp, APPLICATION)) {
        return runApplication(exp, ctx);
    } else if (isType(exp, DATA)) {
        return exp.content.data;
    } else {
        throw new Error('impossible situation');
    }
};

var runApplication = function(application, ctx) {
    var callerRet = runExp(application.content.caller, ctx);

    // TODO system methods
    if (!isType(callerRet, ABSTRACTION) &&
        !isType(callerRet, META_METHOD)
    ) {
        throw new Error('Expect function to run application, but got ' + callerRet);
    }

    var paramsRet = [];
    var params = application.content.params;
    var len = params.length;
    for (var i = 0; i < len; i++) {
        paramsRet.push(runExp(params[i], ctx));
    }

    // run abstraction
    if (isType(callerRet, ABSTRACTION)) {
        return runAbstraction(callerRet, paramsRet);
    } else { // meta method
        return runMetaMethod(callerRet, paramsRet);
    }
};

var runMetaMethod = function(metaMethod, paramsRet) {
    // TODO check some restraints
    return applyMethod(metaMethod.content.method, paramsRet);
};

var runAbstraction = function(source, paramsRet) {
    // create a new abstraction
    var abstraction = Abstraction(source.content.variables, source.content.bodyExp, source.content.context);
    // fill with some params
    for (var i = 0; i < paramsRet.length; i++) {
        fillAbstractionVariable(abstraction, i, paramsRet[i]);
    }

    if (isAbstractionReducible(abstraction)) {
        // take out all variables
        var variables = abstraction.content.variables;
        var fillMap = abstraction.content.fillMap;
        var variableMap = {};
        for (var j = 0; j < variables.length; j++) {
            var variableName = variables[j].content.variableName;
            variableMap[variableName] = fillMap[j];
        }
        // attach variables to context
        var newCtx = new Context(variableMap, source.content.context);
        // run body expression with new context
        return runExp(abstraction.content.bodyExp, newCtx);
    }
    return abstraction;
};

module.exports = runProgram;
