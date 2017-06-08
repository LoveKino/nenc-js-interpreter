'use strict';

/**************************************************************
 * basic host language interfaces
 **************************************************************/

module.exports = {
    concat: function(arr1, arr2) {
        return arr1.concat(arr2);
    },
    push: function(arr, v) {
        arr.push(v);
        return arr;
    },
    applyMethod: function(method, params) {
        return method.apply(undefined, params);
    }
};
