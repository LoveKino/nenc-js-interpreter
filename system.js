/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/

/**************************************************************
 * basic host language interfaces
 **************************************************************/
var concat = function(arr1, arr2) {
    return arr1.concat(arr2);
};

var push = function(arr, v) {
    arr.push(v);
    return arr;
};

var applyMethod = function(method, params) {
    return method.apply(undefined, params);
};

/**************************************************************
 * basic data container
 *
 * {
 *    type: '',
 *    content: {}
 * }
 *
 **************************************************************/
var PAIR = 'pair',
    VOID = 'void',
    DATA = 'data',
    META_METHOD = 'metaMethod',
    APPLICATION = 'application',
    ABSTRACTION = 'abstraction',
    VARIABLE = 'variable';

var isType = function(v, type) {
    return v.type === type;
};

var Void = {
    type: VOID
};

function Pair(v1, v2) {
    return {
        type: PAIR,
        content: {
            v1, v2
        }
    };
}

function Variable(variableName) {
    return {
        type: VARIABLE,
        content: {
            variableName
        }
    };
}

function Abstraction(variables, bodyExp, context) {
    // TODO check, avoid repeated variable names
    return {
        type: ABSTRACTION,
        content: {
            fillMap: {},
            context: context || null,
            variables,
            bodyExp,
            indexMap: {},
            fillCount: 0
        }
    };
}

function Application(caller, params) {
    return {
        type: APPLICATION,
        content: {
            caller,
            params
        }
    };
}

function MetaMethod(method) {
    return {
        type: META_METHOD,
        content: {
            method
        }
    };
}

function Data(data) {
    return {
        type: DATA,
        content: {
            data
        }
    };
}

function Context(variableMap, parent) {
    this.parent = parent;
    this.variableMap = variableMap;
}

var getPairValueList = function(pair) {
    var result = [];
    if (isType(pair.content.v1, PAIR)) {
        result = getPairValueList(pair.content.v1);
    } else {
        result = [pair.content.v1];
    }

    if (isType(pair.content.v2, PAIR)) {
        result = concat(result, getPairValueList(pair.content.v2));
    } else {
        result = push(result, pair.content.v2);
    }

    return result;
};

/**
 * fill param value at specific position
 */
var fillAbstractionVariable = function(abstraction, index, value) {
    abstraction.content.fillMap[index] = value;
    if (!abstraction.content.indexMap[index]) {
        abstraction.content.indexMap[index] = true;
        abstraction.content.fillCount++;
    }
};

/**
 * when all variables are assigned, this abstraction will become reducible
 */
var isAbstractionReducible = function(abstraction) {
    return abstraction.content.variables.length <= abstraction.content.fillCount;
};

var lookupVariable = function(ctx, variableName) {
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

/****************************************************
 * run program
 *****************************************************/
var runProgram = function(program, ctx) {
    if (isType(program, VARIABLE)) {
        return lookupVariable(ctx, program.content.variableName);
    } else if (isType(program, ABSTRACTION)) {
        program.content.context = ctx;
        return program;
    } else if (isType(program, APPLICATION)) {
        return runApplication(program, ctx);
    } else if (isType(program, DATA)) {
        return program.content.data;
    } else {
        throw new Error('impossible situation');
    }
};

var runApplication = function(application, ctx) {
    var callerRet = runProgram(application.content.caller, ctx);

    // TODO system methods
    if (!isType(callerRet, ABSTRACTION) &&
        !isType(callerRet, META_METHOD)
    ) {
        throw new Error('Expect function to run application, but got ' + callerRet);
    }

    var paramsRet = [];
    var params = application.content.params;
    var len = params.length;
    for (var i = 0; i < len; i++) {
        paramsRet.push(runProgram(params[i], ctx));
    }

    // run abstraction
    if (isType(callerRet, ABSTRACTION)) {
        return runAbstraction(callerRet, paramsRet);
    } else { // meta method
        return runMetaMethod(callerRet, paramsRet);
    }
};

var runMetaMethod = function(metaMethod, paramsRet) {
    // TODO check some restraints
    return applyMethod(metaMethod.content.method, paramsRet);
};

var runAbstraction = function(source, paramsRet) {
    // create a new abstraction
    var abstraction = Abstraction(source.content.variables, source.content.bodyExp, source.content.context);
    // fill with some params
    for (var i = 0; i < paramsRet.length; i++) {
        fillAbstractionVariable(abstraction, i, paramsRet[i]);
    }

    if (isAbstractionReducible(abstraction)) {
        // take out all variables
        var variables = abstraction.content.variables;
        var fillMap = abstraction.content.fillMap;
        var variableMap = {};
        for (var j = 0; j < variables.length; j++) {
            var variableName = variables[j].content.variableName;
            variableMap[variableName] = fillMap[j];
        }
        // attach variables to context
        var newCtx = new Context(variableMap, source.content.context);
        // run body expression with new context
        return runProgram(abstraction.content.bodyExp, newCtx);
    }
    return abstraction;
};

/**************************************************************
 * main interfaces
 **************************************************************/
// TODO system methods
var defaultContextMap = {
    '+': MetaMethod(function(v1, v2) {
        return v1 + v2;
    }),

    '-': MetaMethod(function(v1, v2) {
        return v1 - v2;
    }),

    '*': MetaMethod(function(v1, v2) {
        return v1 * v2;
    }),

    '/': MetaMethod(function(v1, v2) {
        return v1 / v2;
    })
};

var sys_runProgram = function(program) {
    return runProgram(program, new Context(defaultContextMap, null));
};

var sys_application = function(caller, rest) {
    var params = [];
    if (!isType(rest, VOID)) {
        if (isType(rest, PAIR)) {
            params = getPairValueList(rest);
        } else {
            params = [rest];
        }
    }
    return Application(caller, params);
};

var sys_variable = function(varName) {
    return Variable(varName);
};

var sys_abstraction = function(params, body) {
    var variables = [];
    if (!isType(params, VOID)) {
        if (isType(params, VARIABLE)) {
            variables = [params];
        } else {
            variables = getPairValueList(params);
        }
    }
    return Abstraction(variables, body);
};

var sys_void = function() {
    return Void;
};

var sys_pair = function(v1, v2) {
    return Pair(v1, v2);
};

var sys_data = function(v) {
    return Data(v);
};

// composed data types
var sys_object = function(v) {
    if (isType(v, VOID)) return {};
    // get list of values
    // join to map
    var result = {};
    var list = getPairValueList(v);
    var i = 0,
        len = list.length;
    while (i < len) {
        var key = list[i];
        var value = list[i + 1];
        result[key] = value;
        i += 2;
    }

    return result;
};

var sys_array = function(v) {
    if (isType(v, VOID)) return [];
    // get list of values
    // join to list
    return getPairValueList(v);
};

var sys_string = function(v) {
    return v;
};

var result = {
    sys_void,
    sys_pair,

    sys_variable,
    sys_abstraction,
    sys_application,

    sys_data,
    sys_object,
    sys_array,
    sys_string,

    sys_runProgram
};

if (typeof module === 'object' && module) {
    module.exports = result;
}

return result;
