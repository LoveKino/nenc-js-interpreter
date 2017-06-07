'use strict';

var dataContainer = require('../dataContainer');

let MetaMethod = dataContainer.MetaMethod;

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
