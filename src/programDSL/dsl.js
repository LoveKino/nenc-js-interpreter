'use strict';

/**
 * define DSL, used to contruct program
 */

let {
    VOID, PAIR
} = require('./constants');
let {
    BasicContainer
} = require('./dataContainer');
let {
    isType, getPairValueList
} = require('../dslBehavior');

let getParamList = (v) => {
    var list = [];

    if (!isType(v, VOID)) {
        if (isType(v, PAIR)) {
            list = getPairValueList(v);
        } else {
            list = [v];
        }
    }

    return list;
};

var dataTypes = require('./dataTypes');

let typeDsl = (type) => {
    let typeContents = dataTypes[type].content;

    return (...args) => {
        // assert.equal(args.length, typeContents.length);
        let content = [];
        let argLen = args.length;
        for (let i = 0; i < typeContents.length; i++) {
            let typeContent = typeContents[i];
            if (i >= argLen) {
                content.push(typeContent.def);
            } else {
                let arg = args[i];
                if (typeContent.type === 'collection') {
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
    dslApi['sys_' + type] = typeDsl(type);
}

module.exports = dslApi;
