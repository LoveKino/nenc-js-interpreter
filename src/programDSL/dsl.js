/**
 * define DSL, used to contruct program
 */

var {
    PAIR, VOID, DATA, EXPRESSION, APPLICATION, STATEMENTS, LET_BINDING_STATEMENT, IMPORT_STATEMENT, CONDITION_EXP, GUARDED_ABSTRACTION, GUARDED_ABSTRACTION_LINE, VARIABLE
} = require('./constants');
var {
    ordinaryAbstraction, Void, BasicContainer
} = require('./dataContainer');
var {
    isType, getPairValueList
} = require('../dslBehavior');

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

    sys_null: function() {
        return null;
    },
    sys_number: function(v) {
        return Number(v);
    },

    sys_true: function() {
        return true;
    },

    sys_false: function() {
        return false;
    }
};
