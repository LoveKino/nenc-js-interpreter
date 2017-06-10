'use strict';

var hostLangApis = require('./hostLangApis');
var CONSTANTS = require('./constants');

var concat = hostLangApis.concat,
    push = hostLangApis.push;

var PAIR = CONSTANTS.PAIR,
    VOID = CONSTANTS.VOID;

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

function BasicContainer(type, content) {
    return {
        type: type,
        content: content
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
 * when all variables are assigned, this abstraction will become reducible
 */
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

    BasicContainer: BasicContainer,

    Context: Context,

    lookupVariable: lookupVariable,
    getPairValueList: getPairValueList,
    isType: isType
};
