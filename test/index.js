'use strict';

let {
    sys_runProgram, sys_data, sys_exp
} = require('..');
let assert = require('assert');

describe('index', () => {
    it('base', () => {
        assert.deepEqual(sys_runProgram(sys_exp(sys_data(null))), null);
        assert.deepEqual(sys_runProgram(sys_exp(sys_data(10))), 10);
        assert.deepEqual(sys_runProgram(sys_exp(sys_data(false))), false);
        assert.deepEqual(sys_runProgram(sys_exp(sys_data(true))), true);
        assert.deepEqual(sys_runProgram(sys_exp(sys_data('ok'))), 'ok');
    });
});
