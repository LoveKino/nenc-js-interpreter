'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/

var programDSL = require('./programDSL/dsl');
var dataContainer = require('./programDSL/dataContainer');
var systemContextMap = require('./systemContextMap');
var runProgram = require('./runProgram');
var CONSTANTS = require('./programDSL/constants');

var importModule = runProgram.importModule;
var defineModule = runProgram.defineModule;

var BasicContainer = dataContainer.BasicContainer;

var META_METHOD = CONSTANTS.META_METHOD;

module.exports = {
    sys_runProgram: function(name) {
        return importModule(name);
    },

    sys_module: function(name, moduleCode) {
        defineModule(name, moduleCode);
    },

    addMetaMethod: function(name, method) {
        systemContextMap[name] = BasicContainer(META_METHOD, {
            method: method
        });
    },

    sys_programDSL: programDSL
};
