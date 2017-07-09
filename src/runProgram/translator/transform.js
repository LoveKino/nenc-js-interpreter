'use strict';

/**
 * transform code at runtime
 */

let {
    SYS_METAMETHOD, SYS_APPLICATION, SYS_ORDINARY_ABSTRACTION, SYS_GUARDED_ABSTRACTION, SYS_CONDITION_EXP,

    SYS_APPLY_GUARDED_ABSTRACTION, SYS_APPLY_ORDINARY_ABSTRACTION, SYS_APPLY_META_METHOD
} = require('../../../res/funNameConstants');

let {
    getType
} = require('../../programDSL/dataContainer');

let {
    BasicContainer
} = require('../../../res/models');

let {
    isCallerType
} = require('../abstraction');

let transformConditionExp = ([conditionExp, option1Exp, option2Exp], ctx, runProgram) => {
    // run condition
    let conditionResult = runProgram(conditionExp, ctx);

    if (conditionResult) {
        return option1Exp;
    } else {
        return option2Exp;
    }
};

/**
 * 1. resolve caller first
 * 2. apply caller
 */
let transformApplication = ([caller, params], ctx, runProgram) => {
    let callerRet = runProgram(caller, ctx);

    if (!isCallerType(callerRet)) {
        throw new Error('Expect function to run application, but got ' + callerRet);
    }

    // run abstraction
    switch (getType(callerRet)) {
    case SYS_GUARDED_ABSTRACTION:
        return new BasicContainer(SYS_APPLY_GUARDED_ABSTRACTION, [callerRet, params]);
    case SYS_ORDINARY_ABSTRACTION:
        return new BasicContainer(SYS_APPLY_ORDINARY_ABSTRACTION, [callerRet, params]);
    case SYS_METAMETHOD:
        return new BasicContainer(SYS_APPLY_META_METHOD, [callerRet, params]);
    }
};

module.exports = {
    [SYS_CONDITION_EXP]: transformConditionExp,
    [SYS_APPLICATION]: transformApplication
};
