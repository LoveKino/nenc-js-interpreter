'use strict';

var CONSTANTS = require('./constants');
var ABSTRACTION = CONSTANTS.ABSTRACTION;
var dataContainer = require('./dataContainer');

var BasicContainer = dataContainer.BasicContainer;

function Abstraction(variables, bodyExp, context) {
    return BasicContainer(ABSTRACTION, {
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

module.exports = {
    Abstraction: Abstraction,
    fillAbstractionVariable: fillAbstractionVariable,
    isAbstractionReducible: isAbstractionReducible
};
