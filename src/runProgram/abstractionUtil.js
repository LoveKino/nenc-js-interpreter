'use strict';

var dataContainer = require('../programDSL/dataContainer');

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

module.exports = {
    fillOrdinaryAbstractionVariable: fillOrdinaryAbstractionVariable,
    isOrdinaryAbstractionReducible: isOrdinaryAbstractionReducible,
    updateAbstractionContext: updateAbstractionContext,
    cloneOrdinaryAbstraction: cloneOrdinaryAbstraction
};
