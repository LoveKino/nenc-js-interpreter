'use strict';

let {
    SYS_ORDINARY_ABSTRACTION, SYS_VOID
} = require('../../res/funNameConstants.js');

let {
    concat, push
} = require('../util/hostLangApis');

let dataTypes = require('../../res/idlDataTypes');

let typeParamsIndexMap = require('../../res/typeParamsIndexMap');

let {
    BasicContainer
} = require('../../res/models');

/**************************************************************
 * basic data container
 *
 * {
 *    type: '',
 *    content: {}
 * }
 *
 **************************************************************/
let Void = {
    type: SYS_VOID
};

function ordinaryAbstraction(variables, bodyExp, context) {
    return new BasicContainer(SYS_ORDINARY_ABSTRACTION, [variables, bodyExp, context, {}, {},
        0
    ]);
}

let getPairValueList = function(pair) {
    let result = [];

    let v1 = pair.getV1(),
        v2 = pair.getV2();

    if (v1.className === 'Pair') {
        result = getPairValueList(v1);
    } else {
        result = [v1];
    }

    if (v2.className === 'Pair') {
        result = concat(result, getPairValueList(v2));
    } else {
        result = push(result, v2);
    }

    return result;
};

let isType = (v, type) => {
    return v.equalType(type);
};

let getType = (v) => {
    return v.getType(v);
};

let getContentValues = (v) => {
    return v.getContent();
};

let getContentValue = (v, prop) => {
    let content = v.getContent();
    let index = getParamIndex(v, prop);
    return content[index];
};

let setContentValue = (v, prop, value) => {
    let content = v.getContent();

    let index = getParamIndex(v, prop);
    content[index] = value;
};

let getParamIndex = (v, prop) => {
    let type = v.getType();

    let index = typeParamsIndexMap[type][prop];
    if (index !== undefined) {
        return index;
    }

    throw new Error(`unexpected prop "${prop}" for ${JSON.stringify(dataTypes[type], null, 4)}`);
};

module.exports = {
    Void,
    ordinaryAbstraction,
    getPairValueList,
    isType,
    getType,
    getContentValue,
    setContentValue,
    getContentValues
};
