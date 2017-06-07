'use strict';

var hostLangApis = require('./hostLangApis');
var concat = hostLangApis.concat,
    push = hostLangApis.push;

/**************************************************************
 * basic data container
 *
 * {
 *    type: '',
 *    content: {}
 * }
 *
 **************************************************************/
var PAIR = 'pair',
    VOID = 'void',
    DATA = 'data',
    META_METHOD = 'metaMethod',
    APPLICATION = 'application',
    ABSTRACTION = 'abstraction',
    VARIABLE = 'variable';

var isType = function(v, type) {
    return v.type === type;
};

var Void = {
    type: VOID
};

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
            variableName
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
            variables,
            bodyExp,
            indexMap: {},
            fillCount: 0
        }
    };
}

function Application(caller, params) {
    return {
        type: APPLICATION,
        content: {
            caller,
            params
        }
    };
}

function MetaMethod(method) {
    return {
        type: META_METHOD,
        content: {
            method
        }
    };
}

function Data(data) {
    return {
        type: DATA,
        content: {
            data
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
    isType,
    PAIR, VOID, DATA, META_METHOD, APPLICATION, ABSTRACTION, VARIABLE
};
