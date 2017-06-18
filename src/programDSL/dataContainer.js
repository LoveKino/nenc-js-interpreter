'use strict';

let {
    ORDINARY_ABSTRACTION, VOID
} = require('./constants');

/**************************************************************
 * basic data container
 *
 * {
 *    type: '',
 *    content: {}
 * }
 *
 **************************************************************/
let Void = {
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
        variables,
        body: bodyExp,
        indexMap: {},
        fillCount: 0
    });
}

module.exports = {
    Void,

    BasicContainer,

    Context,

    ordinaryAbstraction
};
