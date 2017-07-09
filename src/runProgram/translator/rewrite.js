'use strict';

/**
 * rewrite program statement without running any nenc code
 */

let {
    SYS_STATEMENTS, SYS_APPLY_ORDINARY_ABSTRACTION, SYS_LET_STATEMENT_MIDDLE, SYS_IMPORT_STATEMENT_MIDDLE
} = require('../../../res/funNameConstants');

let {
    ordinaryAbstraction,
    getContentValue
} = require('../../programDSL/dataContainer');

let {
    BasicContainer
} = require('../../../res/models');

let rewriteImportStatement = ([module, variable, nextStatements], ctx) => {
    let abstraction = ordinaryAbstraction([variable],
        new BasicContainer(SYS_STATEMENTS, [nextStatements]),
        ctx);

    return new BasicContainer(SYS_APPLY_ORDINARY_ABSTRACTION, [abstraction, [module]]);
};

let rewriteLetStatement = ([letStatement, nextStatements], ctx) => {
    let bindings = getContentValue(letStatement, 'bindings');

    let variables = [],
        bodys = [];

    for (let j = 0; j < bindings.length; j = j + 2) {
        variables[j] = bindings[j];
        bodys[j] = bindings[j + 1];
    }

    let abstraction = ordinaryAbstraction(variables,
        new BasicContainer(SYS_STATEMENTS, [nextStatements]),

        ctx);

    return new BasicContainer(SYS_APPLY_ORDINARY_ABSTRACTION, [abstraction, bodys]);
};

module.exports = {
    [SYS_LET_STATEMENT_MIDDLE]: rewriteLetStatement,
    [SYS_IMPORT_STATEMENT_MIDDLE]: rewriteImportStatement
};
