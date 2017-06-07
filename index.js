'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/

var hostLangApis = require('./hostLangApis');
var dataContainer = require('./dataContainer');

var applyMethod = hostLangApis.applyMethod;

var {
    PAIR, VOID, DATA, META_METHOD, APPLICATION, ABSTRACTION, VARIABLE,
    Void,
    Pair,
    Variable,
    Abstraction,
    Application,
    MetaMethod,
    Data,
    Context,
    lookupVariable,
    getPairValueList,
    fillAbstractionVariable,
    isAbstractionReducible,
    isType
} = dataContainer;

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

/**************************************************************
 * main interfaces
 **************************************************************/
// TODO system methods
var defaultContextMap = {
    '+': MetaMethod(function(v1, v2) {
        return v1 + v2;
    }),

    '-': MetaMethod(function(v1, v2) {
        return v1 - v2;
    }),

    '*': MetaMethod(function(v1, v2) {
        return v1 * v2;
    }),

    '/': MetaMethod(function(v1, v2) {
        return v1 / v2;
    })
};

var sys_runProgram = function(program) {
    return runProgram(program, new Context(defaultContextMap, null));
};

var sys_application = function(caller, rest) {
    var params = [];
    if (!isType(rest, VOID)) {
        if (isType(rest, PAIR)) {
            params = getPairValueList(rest);
        } else {
            params = [rest];
        }
    }
    return Application(caller, params);
};

var sys_variable = function(varName) {
    return Variable(varName);
};

var sys_abstraction = function(params, body) {
    var variables = [];
    if (!isType(params, VOID)) {
        if (isType(params, VARIABLE)) {
            variables = [params];
        } else {
            variables = getPairValueList(params);
        }
    }
    return Abstraction(variables, body);
};

var sys_void = function() {
    return Void;
};

var sys_pair = function(v1, v2) {
    return Pair(v1, v2);
};

var sys_data = function(v) {
    return Data(v);
};

// composed data types
var sys_object = function(v) {
    if (isType(v, VOID)) return {};
    // get list of values
    // join to map
    var result = {};
    var list = getPairValueList(v);
    var i = 0,
        len = list.length;
    while (i < len) {
        var key = list[i];
        var value = list[i + 1];
        result[key] = value;
        i += 2;
    }

    return result;
};

var sys_array = function(v) {
    if (isType(v, VOID)) return [];
    // get list of values
    // join to list
    return getPairValueList(v);
};

var sys_string = function(v) {
    return v;
};

module.exports = {
    sys_void,
    sys_pair,

    sys_variable,
    sys_abstraction,
    sys_application,

    sys_data,
    sys_object,
    sys_array,
    sys_string,

    sys_runProgram
};
