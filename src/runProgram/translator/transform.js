'use strict';

/**
 * transform code at runtime
 */

let {
    META_METHOD, APPLICATION, ORDINARY_ABSTRACTION, GUARDED_ABSTRACTION, CONDITION_EXP,

    APPLY_GUARDED_ABSTRACTION, APPLY_ORDINARY_ABSTRACTION, APPLY_META_METHOD
} = require('../../programDSL/constants');

let {
    BasicContainer
} = require('../../programDSL/dataContainer');
let {
    getType
} = require('../../dslBehavior');

let {
    isCallerType
} = require('../abstraction');

let transformConditionExp = function([conditionExp, option1Exp, option2Exp], ctx, runProgram) {
    // run condition
    let conditionResult = runProgram(conditionExp, ctx);

    if (conditionResult) {
        return option1Exp;
    } else {
        return option2Exp;
    }
};

let transformApplication = function([caller, params], ctx, runProgram) {
    let callerRet = runProgram(caller, ctx);

    if (!isCallerType(callerRet)) {
        throw new Error('Expect function to run application, but got ' + callerRet);
    }

    // run abstraction
    switch (getType(callerRet)) {
    case GUARDED_ABSTRACTION:
        return BasicContainer(APPLY_GUARDED_ABSTRACTION, [callerRet, params]);
    case ORDINARY_ABSTRACTION:
        return BasicContainer(APPLY_ORDINARY_ABSTRACTION, [callerRet, params]);
    case META_METHOD:
        return BasicContainer(APPLY_META_METHOD, [callerRet, params]);
    }
};

module.exports = {
    [CONDITION_EXP]: transformConditionExp,
    [APPLICATION]: transformApplication
};
