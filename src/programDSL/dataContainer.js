'use strict';

let {
    SYS_ORDINARY_ABSTRACTION, SYS_VOID, SYS_PAIR
} = require('../../res/idlConstants.js');

let {
    concat, push
} = require('../util/hostLangApis');

let dataTypes = require('../../res/idlDataTypes');

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

function BasicContainer(type, content) {
    return {
        type: type,
        content: content
    };
}

function ordinaryAbstraction(variables, bodyExp, context) {
    return BasicContainer(SYS_ORDINARY_ABSTRACTION, [variables, bodyExp, context || null, {}, {},
        0
    ]);
}

var getPairValueList = function(pair) {
    var result = [];
    var content = pair.content;
    var v1 = content[0],
        v2 = content[1];

    if (isType(v1, SYS_PAIR)) {
        result = getPairValueList(v1);
    } else {
        result = [v1];
    }

    if (isType(v2, SYS_PAIR)) {
        result = concat(result, getPairValueList(v2));
    } else {
        result = push(result, v2);
    }

    return result;
};

var isType = function(v, type) {
    return v && typeof v === 'object' && v.type === type;
};

var getType = function(v) {
    return v && typeof v === 'object' && v.type;
};

let getContentValues = (v) => {
    return v.content;
};

let getContentValue = (v, prop) => {
    let type = v.type;
    let content = v.content;
    let typeParams = dataTypes[type].params;

    for (let i = 0; i < typeParams.length; i++) {
        let {
            name
        } = typeParams[i];

        //console.log(prop, name, name === prop)
        if (name === prop) {
            return content[i];
        }
    }

    throw new Error(`unexpected prop "${prop}" for ${JSON.stringify(dataTypes[type], null, 4)}`);
};

let setContentValue = (v, prop, value) => {
    let type = v.type;
    let content = v.content;
    let typeParams = dataTypes[type].params;

    for (let i = 0; i < typeParams.length; i++) {
        let {
            name
        } = typeParams[i];
        if (name === prop) {
            content[i] = value;
            return v;
        }
    }

    throw new Error(`unexpected prop "${prop}" for ${JSON.stringify(dataTypes[type], null, 4)}`);
};

module.exports = {
    Void,
    BasicContainer,
    ordinaryAbstraction,
    getPairValueList,
    isType,
    getType,
    getContentValue,
    setContentValue,
    getContentValues

};
