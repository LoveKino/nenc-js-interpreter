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

var isType = function(v, type) {
    return v.type === type;
};

var getType = function(v) {
    return v.type;
};

var isCallerType = function(v) {
    return isType(v, GUARDED_ABSTRACTION) ||
        isType(v, META_METHOD) ||
        isType(v, ORDINARY_ABSTRACTION);
};

module.exports = {
    fillOrdinaryAbstractionVariable: fillOrdinaryAbstractionVariable,
    isOrdinaryAbstractionReducible: isOrdinaryAbstractionReducible,
    updateAbstractionContext: updateAbstractionContext,
    cloneOrdinaryAbstraction: cloneOrdinaryAbstraction,
    lookupVariable: lookupVariable,
    getPairValueList: getPairValueList,
    isType: isType,
    getType: getType,
    isCallerType: isCallerType
};
