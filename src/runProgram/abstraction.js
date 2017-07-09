'use strict';

let {
    Context
} = require('./context');
let {
    ordinaryAbstraction
} = require('../programDSL/dataContainer');
let {
    SYS_ORDINARY_ABSTRACTION,
    SYS_GUARDED_ABSTRACTION,
    SYS_METAMETHOD
} = require('../../res/funNameConstants');

let {
    isType, getContentValue, setContentValue
} = require('../programDSL/dataContainer');

/**
 * fill param value at specific position
 */
let fillOrdinaryAbstractionVariable = (abstraction, index, value) => {
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
let isOrdinaryAbstractionReducible = (abstraction) => {
    let fillCount = getContentValue(abstraction, 'fillCount');
    let variables = getContentValue(abstraction, 'variables');
    return variables.length <= fillCount;
};

let updateAbstractionContext = (abstraction, ctx) => {
    setContentValue(abstraction, 'context', ctx);
    return abstraction;
};

let cloneOrdinaryAbstraction = (source) => {
    let variables = getContentValue(source, 'variables');
    let body = getContentValue(source, 'body');
    let context = getContentValue(source, 'context');
    return ordinaryAbstraction(variables, body, context);
};

let createAbstractionBodyContext = (abstraction) => {
    // take out all variables
    let ctx = getContentValue(abstraction, 'context');
    let variables = getContentValue(abstraction, 'variables');
    let fillMap = getContentValue(abstraction, 'fillMap');
    let variableMap = {};
    for (let j = 0; j < variables.length; j++) {
        let variableName = getContentValue(variables[j], 'variableName');
        variableMap[variableName] = fillMap[j];
    }
    // attach variables to context
    return new Context(variableMap, ctx);
};

let isCallerType = (v) => {
    return isType(v, SYS_GUARDED_ABSTRACTION) ||
        isType(v, SYS_METAMETHOD) ||
        isType(v, SYS_ORDINARY_ABSTRACTION);
};

module.exports = {
    fillOrdinaryAbstractionVariable,
    isOrdinaryAbstractionReducible,
    updateAbstractionContext,
    cloneOrdinaryAbstraction,
    createAbstractionBodyContext,
    isCallerType
};
