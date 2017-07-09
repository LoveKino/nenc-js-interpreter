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
    BasicContainer, Pair
} = require('../../res/models');
let dataTypes = require('../../res/idlDataTypes');

let getParamList = (v) => {
    if (v.className === 'Pair') {
        return getPairValueList(v);
    } else if (!isType(v, SYS_VOID)) {
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

let dslApi = {};
for (let type in dataTypes) {
    dslApi[type] = typeDsl(type);
}

dslApi.sys_pair = (v1, v2) => new Pair(v1, v2);

module.exports = dslApi;
