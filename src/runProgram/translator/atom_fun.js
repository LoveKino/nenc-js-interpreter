'use strict';

let {
    SYS_NUMBER, SYS_STRING
} = require('../../../res/funNameConstants');

let runString = ([data]) => {
    return data;
};

let runNumber = ([number]) => {
    return Number(number);
};

module.exports = {
    [SYS_NUMBER]: runNumber,
    [SYS_STRING]: runString
};
