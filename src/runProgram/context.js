'use strict';

let {
    Context
} = require('../../res/models');

/**
 * look up variable from context chain
 */
let lookupVariable = function(ctx, variableName) {
    var variableMap = ctx.getVariableMap();
    // lookup variable map
    var value = variableMap[variableName];
    if (value !== undefined) {
        return value;
    } else {
        let parent = ctx.getParent();
        if (!parent) {
            throw new Error('Missing definition for variable ' + variableName);
        } else {
            return lookupVariable(parent, variableName);
        }
    }
};

module.exports = {
    Context,
    lookupVariable
};
