'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/
var systemContextMap = require('../systemContextMap');

var CONSTANTS = require('../constants');
var hostLangApis = require('../hostLangApis');
var dataContainer = require('../dataContainer');
var abstractionData = require('../abstractionData');

var applyMethod = hostLangApis.applyMethod;
var slice = hostLangApis.slice;

var DATA = CONSTANTS.DATA,
    VOID = CONSTANTS.VOID,

    META_METHOD = CONSTANTS.META_METHOD,
    APPLICATION = CONSTANTS.APPLICATION,
    ABSTRACTION = CONSTANTS.ABSTRACTION,
    VARIABLE = CONSTANTS.VARIABLE,
    STATEMENTS = CONSTANTS.STATEMENTS,
    EXPRESSION = CONSTANTS.EXPRESSION,
    LET_BINDING_STATEMENT = CONSTANTS.LET_BINDING_STATEMENT,
    IMPORT_STATEMENT = CONSTANTS.IMPORT_STATEMENT;

var Abstraction = abstractionData.Abstraction,
    fillAbstractionVariable = abstractionData.fillAbstractionVariable,
    isAbstractionReducible = abstractionData.isAbstractionReducible;

var Context = dataContainer.Context,
    BasicContainer = dataContainer.BasicContainer,
    lookupVariable = dataContainer.lookupVariable,
    isType = dataContainer.isType;

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

        if (isType(statement, IMPORT_STATEMENT)) {
            return runImportStatement(statement, slice(statements, i + 1), ctx);
            //
        } else if (isType(statement, LET_BINDING_STATEMENT)) {
            // re-arrange rest statements
            return letBindingArrangement(statement, slice(statements, i + 1), ctx);
        } else {
            var ret = runStatement(statement, ctx);
            if (!isType(statement, VOID)) {
                value = ret;
            }
        }
    }

    return value;
};

var runImportStatement = (statement, nextStatements, ctx) => {
    var modulePath = statement.content.modulePath;
    var variable = statement.content.variable;

    var abstraction = Abstraction([variable],
        BasicContainer(STATEMENTS, {
            statements: nextStatements
        }),
        ctx);

    return runAbstraction(abstraction, [importModule(modulePath)]);
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

    var abstraction = Abstraction(variables,
        BasicContainer(STATEMENTS, {
            statements: nextStatements
        }),

        ctx);

    return runAbstraction(abstraction, resolveExpList(bodys, ctx));
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

var runExp = (exp, ctx) => {
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

    var params = application.content.params;
    var paramsRet = resolveExpList(params, ctx);

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

var resolveExpList = function(params, ctx) {
    var paramsRet = [];
    var len = params.length;
    for (var i = 0; i < len; i++) {
        paramsRet.push(runExp(params[i], ctx));
    }

    return paramsRet;
};

var runAbstraction = function(source, paramsRet) {
    // create a new abstraction
    var abstraction = Abstraction(source.content.variables, source.content.body, source.content.context);

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
    importModule: importModule,
    defineModule: defineModule
};
