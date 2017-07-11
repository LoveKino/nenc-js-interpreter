'use strict';

/**
 * define DSL, used to contruct program
 */

let {
    SYS_VOID
} = require('../../res/funNameConstants');
let {
    isType, getPairValueList
} = require('./dataContainer');
let {
    BasicContainer, sys_pair, sys_void, sys_data,
    sys_number, sys_null, sys_true, sys_false,
    sys_string, sys_array, sys_object
} = require('../../res/models');
let dataTypes = require('../../res/idlDataTypes');

let getParamList = (v) => {
    if (v.className === 'sys_pair') {
        return getPairValueList(v);
    } else if (v.className !== 'sys_void') {
        return [v];
    } else {
        return [];
    }
};

let typeDsl = (type) => {
    let typeParams = dataTypes[type].params;
    let paramsLen = typeParams.length;

    return (...args) => {
        // assert.equal(args.length, typeParams.length);
        let content = [];
        let argLen = args.length;
        for (let i = 0; i < paramsLen; i++) {
            let typeParam = typeParams[i];
            if (i >= argLen) {
                // TODO
                content.push(typeParam.def);
            } else {
                let arg = args[i];
                if (typeParam.type === 'Pairs') {
                    content.push(getParamList(arg));
                } else {
                    content.push(arg);
                }
            }
        }
        return new BasicContainer(type, content);
    };
};

module.exports = require('../../res/models');
