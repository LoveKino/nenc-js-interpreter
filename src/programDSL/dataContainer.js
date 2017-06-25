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

function ordinaryAbstraction(variables, bodyExp, context) {
    return BasicContainer(ORDINARY_ABSTRACTION, [variables, bodyExp, context || null, {}, {}, 0]);
}

module.exports = {
    Void,

    BasicContainer,

    ordinaryAbstraction
};
