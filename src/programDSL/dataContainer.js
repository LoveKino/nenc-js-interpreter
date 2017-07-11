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

let {
    getAllLeafs, isModel
} = require('pfc-idl-model-translator/library/js')

/**************************************************************
 * basic data container
 *
 * {
 *    type: '',
 *    content: {}
 * }
 *
 **************************************************************/

function ordinaryAbstraction(variables, bodyExp, context) {
    return new BasicContainer(SYS_ORDINARY_ABSTRACTION, [variables, bodyExp, context, {}, {},
        0
    ]);
}

let getPairValueList = function(pair) {
    return getAllLeafs(pair, {
        branchClasses: ['Pair']
    });
};

let isType = (v, type) => {
    return v.equalType(type);
};

let getType = (v) => {
    if (v.className === 'BasicContainer') {
        return v.getType();
    }

    return v.className;
};

let getContentValues = (v) => {
    if (v.getContent) return v.getContent();
    return v.params();
};

module.exports = {
    ordinaryAbstraction,
    getPairValueList,
    isType,
    getType,
    getContentValues
};
