'use strict';

let {
    sys_runProgram, sys_data, sys_exp, sys_application, sys_variable, sys_pair, sys_statements,
    sys_abstraction, sys_letBinding
} = require('..');
let assert = require('assert');

describe('index', () => {
    it('base', () => {
        assert.deepEqual(sys_runProgram(
            sys_statements(sys_exp(sys_data(null)))
        ), null);
        assert.deepEqual(sys_runProgram(
            sys_statements(sys_exp(sys_data(10)))
        ), 10);
        assert.deepEqual(sys_runProgram(
            sys_statements(sys_exp(sys_data(false)))
        ), false);
        assert.deepEqual(sys_runProgram(
            sys_statements(sys_exp(sys_data(true)))
        ), true);
        assert.deepEqual(sys_runProgram(
            sys_statements(sys_exp(sys_data('ok')))
        ), 'ok');
        assert.deepEqual(sys_runProgram(
            sys_statements(sys_exp(sys_application(sys_variable('+'), sys_pair(sys_data(1), sys_data(2)))))
        ), 3);
    });

    it('abstraction', () => {
        assert.equal(sys_runProgram(
            sys_statements(sys_exp(sys_application(sys_abstraction(sys_variable('a'), sys_statements(sys_exp(sys_application(sys_variable('+'), sys_pair(sys_variable('a'), sys_data(1)))))), sys_data(1))))
        ), 2);

        assert.equal(sys_runProgram(
            sys_statements(sys_exp(sys_application(sys_abstraction(sys_variable('a'), sys_application(sys_variable('+'), sys_pair(sys_variable('a'), sys_data(1)))), sys_data(1))))
        ), 2);
    });

    it('let binding', () => {
        assert.equal(sys_runProgram(
            sys_statements(sys_pair(sys_letBinding(sys_pair(sys_variable('x'), sys_data(1))), sys_exp(sys_application(sys_variable('+'), sys_pair(sys_variable('x'), sys_data(1))))))
        ), 2);
    });
});
