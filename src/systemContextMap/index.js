'use strict';

var dataContainer = require('../dataContainer');
var CONSTANTS = require('../constants');

var BasicContainer = dataContainer.BasicContainer;
var META_METHOD = CONSTANTS.META_METHOD;

var MetaMethod = function(method) {
    return BasicContainer(META_METHOD, {
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
    })
};
