'use strict';

var CONSTANTS = require('../programDSL/constants');
var hostLangApis = require('../util/hostLangApis');

var concat = hostLangApis.concat,
    push = hostLangApis.push;

var PAIR = CONSTANTS.PAIR;

var getPairValueList = function(pair) {
    var result = [];
    var content = pair.content;
    var v1 = content[0],
        v2 = content[1];

    if (isType(v1, PAIR)) {
        result = getPairValueList(v1);
    } else {
        result = [v1];
    }

    if (isType(v2, PAIR)) {
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

var dataTypes = require('../programDSL/dataTypes');

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

    throw new Error(`unexpected prop ${prop} for ${v}`);
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

    throw new Error(`unexpected prop ${prop} for ${v}`);
};

module.exports = {
    getPairValueList,
    isType,
    getType,
    getContentValue,
    setContentValue,
    getContentValues
};
