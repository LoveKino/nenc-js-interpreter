'use strict';

/**
 * define DSL, used to contruct program
 */

let {
    VOID, PAIR
} = require('./constants');
let {
    BasicContainer,
    isType, getPairValueList
} = require('./dataContainer');
let dataTypes = require('./dataTypes');

let getParamList = (v) => {
    let list = [];

    if (!isType(v, VOID)) {
        if (isType(v, PAIR)) {
            list = getPairValueList(v);
        } else {
            list = [v];
        }
    }

    return list;
};

let typeDsl = (type) => {
    let typeParams = dataTypes[type].params;

    return (...args) => {
        // assert.equal(args.length, typeParams.length);
        let content = [];
        let argLen = args.length;
        for (let i = 0; i < typeParams.length; i++) {
            let typeParam = typeParams[i];
            if (i >= argLen) {
                content.push(typeParam.def);
            } else {
                let arg = args[i];
                if (typeParam.type === 'collection') {
                    content.push(getParamList(arg));
                } else {
                    content.push(arg);
                }
            }
        }
        return BasicContainer(type, content);
    };
};

let dslApi = {};
for (let type in dataTypes) {
    dslApi[type] = typeDsl(type);
}

module.exports = dslApi;
