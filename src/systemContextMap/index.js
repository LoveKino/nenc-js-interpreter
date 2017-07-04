'use strict';

let dataContainer = require('../programDSL/dataContainer');
let {
    SYS_METAMETHOD
} = require('../../res/idlConstants');

var BasicContainer = dataContainer.BasicContainer;

var MetaMethod = function(method) {
    return BasicContainer(SYS_METAMETHOD, {
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
