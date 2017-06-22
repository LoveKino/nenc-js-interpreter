'use strict';

var dataContainer = require('../programDSL/dataContainer');
var CONSTANTS = require('../programDSL/constants');
var hostLangApis = require('../util/hostLangApis');

var concat = hostLangApis.concat,
    push = hostLangApis.push;

var PAIR = CONSTANTS.PAIR,
    GUARDED_ABSTRACTION = CONSTANTS.GUARDED_ABSTRACTION,
    META_METHOD = CONSTANTS.META_METHOD,
    ORDINARY_ABSTRACTION = CONSTANTS.ORDINARY_ABSTRACTION;

var ordinaryAbstraction = dataContainer.ordinaryAbstraction;

/**
 * fill param value at specific position
 */
var fillOrdinaryAbstractionVariable = function(abstraction, index, value) {
    abstraction.content.fillMap[index] = value;
    if (!abstraction.content.indexMap[index]) {
        abstraction.content.indexMap[index] = true;
        abstraction.content.fillCount++;
    }
};

/**
 * when all variables are assigned, this abstraction will become reducible
 */
var isOrdinaryAbstractionReducible = function(abstraction) {
    return abstraction.content.variables.length <= abstraction.content.fillCount;
};

var updateAbstractionContext = function(abstraction, ctx) {
    abstraction.content.context = ctx;
    return abstraction;
};

var cloneOrdinaryAbstraction = function(source) {
    var content = source.content;
    return ordinaryAbstraction(content.variables,
        content.body,
        content.context);
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

var getPairValueList = function(pair) {
    var result = [];
    var content = pair.content;
    var v1 = content[0],
        v2 = content[1];

    if (isType(v1, PAIR)) {
        result = getPairValueList(v1);
    } else {
        result = [v1];
    }

    if (isType(v2, PAIR)) {
        result = concat(result, getPairValueList(v2));
    } else {
        result = push(result, v2);
    }

    return result;
};

var isType = function(v, type) {
    return v && typeof v === 'object' && v.type === type;
};

var getType = function(v) {
    return v && typeof v === 'object' && v.type;
};

var isCallerType = function(v) {
    return isType(v, GUARDED_ABSTRACTION) ||
        isType(v, META_METHOD) ||
        isType(v, ORDINARY_ABSTRACTION);
};

var dataTypes = require('../programDSL/dataTypes');

let getContentValue = (v, prop) => {
    let type = v.type;
    let content = v.content;
    let typeContents = dataTypes[type].content;

    for (let i = 0; i < typeContents.length; i++) {
        let {
            name
        } = typeContents[i];
        if (name === prop) {
            return content[i];
        }
    }

    throw new Error(`unexpected prop ${prop}`);
};

module.exports = {
    fillOrdinaryAbstractionVariable,
    isOrdinaryAbstractionReducible,
    updateAbstractionContext,
    cloneOrdinaryAbstraction,
    lookupVariable,
    getPairValueList,
    isType,
    getType,
    isCallerType,
    getContentValue
};
