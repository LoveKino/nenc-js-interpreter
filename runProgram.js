'use strict';

var hostLangApis = require('./hostLangApis');
var dataContainer = require('./dataContainer');

var applyMethod = hostLangApis.applyMethod;
var DATA = dataContainer.DATA,
    META_METHOD = dataContainer.META_METHOD,
    APPLICATION = dataContainer.APPLICATION,
    ABSTRACTION = dataContainer.ABSTRACTION,
    VARIABLE = dataContainer.VARIABLE,
    Abstraction = dataContainer.Abstraction,
    Context = dataContainer.Context,
    lookupVariable = dataContainer.lookupVariable,
    fillAbstractionVariable = dataContainer.fillAbstractionVariable,
    isAbstractionReducible = dataContainer.isAbstractionReducible,
    isType = dataContainer.isType;

/****************************************************
 * run program
 *****************************************************/
var runProgram = function(program, ctx) {
    if (isType(program, VARIABLE)) {
        return lookupVariable(ctx, program.content.variableName);
    } else if (isType(program, ABSTRACTION)) {
        program.content.context = ctx;
        return program;
    } else if (isType(program, APPLICATION)) {
        return runApplication(program, ctx);
    } else if (isType(program, DATA)) {
        return program.content.data;
    } else {
        throw new Error('impossible situation');
    }
};

var runApplication = function(application, ctx) {
    var callerRet = runProgram(application.content.caller, ctx);

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
        paramsRet.push(runProgram(params[i], ctx));
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
        return runProgram(abstraction.content.bodyExp, newCtx);
    }
    return abstraction;
};

module.exports = {
    runProgram
};
