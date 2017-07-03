'use strict';

let {
    PAIR,
    VOID,
    DATA,
    NUMBER,
    NULL,
    TRUE,
    FALSE,
    STRING,
    ARRAY,
    OBJECT,

    META_METHOD,
    APPLICATION,
    ORDINARY_ABSTRACTION,
    VARIABLE,
    EXPRESSION,
    STATEMENTS,
    LET_BINDING_STATEMENT,
    IMPORT_STATEMENT,
    IMPORT_STATEMENT_MIDDLE,
    CONDITION_EXP,
    GUARDED_ABSTRACTION_LINE,
    GUARDED_ABSTRACTION,

    LET_STATEMENT_MIDDLE,
    APPLY_GUARDED_ABSTRACTION,
    APPLY_ORDINARY_ABSTRACTION,
    APPLY_META_METHOD
} = require('./constants');

module.exports = {
    [PAIR]: {
        params: [{
            name: 'v1'
        }, {
            name: 'v2'
        }]
    },
    [VOID]: {
        params: [],
        parser: {
            type: 'atom',
            value: null
        }
    },

    [DATA]: {
        params: [{
            name: 'data'
        }],

        parser: {
            type: 'bypass'
        }
    },
    [NUMBER]: {
        params: [{
            name: 'data'
        }],

        parser: {
            type: 'atomFun'
        }
    },
    [NULL]: {
        params: [],
        parser: {
            type: 'atom',
            value: null
        }
    },
    [TRUE]: {
        params: [],
        parser: {
            type: 'atom',
            value: true
        }
    },
    [FALSE]: {
        params: [],
        parser: {
            type: 'atom',
            value: false
        }
    },
    [STRING]: {
        params: [{
            name: 'data'
        }],
        parser: {
            type: 'atomFun'
        }
    },
    [ARRAY]: {
        params: [{
            name: 'list',
            type: 'collection'
        }]
    },
    [OBJECT]: {
        params: [{
            name: 'list',
            type: 'collection'
        }]
    },

    [META_METHOD]: {},
    [APPLICATION]: {
        params: [{
            name: 'caller'
        }, {
            name: 'params',
            type: 'collection'
        }],

        parser: {
            type: 'transform'
        }
    },
    [ORDINARY_ABSTRACTION]: {
        params: [{
            name: 'variables',
            type: 'collection'
        }, {
            name: 'body'
        }, {
            name: 'context',
            def: null
        }, {
            name: 'indexMap',
            def: {}
        }, {
            name: 'fillMap',
            def: {}
        }, {
            name: 'fillCount',
            def: 0
        }],

        parser: {
            type: 'bind_context'
        }
    },
    [VARIABLE]: {
        params: [{
            name: 'variableName'
        }]
    },
    [EXPRESSION]: {
        params: [{
            name: 'expression'
        }],
        parser: {
            type: 'bypass'
        }
    },
    [STATEMENTS]: {
        params: [{
            name: 'statements',
            type: 'collection'
        }]
    },
    [LET_BINDING_STATEMENT]: {
        params: [{
            name: 'bindings',
            type: 'collection'
        }]
    },
    [IMPORT_STATEMENT]: {
        params: [{
            name: 'modulePath'
        }, {
            name: 'variable'
        }]
    },
    [CONDITION_EXP]: {
        params: [{
            name: 'conditionExp'
        }, {
            name: 'option1Exp'
        }, {
            name: 'option2Exp'
        }],

        parser: {
            type: 'transform'
        }
    },
    [GUARDED_ABSTRACTION_LINE]: {
        params: [{
            name: 'ordinaryAbstraction'
        }, {
            name: 'guards',
            type: 'collection'
        }]
    },
    [GUARDED_ABSTRACTION]: {
        params: [{
            name: 'guardLines',
            type: 'collection'
        }, {
            name: 'context',
            def: null
        }],
        parser: {
            type: 'bind_context'
        }
    },

    // middle
    [IMPORT_STATEMENT_MIDDLE]: {
        parser: {
            type: 'rewrite'
        }
    },

    [LET_STATEMENT_MIDDLE]: {
        parser: {
            type: 'rewrite'
        }
    },

    [APPLY_GUARDED_ABSTRACTION]: {},

    [APPLY_ORDINARY_ABSTRACTION]: {},

    [APPLY_META_METHOD]: {}
};
