'use strict';

var hostLangApis = require('./hostLangApis');
var CONSTANTS = require('./constants');

var concat = hostLangApis.concat,
    push = hostLangApis.push;

var PAIR = CONSTANTS.PAIR,
    VOID = CONSTANTS.VOID,
    DATA = CONSTANTS.DATA,

    META_METHOD = CONSTANTS.META_METHOD,
    APPLICATION = CONSTANTS.APPLICATION,
    ABSTRACTION = CONSTANTS.ABSTRACTION,
    VARIABLE = CONSTANTS.VARIABLE,
    EXPRESSION = CONSTANTS.EXPRESSION,
    STATEMENTS = CONSTANTS.STATEMENTS,
    LET_BINDING_STATEMENT = CONSTANTS.LET_BINDING_STATEMENT;

/**************************************************************
 * basic data container
 *
 * {
 *    type: '',
 *    content: {}
 * }
 *
 **************************************************************/
var isType = function(v, type) {
    return v.type === type;
};

var Void = {
    type: VOID
};

function Statements(statements) {
    return {
        type: STATEMENTS,
        content: {
            statements: statements
        }
    };
}

function LetBingdingStatement(bindings) {
    return {
        type: LET_BINDING_STATEMENT,
        content: {
            bindings
        }
    };
}

function Expression(v) {
    return {
        type: EXPRESSION,
        content: {
            expression: v
        }
    };
}

function Pair(v1, v2) {
    return {
        type: PAIR,
        content: {
            v1, v2
        }
    };
}

function Variable(variableName) {
    return {
        type: VARIABLE,
        content: {
            variableName: variableName
        }
    };
}

function Abstraction(variables, bodyExp, context) {
    // TODO check, avoid repeated variable names
    return {
        type: ABSTRACTION,
        content: {
            fillMap: {},
            context: context || null,
            variables: variables,
            body: bodyExp,
            indexMap: {},
            fillCount: 0
        }
    };
}

function Application(caller, params) {
    return {
        type: APPLICATION,
        content: {
            caller: caller,
            params: params
        }
    };
}

function MetaMethod(method) {
    return {
        type: META_METHOD,
        content: {
            method: method
        }
    };
}

function Data(data) {
    return {
        type: DATA,
        content: {
            data: data
        }
    };
}

function Context(variableMap, parent) {
    this.parent = parent;
    this.variableMap = variableMap;
}

var getPairValueList = function(pair) {
    var result = [];
    if (isType(pair.content.v1, PAIR)) {
        result = getPairValueList(pair.content.v1);
    } else {
        result = [pair.content.v1];
    }

    if (isType(pair.content.v2, PAIR)) {
        result = concat(result, getPairValueList(pair.content.v2));
    } else {
        result = push(result, pair.content.v2);
    }

    return result;
};

/**
 * fill param value at specific position
 */
var fillAbstractionVariable = function(abstraction, index, value) {
    abstraction.content.fillMap[index] = value;
    if (!abstraction.content.indexMap[index]) {
        abstraction.content.indexMap[index] = true;
        abstraction.content.fillCount++;
    }
};

/**
 * when all variables are assigned, this abstraction will become reducible
 */
var isAbstractionReducible = function(abstraction) {
    return abstraction.content.variables.length <= abstraction.content.fillCount;
};

var lookupVariable = function(ctx, variableName) {
    var variableMap = ctx.variableMap;
    // lookup variable map
    var value = variableMap[variableName];
    if (value !== undefined) {
        return value;
    } else {
        if (!ctx.parent) {
            throw new Error('Missing definition for variable ' + variableName);
        } else {
            return lookupVariable(ctx.parent, variableName);
        }
    }
};

module.exports = {
    Void: Void,
    Pair: Pair,

    Expression: Expression,
    Variable: Variable,
    Abstraction: Abstraction,
    Application: Application,
    MetaMethod: MetaMethod,
    Statements: Statements,
    LetBingdingStatement: LetBingdingStatement,

    Data: Data,
    Context: Context,

    lookupVariable: lookupVariable,
    getPairValueList: getPairValueList,
    fillAbstractionVariable: fillAbstractionVariable,
    isAbstractionReducible: isAbstractionReducible,
    isType: isType
};
