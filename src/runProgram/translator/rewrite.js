'use strict';

/**
 * rewrite program statement without running any nenc code
 */

var {
    STATEMENTS, APPLY_ORDINARY_ABSTRACTION, LET_STATEMENT_MIDDLE, IMPORT_STATEMENT_MIDDLE
}= require('../../programDSL/constants');

var {BasicContainer, ordinaryAbstraction}= require('../../programDSL/dataContainer');
let {
    getContentValue
} = require('../../dslBehavior');

let rewriteImportStatement = ([module, variable, nextStatements], ctx) => {
    let abstraction = ordinaryAbstraction([variable],
        BasicContainer(STATEMENTS, [nextStatements]),
        ctx);

    return BasicContainer(APPLY_ORDINARY_ABSTRACTION, [abstraction, [module]]);
};

let rewriteLetStatement = function([letStatement, nextStatements], ctx) {
    let bindings = getContentValue(letStatement, 'bindings');

    let variables = [],
        bodys = [];

    for (let j = 0; j < bindings.length; j = j + 2) {
        variables[j] = bindings[j];
        bodys[j] = bindings[j + 1];
    }

    let abstraction = ordinaryAbstraction(variables,
        BasicContainer(STATEMENTS, [nextStatements]),

        ctx);

    return BasicContainer(APPLY_ORDINARY_ABSTRACTION, [abstraction, bodys]);
};

module.exports = {
    [LET_STATEMENT_MIDDLE]: rewriteLetStatement,
    [IMPORT_STATEMENT_MIDDLE]: rewriteImportStatement
};
