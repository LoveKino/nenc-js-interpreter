'use strict';

/**
 * define DSL, used to contruct program
 */

let {
    PAIR, VOID, DATA, EXPRESSION, APPLICATION, STATEMENTS, LET_BINDING_STATEMENT, IMPORT_STATEMENT, CONDITION_EXP, GUARDED_ABSTRACTION, GUARDED_ABSTRACTION_LINE, VARIABLE, STRING, NULL, TRUE, FALSE, NUMBER, ARRAY, OBJECT, ORDINARY_ABSTRACTION
} = require('./constants');
let {
    ordinaryAbstraction, Void, BasicContainer
} = require('./dataContainer');
let {
    isType, getPairValueList
} = require('../dslBehavior');

let getParamList = (v) => {
    var list = [];

    if (!isType(v, VOID)) {
        if (isType(v, PAIR)) {
            list = getPairValueList(v);
        } else {
            list = [v];
        }
    }

    return list;
};

var dataTypes = require('./dataTypes');

let typeDsl = (type) => {
    let typeContents = dataTypes[type].content;
    return (...args) => {
        // assert.equal(args.length, typeContents.length);
        let content = [];
        let argLen = args.length;
        for (let i = 0; i < typeContents.length; i++) {
            let typeContent = typeContents[i];
            if (i >= argLen) {
                content.push(typeContent.def)
            } else {
                let arg = args[i];
                if (typeContent.type === 'collection') {
                    content.push(getParamList(arg));
                } else {
                    content.push(arg);
                }
            }
        }
        return BasicContainer(type, content)
    };
};

module.exports = {
    sys_void: typeDsl(VOID),

    sys_pair: typeDsl(PAIR),

    sys_variable: typeDsl(VARIABLE),

    sys_data: typeDsl(DATA),

    sys_string: typeDsl(STRING),

    sys_null: typeDsl(NULL),

    sys_number: typeDsl(NUMBER),

    sys_true: typeDsl(TRUE),

    sys_false: typeDsl(FALSE),

    sys_object: typeDsl(OBJECT),

    sys_array: typeDsl(ARRAY),

    sys_application: typeDsl(APPLICATION),

    sys_exp: typeDsl(EXPRESSION),

    sys_letBinding: typeDsl(LET_BINDING_STATEMENT),

    sys_statements: typeDsl(STATEMENTS),

    sys_import: typeDsl(IMPORT_STATEMENT),

    sys_condition: typeDsl(CONDITION_EXP),

    sys_guarded_abstraction: function(v) {
        return BasicContainer(GUARDED_ABSTRACTION, {
            guardLines: getParamList(v)
        });
    },

    sys_guarded_abstraction_line: function(ordinaryAbstraction, expList) {
        return BasicContainer(GUARDED_ABSTRACTION_LINE, {
            ordinaryAbstraction,
            guards: getParamList(expList)
        });
    },

    sys_ordinary_abstraction: typeDsl(ORDINARY_ABSTRACTION)
};
