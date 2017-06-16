'use strict';

let {
    sys_runProgram, sys_data, sys_exp, sys_application, sys_variable, sys_pair, sys_statements,
    sys_ordinary_abstraction, sys_letBinding, sys_module, sys_import
} = require('..');
let assert = require('assert');

let runCode = (code) => {
    let moduleName = 'test';
    sys_module(moduleName, code);

    return sys_runProgram(moduleName);
};

describe('index', () => {
    it('base', () => {
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(null)))
        ), null);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(10)))
        ), 10);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(false)))
        ), false);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data(true)))
        ), true);
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_data('ok')))
        ), 'ok');
        assert.deepEqual(runCode(
            sys_statements(sys_exp(sys_application(sys_variable('+'), sys_pair(sys_data(1), sys_data(2)))))
        ), 3);
    });

    it('abstraction', () => {
        assert.equal(runCode(
            sys_statements(sys_exp(sys_application(sys_ordinary_abstraction(sys_variable('a'), sys_statements(sys_exp(sys_application(sys_variable('+'), sys_pair(sys_variable('a'), sys_data(1)))))), sys_data(1))))
        ), 2);

        assert.equal(runCode(
            sys_statements(sys_exp(sys_application(sys_ordinary_abstraction(sys_variable('a'), sys_application(sys_variable('+'), sys_pair(sys_variable('a'), sys_data(1)))), sys_data(1))))
        ), 2);
    });

    it('let binding', () => {
        assert.equal(runCode(
            sys_statements(sys_pair(sys_letBinding(sys_pair(sys_variable('x'), sys_data(1))), sys_exp(sys_application(sys_variable('+'), sys_pair(sys_variable('x'), sys_data(1))))))
        ), 2);
    });

    it('import', () => {
        sys_module('test1', sys_statements(sys_exp(sys_data(false))));
        sys_module('test2',
            sys_statements(sys_pair(sys_import('test1', sys_variable('A')), sys_exp(sys_variable('A'))))
        );
        let ret = sys_runProgram('test2');

        assert.equal(ret, false);
    });
});
