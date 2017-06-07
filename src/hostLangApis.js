'use strict';

/**************************************************************
 * basic host language interfaces
 **************************************************************/
var concat = function(arr1, arr2) {
    return arr1.concat(arr2);
};

var push = function(arr, v) {
    arr.push(v);
    return arr;
};

var applyMethod = function(method, params) {
    return method.apply(undefined, params);
};

module.exports = {
    concat,
    push,
    applyMethod
};
