'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/

var CONSTANTS = require('./constants');
var dataContainer = require('./dataContainer');
var runProgram = require('./runProgram');
var defaultContextMap = require('./defaultContextMap');

var PAIR = CONSTANTS.PAIR,
    VOID = CONSTANTS.VOID,
    VARIABLE = CONSTANTS.VARIABLE;

var Void = dataContainer.Void,
    Data = dataContainer.Data,
    Abstraction = dataContainer.Abstraction,
    Context = dataContainer.Context,
    Application = dataContainer.Application,
    Variable = dataContainer.Variable,
    Pair = dataContainer.Pair,

    isType = dataContainer.isType,
    getPairValueList = dataContainer.getPairValueList;

/**************************************************************
 * main interfaces
 **************************************************************/
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
