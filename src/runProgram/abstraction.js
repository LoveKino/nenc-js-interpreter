'use strict';

let {
    Context
} = require('./context');
let {
    ordinaryAbstraction
} = require('../programDSL/dataContainer');
let {
    GUARDED_ABSTRACTION,
    META_METHOD,
    ORDINARY_ABSTRACTION
} = require('../programDSL/constants');
let {
    isType, getContentValue, setContentValue
} = require('../programDSL/dataContainer');

/**
 * fill param value at specific position
 */
var fillOrdinaryAbstractionVariable = function(abstraction, index, value) {
    let fillMap = getContentValue(abstraction, 'fillMap');
    let indexMap = getContentValue(abstraction, 'indexMap');
    let fillCount = getContentValue(abstraction, 'fillCount');

    fillMap[index] = value;

    if (!indexMap[index]) {
        indexMap[index] = true;
        setContentValue(abstraction, 'fillCount', ++fillCount);
    }
};

/**
 * when all variables are assigned, this abstraction will become reducible
 */
var isOrdinaryAbstractionReducible = function(abstraction) {
    let fillCount = getContentValue(abstraction, 'fillCount');
    let variables = getContentValue(abstraction, 'variables');
    return variables.length <= fillCount;
};

var updateAbstractionContext = function(abstraction, ctx) {
    setContentValue(abstraction, 'context', ctx);
    return abstraction;
};

var cloneOrdinaryAbstraction = function(source) {
    let variables = getContentValue(source, 'variables');
    let body = getContentValue(source, 'body');
    let context = getContentValue(source, 'context');
    return ordinaryAbstraction(variables, body, context);
};

let createAbstractionBodyContext = (abstraction) => {
    // take out all variables
    var ctx = getContentValue(abstraction, 'context');
    var variables = getContentValue(abstraction, 'variables');
    var fillMap = getContentValue(abstraction, 'fillMap');
    var variableMap = {};
    for (var j = 0; j < variables.length; j++) {
        var variableName = getContentValue(variables[j], 'variableName');
        variableMap[variableName] = fillMap[j];
    }
    // attach variables to context
    return new Context(variableMap, ctx);
};

var isCallerType = function(v) {
    return isType(v, GUARDED_ABSTRACTION) ||
        isType(v, META_METHOD) ||
        isType(v, ORDINARY_ABSTRACTION);
};

module.exports = {
    fillOrdinaryAbstractionVariable,
    isOrdinaryAbstractionReducible,
    updateAbstractionContext,
    cloneOrdinaryAbstraction,
    createAbstractionBodyContext,
    isCallerType
};
