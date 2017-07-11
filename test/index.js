'use strict';

let {
    sys_runProgram, sys_module, sys_programDSL
} = require('..');

let {
    sys_data, sys_exp, sys_application, sys_variable, sys_pair, sys_statements,
    sys_ordinary_abstraction, sys_letBinding, sys_import,

    sys_void,

    sys_null, sys_number, sys_false, sys_true, sys_string
} = sys_programDSL;

let assert = require('assert');

let runCode = (code) => {
    let moduleName = 'test';
    sys_module(moduleName, code);

    return sys_runProgram(moduleName);
};

describe('index', () => {
    it('base', () => {
        assert.deepEqual(runCode(
            sys_statements(sys_void())
        ), null);

        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(sys_null())))
        ), null);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(sys_number('10'))))
        ), 10);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(sys_false())))
        ), false);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(sys_true())))
        ), true);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(sys_string('ok'))))
        ), 'ok');
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_application(sys_variable('+'), sys_pair(sys_data(sys_number('1')), sys_data(sys_number(2))))))
        ), 3);
    });

    it('abstraction', () => {
        assert.equal(runCode(
            sys_statements(sys_exp(sys_application(sys_ordinary_abstraction(sys_variable('a'), sys_statements(sys_exp(sys_application(sys_variable('+'), sys_pair(sys_variable('a'), sys_data(sys_number('1'))))))), sys_data(sys_number('1')))))
        ), 2);

        assert.equal(runCode(
            sys_statements(sys_exp(sys_application(sys_ordinary_abstraction(sys_variable('a'), sys_application(sys_variable('+'), sys_pair(sys_variable('a'), sys_data(sys_number('1'))))), sys_data(sys_number('1')))))
        ), 2);
    });

    it('let binding', () => {
        assert.equal(runCode(
            sys_statements(sys_pair(sys_letBinding(sys_pair(sys_variable('x'), sys_data(sys_number('1')))), sys_exp(sys_application(sys_variable('+'), sys_pair(sys_variable('x'), sys_data(sys_number('1')))))))
        ), 2);
    });

    it('import', () => {
        sys_module('test1', sys_statements(sys_exp(sys_data(sys_false()))));
        sys_module('test2',
            sys_statements(sys_pair(sys_import('test1', sys_variable('A')), sys_exp(sys_variable('A'))))
        );
        let ret = sys_runProgram('test2');

        assert.equal(ret, false);
    });
});
