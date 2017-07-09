'use strict';

let {
    SYS_METAMETHOD
} = require('../../res/funNameConstants');

let {
    BasicContainer
} = require('../../res/models');

var MetaMethod = function(method) {
    return new BasicContainer(SYS_METAMETHOD, {
        method: method
    });
};

// TODO system methods
module.exports = {
    '+': MetaMethod(function(v1, v2) {
        return v1 + v2;
    }),

    '-': MetaMethod(function(v1, v2) {
        return v1 - v2;
    }),

    '*': MetaMethod(function(v1, v2) {
        return v1 * v2;
    }),

    '/': MetaMethod(function(v1, v2) {
        return v1 / v2;
    }),

    '>': MetaMethod(function(v1, v2) {
        return v1 > v2;
    }),

    '<': MetaMethod(function(v1, v2) {
        return v1 < v2;
    })
};
