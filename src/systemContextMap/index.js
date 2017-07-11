'use strict';

let {
    sys_metaMethod
} = require('../../res/models');

// TODO system methods
module.exports = {
    '+': sys_metaMethod(function(v1, v2) {
        return v1 + v2;
    }),

    '-': sys_metaMethod(function(v1, v2) {
        return v1 - v2;
    }),

    '*': sys_metaMethod(function(v1, v2) {
        return v1 * v2;
    }),

    '/': sys_metaMethod(function(v1, v2) {
        return v1 / v2;
    }),

    '>': sys_metaMethod(function(v1, v2) {
        return v1 > v2;
    }),

    '<': sys_metaMethod(function(v1, v2) {
        return v1 < v2;
    })
};
