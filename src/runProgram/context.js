'use strict';

function Context(variableMap, parent) {
    this.parent = parent;
    this.variableMap = variableMap;
}

/**
 * look up variable from context chain
 */
let lookupVariable = function(ctx, variableName) {
    var variableMap = ctx.variableMap;
    // lookup variable map
    var value = variableMap[variableName];
    if (value !== undefined) {
        return value;
    } else {
        if (!ctx.parent) {
            throw new Error('Missing definition for variable ' + variableName);
        } else {
            return lookupVariable(ctx.parent, variableName);
        }
    }
};

module.exports = {
    Context,
    lookupVariable
};
