'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/

var CONSTANTS = require('./constants');
var dataContainer = require('./dataContainer');
var systemContextMap = require('./systemContextMap');
var runProgram = require('./runProgram');
var abstractionData = require('./abstractionData');

var importModule = runProgram.importModule;
var defineModule = runProgram.defineModule;

var PAIR = CONSTANTS.PAIR,
    VOID = CONSTANTS.VOID,
    DATA = CONSTANTS.DATA,
    EXPRESSION = CONSTANTS.EXPRESSION,
    APPLICATION = CONSTANTS.APPLICATION,
    STATEMENTS = CONSTANTS.STATEMENTS,
    LET_BINDING_STATEMENT = CONSTANTS.LET_BINDING_STATEMENT,
    IMPORT_STATEMENT = CONSTANTS.IMPORT_STATEMENT,
    META_METHOD = CONSTANTS.META_METHOD,
    CONDITION_EXP = CONSTANTS.CONDITION_EXP,
    GUARDED_ABSTRACTION = CONSTANTS.GUARDED_ABSTRACTION,
    GUARDED_ABSTRACTION_LINE = CONSTANTS.GUARDED_ABSTRACTION_LINE,
    VARIABLE = CONSTANTS.VARIABLE;

var ordinaryAbstraction = abstractionData.ordinaryAbstraction;

var Void = dataContainer.Void,

    BasicContainer = dataContainer.BasicContainer,

    isType = dataContainer.isType,
    getPairValueList = dataContainer.getPairValueList;

module.exports = {
    sys_void: function() {
        return Void;
    },

    sys_pair: function(v1, v2) {
        return BasicContainer(PAIR, {
            v1: v1,
            v2: v2
        });
    },

    sys_variable: function(variableName) {
        return BasicContainer(VARIABLE, {
            variableName: variableName
        });
    },

    sys_guarded_abstraction: function(v) {
        let lines = [];
        if (isType(v, PAIR)) {
            lines = getPairValueList(v);
        } else {
            lines = [v];
        }

        return BasicContainer(GUARDED_ABSTRACTION, {
            guardLines: lines
        });
    },

    sys_guarded_abstraction_line: function(ordinaryAbstraction, expList) {
        var guards = [];

        if (!isType(expList, VOID)) {
            if (isType(expList, PAIR)) {
                guards = getPairValueList(expList);
            } else {
                guards = [expList];
            }
        }

        return BasicContainer(GUARDED_ABSTRACTION_LINE, {
            ordinaryAbstraction: ordinaryAbstraction,
            guards: guards
        });
    },

    sys_ordinary_abstraction: function(params, body) {
        var variables = [];
        if (!isType(params, VOID)) {
            if (isType(params, VARIABLE)) {
                variables = [params];
            } else {
                variables = getPairValueList(params);
            }
        }
        return ordinaryAbstraction(variables, body);
    },

    sys_data: function(data) {
        return BasicContainer(DATA, {
            data: data
        });
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

        return BasicContainer(APPLICATION, {
            caller: caller,
            params: params
        });
    },

    sys_string: function(v) {
        return v;
    },

    sys_exp: function(v) {
        return BasicContainer(EXPRESSION, {
            expression: v
        });
    },

    sys_letBinding: function(v) {
        var list = getPairValueList(v);
        var bindings = [];
        for (var i = 0; i < list.length; i = i + 2) {
            var key = list[i];
            var value = list[i + 1];

            bindings.push([key, value]);
        }

        return BasicContainer(LET_BINDING_STATEMENT, {
            bindings: bindings
        });
    },

    sys_statements: function(v) {
        var statements = [];
        if (isType(v, PAIR)) {
            statements = getPairValueList(v);
        } else {
            statements = [v];
        }

        return BasicContainer(STATEMENTS, {
            statements: statements
        });
    },

    sys_runProgram: function(name) {
        return importModule(name);
    },

    sys_module: function(name, moduleCode) {
        defineModule(name, moduleCode);
    },

    sys_import: function(modulePath, variable) {
        return BasicContainer(IMPORT_STATEMENT, {
            modulePath: modulePath,
            variable: variable
        });
    },

    sys_condition: function(conditionExp, option1Exp, option2Exp) {
        return BasicContainer(CONDITION_EXP, {
            conditionExp: conditionExp,
            option1Exp: option1Exp,
            option2Exp: option2Exp
        });
    },

    addMetaMethod: function(name, method) {
        systemContextMap[name] = BasicContainer(META_METHOD, {
            method: method
        });
    }
};
