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
var systemContextMap = require('./systemContextMap');

var PAIR = CONSTANTS.PAIR,
    VOID = CONSTANTS.VOID,
    VARIABLE = CONSTANTS.VARIABLE;

var Void = dataContainer.Void,
    Data = dataContainer.Data,

    Abstraction = dataContainer.Abstraction,
    Context = dataContainer.Context,
    Application = dataContainer.Application,
    Variable = dataContainer.Variable,
    Expression = dataContainer.Expression,
    Statements = dataContainer.Statements,
    LetBingdingStatement = dataContainer.LetBingdingStatement,

    Pair = dataContainer.Pair,

    MetaMethod = dataContainer.MetaMethod,

    isType = dataContainer.isType,
    getPairValueList = dataContainer.getPairValueList;

let nencModules = {};

module.exports = {
    sys_void: function() {
        return Void;
    },

    sys_pair: function(v1, v2) {
        return Pair(v1, v2);
    },

    sys_variable: function(varName) {
        return Variable(varName);
    },

    sys_abstraction: function(params, body) {
        var variables = [];
        if (!isType(params, VOID)) {
            if (isType(params, VARIABLE)) {
                variables = [params];
            } else {
                variables = getPairValueList(params);
            }
        }
        return Abstraction(variables, body);
    },

    sys_data: function(v) {
        return Data(v);
    },

    sys_object: function(v) {
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
    },

    sys_array: function(v) {
        if (isType(v, VOID)) return [];
        // get list of values
        // join to list
        return getPairValueList(v);
    },

    sys_application: function(caller, rest) {
        var params = [];

        if (!isType(rest, VOID)) {
            if (isType(rest, PAIR)) {
                params = getPairValueList(rest);
            } else {
                params = [rest];
            }
        }

        return Application(caller, params);
    },

    sys_runProgram: function(program) {
        return runProgram(program, new Context(systemContextMap, null));
    },

    sys_string: function(v) {
        return v;
    },

    sys_exp: function(v) {
        return Expression(v);
    },

    sys_letBinding: function(v) {
        var list = getPairValueList(v);
        var bindings = [];
        for (var i = 0; i < list.length; i = i + 2) {
            var key = list[i];
            var value = list[i + 1];

            bindings.push([key, value]);
        }

        return LetBingdingStatement(bindings);
    },

    sys_statements: function(v) {
        var statements = [];
        if (isType(v, PAIR)) {
            statements = getPairValueList(v);
        } else {
            statements = [v];
        }

        return Statements(statements);
    },

    sys_module: function(name, module) {
        nencModules[name] = {
            module: module
        };
    },

    sys_import: function(name) {
        if (!nencModules[name]) {
            throw new Error(`missing module ${name}`);
        }
        return nencModules[name].module;
    },

    addMetaMethod: function(name, fun) {
        systemContextMap[name] = MetaMethod(fun);
    }
};
