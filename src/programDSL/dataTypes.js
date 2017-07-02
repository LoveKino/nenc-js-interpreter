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
    CONDITION_EXP,
    GUARDED_ABSTRACTION_LINE,
    GUARDED_ABSTRACTION
} = require('./constants');

module.exports = {
    [PAIR]: {
        content: [{
            name: 'v1'
        }, {
            name: 'v2'
        }]
    },
    [VOID]: {
        content: []
    },
    [DATA]: {
        content: [{
            name: 'data'
        }]
    },
    [NUMBER]: {
        content: [{
            name: 'data'
        }]
    },
    [NULL]: {
        content: []
    },
    [TRUE]: {
        content: []
    },
    [FALSE]: {
        content: []
    },
    [STRING]: {
        content: [{
            name: 'data'
        }]
    },
    [ARRAY]: {
        content: [{
            name: 'list',
            type: 'collection'
        }]
    },
    [OBJECT]: {
        content: [{
            name: 'list',
            type: 'collection'
        }]
    },

    [META_METHOD]: {},
    [APPLICATION]: {
        content: [{
            name: 'caller'
        }, {
            name: 'params',
            type: 'collection'
        }]
    },
    [ORDINARY_ABSTRACTION]: {
        content: [{
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
        }]
    },
    [VARIABLE]: {
        content: [{
            name: 'variableName'
        }]
    },
    [EXPRESSION]: {
        content: [{
            name: 'expression'
        }]
    },
    [STATEMENTS]: {
        content: [{
            name: 'statements',
            type: 'collection'
        }]
    },
    [LET_BINDING_STATEMENT]: {
        content: [{
            name: 'bindings',
            type: 'collection'
        }]
    },
    [IMPORT_STATEMENT]: {
        content: [{
            name: 'modulePath'
        }, {
            name: 'variable'
        }]
    },
    [CONDITION_EXP]: {
        content: [{
            name: 'conditionExp'
        }, {
            name: 'option1Exp'
        }, {
            name: 'option2Exp'
        }]
    },
    [GUARDED_ABSTRACTION_LINE]: {
        content: [{
            name: 'ordinaryAbstraction'
        }, {
            name: 'guards',
            type: 'collection'
        }]
    },
    [GUARDED_ABSTRACTION]: {
        content: [{
            name: 'guardLines',
            type: 'collection'
        }, {
            name: 'context',
            def: null
        }]
    }
};
