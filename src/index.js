'use strict';

/**************************************************************
 * Make the system js as simple as possible and only focus on the grammer. Leave the rest to modules.
 **************************************************************/

/**************************************************************
 * provide basic js functions support for pfc middle code
 **************************************************************/

var programDSL = require('./programDSL/dsl');
var {
    BasicContainer
} = require('./programDSL/dataContainer');
var systemContextMap = require('./systemContextMap');
var {
    importModule, defineModule
} = require('./runProgram');
var {
    SYS_METAMETHOD
} = require('../res/funNameConstants');

module.exports = {
    sys_runProgram: function(name) {
        return importModule(name);
    },

    sys_module: function(name, moduleCode) {
        defineModule(name, moduleCode);
    },

    addMetaMethod: function(name, method) {
        systemContextMap[name] = BasicContainer(SYS_METAMETHOD, {
            method: method
        });
    },

    sys_programDSL: programDSL
};
