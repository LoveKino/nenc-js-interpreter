'use strict';

let {
    NUMBER, STRING
} = require('../../programDSL/constants');

let runString = ([data]) => {
    return data;
};

let runNumber = ([number]) => {
    return Number(number);
};

module.exports = {
    [NUMBER]: runNumber,
    [STRING]: runString
};
