'use strict';

let {
    Context
} = require('./context');

let {
    getAllLeafs
} = require('pfc-idl-model-translator/library/js');

let {
    sys_ordinary_abstraction
} = require('../../res/models');

let getParamList = (list) => {
    return getAllLeafs(list, {
        branchClasses: ['sys_pair'],
        ignoreClasses: ['sys_void']
    });
};

/**
 * fill param value at specific position
 */
let fillOrdinaryAbstractionVariable = (abstraction, index, value) => {
    let fillMap = abstraction.getFillMap() || {};
    let indexMap = abstraction.getIndexMap() || {};
    let fillCount = abstraction.getFillCount() || 0;

    fillMap[index] = value;

    if (!indexMap[index]) {
        indexMap[index] = true;
        abstraction.setFillCount(fillCount + 1);
    }
};

/**
 * when all variables are assigned, this abstraction will become reducible
 */
let isOrdinaryAbstractionReducible = (abstraction) => {
    let fillCount = abstraction.getFillCount() || 0;
    // TODO opt this
    let variables = getParamList(abstraction.getVariables());

    return variables.length <= fillCount;
};

let updateAbstractionContext = (abstraction, ctx) => {
    abstraction.setContext(ctx);
    return abstraction;
};

let cloneOrdinaryAbstraction = (source) => {
    return sys_ordinary_abstraction(source.getVariables(),
        source.getBody(),
        source.getContext(),
        Object.assign(source.getIndexMap(), {}),
        Object.assign(source.getFillMap(), {}),
        source.getFillCount());
};

let createAbstractionBodyContext = (abstraction) => {
    // take out all variables
    let ctx = abstraction.getContext();
    let variables = abstraction.getVariables();
    let fillMap = abstraction.getFillMap();
    let variableMap = {};

    for (let j = 0; j < variables.length; j++) {
        let variableName = variables[j].getVariableName();
        variableMap[variableName] = fillMap[j];
    }
    // attach variables to context
    return Context(variableMap, ctx);
};

module.exports = {
    fillOrdinaryAbstractionVariable,
    isOrdinaryAbstractionReducible,
    updateAbstractionContext,
    cloneOrdinaryAbstraction,
    createAbstractionBodyContext
};
