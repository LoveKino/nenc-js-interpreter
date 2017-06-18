'use strict';

var CONSTANTS = require('./constants');

var ORDINARY_ABSTRACTION = CONSTANTS.ORDINARY_ABSTRACTION,
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

module.exports = {
    Void: Void,

    BasicContainer: BasicContainer,

    Context: Context,

    ordinaryAbstraction: ordinaryAbstraction
};
