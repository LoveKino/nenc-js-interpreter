'use strict';

var CONSTANTS = require('./constants');
var ORDINARY_ABSTRACTION = CONSTANTS.ORDINARY_ABSTRACTION;
var dataContainer = require('./programDSL/dataContainer');

var BasicContainer = dataContainer.BasicContainer;

function ordinaryAbstraction(variables, bodyExp, context) {
    return BasicContainer(ORDINARY_ABSTRACTION, {
        fillMap: {},
        context: context || null,
        variables: variables,
        body: bodyExp,
        indexMap: {},
        fillCount: 0
    });
}

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

module.exports = {
    ordinaryAbstraction: ordinaryAbstraction,
    fillOrdinaryAbstractionVariable: fillOrdinaryAbstractionVariable,
    isOrdinaryAbstractionReducible: isOrdinaryAbstractionReducible,
    updateAbstractionContext: updateAbstractionContext,
    cloneOrdinaryAbstraction: cloneOrdinaryAbstraction
};
