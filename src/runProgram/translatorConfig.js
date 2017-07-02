'use strict';

let {
    DATA, VOID, META_METHOD, APPLICATION, ORDINARY_ABSTRACTION, VARIABLE, STATEMENTS, EXPRESSION, GUARDED_ABSTRACTION, LET_BINDING_STATEMENT, CONDITION_EXP, IMPORT_STATEMENT, LET_STATEMENT_MIDDLE,
    NULL, ARRAY, OBJECT, NUMBER, STRING, TRUE, FALSE,

    IMPORT_STATEMENT_MIDDLE, APPLY_GUARDED_ABSTRACTION, APPLY_ORDINARY_ABSTRACTION, APPLY_META_METHOD
} = require('../programDSL/constants');

/**
 *
 * [PROGRAM_TYPE]: {
 * }
 */
module.exports = {
    [STATEMENTS]: {},
    [VOID]: {
        type: 'atom',
        value: null
    },
    [EXPRESSION]: {
        type: 'bypass'
    },

    //
    [VARIABLE]: {},

    [GUARDED_ABSTRACTION]: {
        type: 'bind_context'
    },

    [ORDINARY_ABSTRACTION]: {
        type: 'bind_context'
    },

    [META_METHOD]: {},

    [APPLICATION]: {
        type: 'transform'
    },

    [LET_BINDING_STATEMENT]: {},

    [CONDITION_EXP]: {
        type: 'transform'
    },

    [IMPORT_STATEMENT]: {
    },

    [DATA]: {
        type: 'bypass'
    },

    [NULL]: {
        type: 'atom',
        value: null
    },

    [ARRAY]: {},

    [OBJECT]: {},

    [NUMBER]: {},

    [STRING]: {},

    [TRUE]: {
        type: 'atom',
        value: true
    },

    [FALSE]: {
        type: 'atom',
        value: false
    },

    [IMPORT_STATEMENT_MIDDLE]: {
        type: 'rewrite'
    },

    [LET_STATEMENT_MIDDLE]: {
        type: 'rewrite'
    },

    [APPLY_GUARDED_ABSTRACTION]: {},

    [APPLY_ORDINARY_ABSTRACTION]: {},

    [APPLY_META_METHOD]: {
    }
};
