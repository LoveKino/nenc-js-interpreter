// construcor for sys_pair
var sys_pair = function(v1, v2) {
    return new _sys_pair(v1, v2);
};
// private inner class
var _sys_pair = function(v1, v2) {
    this._params = [v1, v2];
};
// get method for attribute v1
_sys_pair.prototype.getV1 = function() {
    return this._params[0];
};

// get method for attribute v2
_sys_pair.prototype.getV2 = function() {
    return this._params[1];
};
// set method for attribute v1
_sys_pair.prototype.setV1 = function(v) {
    this._params[0] = v;
};

// set method for attribute v2
_sys_pair.prototype.setV2 = function(v) {
    this._params[1] = v;
};
// equal method for attribute v1
_sys_pair.prototype.equalV1 = function(v) {
    return this._params[0] === v;
};

// equal method for attribute v2
_sys_pair.prototype.equalV2 = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_pair
_sys_pair.prototype.params = function() {
    return this._params;
};
_sys_pair.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_PAIR = 'sys_pair';
_sys_pair.prototype.className = MODEL_CLASS_NAME_SYS_PAIR;
// construcor for sys_void
var sys_void = function() {
    return new _sys_void();
};
// private inner class
var _sys_void = function() {
    this._params = [];
};
// some meta methods for model sys_void
_sys_void.prototype.params = function() {
    return this._params;
};
_sys_void.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_VOID = 'sys_void';
_sys_void.prototype.className = MODEL_CLASS_NAME_SYS_VOID;
// construcor for sys_data
var sys_data = function(data) {
    return new _sys_data(data);
};
// private inner class
var _sys_data = function(data) {
    this._params = [data];
};
// get method for attribute data
_sys_data.prototype.getData = function() {
    return this._params[0];
};
// set method for attribute data
_sys_data.prototype.setData = function(v) {
    this._params[0] = v;
};
// equal method for attribute data
_sys_data.prototype.equalData = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_data
_sys_data.prototype.params = function() {
    return this._params;
};
_sys_data.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_DATA = 'sys_data';
_sys_data.prototype.className = MODEL_CLASS_NAME_SYS_DATA;
// construcor for sys_number
var sys_number = function(data) {
    return new _sys_number(data);
};
// private inner class
var _sys_number = function(data) {
    this._params = [data];
};
// get method for attribute data
_sys_number.prototype.getData = function() {
    return this._params[0];
};
// set method for attribute data
_sys_number.prototype.setData = function(v) {
    this._params[0] = v;
};
// equal method for attribute data
_sys_number.prototype.equalData = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_number
_sys_number.prototype.params = function() {
    return this._params;
};
_sys_number.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_NUMBER = 'sys_number';
_sys_number.prototype.className = MODEL_CLASS_NAME_SYS_NUMBER;
// construcor for sys_null
var sys_null = function() {
    return new _sys_null();
};
// private inner class
var _sys_null = function() {
    this._params = [];
};
// some meta methods for model sys_null
_sys_null.prototype.params = function() {
    return this._params;
};
_sys_null.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_NULL = 'sys_null';
_sys_null.prototype.className = MODEL_CLASS_NAME_SYS_NULL;
// construcor for sys_true
var sys_true = function() {
    return new _sys_true();
};
// private inner class
var _sys_true = function() {
    this._params = [];
};
// some meta methods for model sys_true
_sys_true.prototype.params = function() {
    return this._params;
};
_sys_true.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_TRUE = 'sys_true';
_sys_true.prototype.className = MODEL_CLASS_NAME_SYS_TRUE;
// construcor for sys_false
var sys_false = function() {
    return new _sys_false();
};
// private inner class
var _sys_false = function() {
    this._params = [];
};
// some meta methods for model sys_false
_sys_false.prototype.params = function() {
    return this._params;
};
_sys_false.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_FALSE = 'sys_false';
_sys_false.prototype.className = MODEL_CLASS_NAME_SYS_FALSE;
// construcor for sys_string
var sys_string = function(data) {
    return new _sys_string(data);
};
// private inner class
var _sys_string = function(data) {
    this._params = [data];
};
// get method for attribute data
_sys_string.prototype.getData = function() {
    return this._params[0];
};
// set method for attribute data
_sys_string.prototype.setData = function(v) {
    this._params[0] = v;
};
// equal method for attribute data
_sys_string.prototype.equalData = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_string
_sys_string.prototype.params = function() {
    return this._params;
};
_sys_string.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_STRING = 'sys_string';
_sys_string.prototype.className = MODEL_CLASS_NAME_SYS_STRING;
// construcor for sys_array
var sys_array = function(list) {
    return new _sys_array(list);
};
// private inner class
var _sys_array = function(list) {
    this._params = [list];
};
// get method for attribute list
_sys_array.prototype.getList = function() {
    return this._params[0];
};
// set method for attribute list
_sys_array.prototype.setList = function(v) {
    this._params[0] = v;
};
// equal method for attribute list
_sys_array.prototype.equalList = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_array
_sys_array.prototype.params = function() {
    return this._params;
};
_sys_array.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_ARRAY = 'sys_array';
_sys_array.prototype.className = MODEL_CLASS_NAME_SYS_ARRAY;
// construcor for sys_object
var sys_object = function(list) {
    return new _sys_object(list);
};
// private inner class
var _sys_object = function(list) {
    this._params = [list];
};
// get method for attribute list
_sys_object.prototype.getList = function() {
    return this._params[0];
};
// set method for attribute list
_sys_object.prototype.setList = function(v) {
    this._params[0] = v;
};
// equal method for attribute list
_sys_object.prototype.equalList = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_object
_sys_object.prototype.params = function() {
    return this._params;
};
_sys_object.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_OBJECT = 'sys_object';
_sys_object.prototype.className = MODEL_CLASS_NAME_SYS_OBJECT;
// construcor for sys_metaMethod
var sys_metaMethod = function(method) {
    return new _sys_metaMethod(method);
};
// private inner class
var _sys_metaMethod = function(method) {
    this._params = [method];
};
// get method for attribute method
_sys_metaMethod.prototype.getMethod = function() {
    return this._params[0];
};
// set method for attribute method
_sys_metaMethod.prototype.setMethod = function(v) {
    this._params[0] = v;
};
// equal method for attribute method
_sys_metaMethod.prototype.equalMethod = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_metaMethod
_sys_metaMethod.prototype.params = function() {
    return this._params;
};
_sys_metaMethod.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_METAMETHOD = 'sys_metaMethod';
_sys_metaMethod.prototype.className = MODEL_CLASS_NAME_SYS_METAMETHOD;
// construcor for sys_application
var sys_application = function(caller, params) {
    return new _sys_application(caller, params);
};
// private inner class
var _sys_application = function(caller, params) {
    this._params = [caller, params];
};
// get method for attribute caller
_sys_application.prototype.getCaller = function() {
    return this._params[0];
};

// get method for attribute params
_sys_application.prototype.getParams = function() {
    return this._params[1];
};
// set method for attribute caller
_sys_application.prototype.setCaller = function(v) {
    this._params[0] = v;
};

// set method for attribute params
_sys_application.prototype.setParams = function(v) {
    this._params[1] = v;
};
// equal method for attribute caller
_sys_application.prototype.equalCaller = function(v) {
    return this._params[0] === v;
};

// equal method for attribute params
_sys_application.prototype.equalParams = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_application
_sys_application.prototype.params = function() {
    return this._params;
};
_sys_application.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_APPLICATION = 'sys_application';
_sys_application.prototype.className = MODEL_CLASS_NAME_SYS_APPLICATION;
// construcor for sys_ordinary_abstraction
var sys_ordinary_abstraction = function(variables, body) {
    return new _sys_ordinary_abstraction(variables, body);
};
// private inner class
var _sys_ordinary_abstraction = function(variables, body) {
    this._params = [variables, body];
};
// get method for attribute variables
_sys_ordinary_abstraction.prototype.getVariables = function() {
    return this._params[0];
};

// get method for attribute body
_sys_ordinary_abstraction.prototype.getBody = function() {
    return this._params[1];
};
// set method for attribute variables
_sys_ordinary_abstraction.prototype.setVariables = function(v) {
    this._params[0] = v;
};

// set method for attribute body
_sys_ordinary_abstraction.prototype.setBody = function(v) {
    this._params[1] = v;
};
// equal method for attribute variables
_sys_ordinary_abstraction.prototype.equalVariables = function(v) {
    return this._params[0] === v;
};

// equal method for attribute body
_sys_ordinary_abstraction.prototype.equalBody = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_ordinary_abstraction
_sys_ordinary_abstraction.prototype.params = function() {
    return this._params;
};
_sys_ordinary_abstraction.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_ORDINARY_ABSTRACTION = 'sys_ordinary_abstraction';
_sys_ordinary_abstraction.prototype.className = MODEL_CLASS_NAME_SYS_ORDINARY_ABSTRACTION;
// construcor for sys_variable
var sys_variable = function(variableName) {
    return new _sys_variable(variableName);
};
// private inner class
var _sys_variable = function(variableName) {
    this._params = [variableName];
};
// get method for attribute variableName
_sys_variable.prototype.getVariableName = function() {
    return this._params[0];
};
// set method for attribute variableName
_sys_variable.prototype.setVariableName = function(v) {
    this._params[0] = v;
};
// equal method for attribute variableName
_sys_variable.prototype.equalVariableName = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_variable
_sys_variable.prototype.params = function() {
    return this._params;
};
_sys_variable.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_VARIABLE = 'sys_variable';
_sys_variable.prototype.className = MODEL_CLASS_NAME_SYS_VARIABLE;
// construcor for sys_exp
var sys_exp = function(expression) {
    return new _sys_exp(expression);
};
// private inner class
var _sys_exp = function(expression) {
    this._params = [expression];
};
// get method for attribute expression
_sys_exp.prototype.getExpression = function() {
    return this._params[0];
};
// set method for attribute expression
_sys_exp.prototype.setExpression = function(v) {
    this._params[0] = v;
};
// equal method for attribute expression
_sys_exp.prototype.equalExpression = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_exp
_sys_exp.prototype.params = function() {
    return this._params;
};
_sys_exp.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_EXP = 'sys_exp';
_sys_exp.prototype.className = MODEL_CLASS_NAME_SYS_EXP;
// construcor for sys_statements
var sys_statements = function(statements) {
    return new _sys_statements(statements);
};
// private inner class
var _sys_statements = function(statements) {
    this._params = [statements];
};
// get method for attribute statements
_sys_statements.prototype.getStatements = function() {
    return this._params[0];
};
// set method for attribute statements
_sys_statements.prototype.setStatements = function(v) {
    this._params[0] = v;
};
// equal method for attribute statements
_sys_statements.prototype.equalStatements = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_statements
_sys_statements.prototype.params = function() {
    return this._params;
};
_sys_statements.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_STATEMENTS = 'sys_statements';
_sys_statements.prototype.className = MODEL_CLASS_NAME_SYS_STATEMENTS;
// construcor for sys_letBinding
var sys_letBinding = function(bindings) {
    return new _sys_letBinding(bindings);
};
// private inner class
var _sys_letBinding = function(bindings) {
    this._params = [bindings];
};
// get method for attribute bindings
_sys_letBinding.prototype.getBindings = function() {
    return this._params[0];
};
// set method for attribute bindings
_sys_letBinding.prototype.setBindings = function(v) {
    this._params[0] = v;
};
// equal method for attribute bindings
_sys_letBinding.prototype.equalBindings = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_letBinding
_sys_letBinding.prototype.params = function() {
    return this._params;
};
_sys_letBinding.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_LETBINDING = 'sys_letBinding';
_sys_letBinding.prototype.className = MODEL_CLASS_NAME_SYS_LETBINDING;
// construcor for sys_import
var sys_import = function(modulePath, variable) {
    return new _sys_import(modulePath, variable);
};
// private inner class
var _sys_import = function(modulePath, variable) {
    this._params = [modulePath, variable];
};
// get method for attribute modulePath
_sys_import.prototype.getModulePath = function() {
    return this._params[0];
};

// get method for attribute variable
_sys_import.prototype.getVariable = function() {
    return this._params[1];
};
// set method for attribute modulePath
_sys_import.prototype.setModulePath = function(v) {
    this._params[0] = v;
};

// set method for attribute variable
_sys_import.prototype.setVariable = function(v) {
    this._params[1] = v;
};
// equal method for attribute modulePath
_sys_import.prototype.equalModulePath = function(v) {
    return this._params[0] === v;
};

// equal method for attribute variable
_sys_import.prototype.equalVariable = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_import
_sys_import.prototype.params = function() {
    return this._params;
};
_sys_import.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_IMPORT = 'sys_import';
_sys_import.prototype.className = MODEL_CLASS_NAME_SYS_IMPORT;
// construcor for sys_condition
var sys_condition = function(conditionExp, option1Exp, option2Exp) {
    return new _sys_condition(conditionExp, option1Exp, option2Exp);
};
// private inner class
var _sys_condition = function(conditionExp, option1Exp, option2Exp) {
    this._params = [conditionExp, option1Exp, option2Exp];
};
// get method for attribute conditionExp
_sys_condition.prototype.getConditionExp = function() {
    return this._params[0];
};

// get method for attribute option1Exp
_sys_condition.prototype.getOption1Exp = function() {
    return this._params[1];
};

// get method for attribute option2Exp
_sys_condition.prototype.getOption2Exp = function() {
    return this._params[2];
};
// set method for attribute conditionExp
_sys_condition.prototype.setConditionExp = function(v) {
    this._params[0] = v;
};

// set method for attribute option1Exp
_sys_condition.prototype.setOption1Exp = function(v) {
    this._params[1] = v;
};

// set method for attribute option2Exp
_sys_condition.prototype.setOption2Exp = function(v) {
    this._params[2] = v;
};
// equal method for attribute conditionExp
_sys_condition.prototype.equalConditionExp = function(v) {
    return this._params[0] === v;
};

// equal method for attribute option1Exp
_sys_condition.prototype.equalOption1Exp = function(v) {
    return this._params[1] === v;
};

// equal method for attribute option2Exp
_sys_condition.prototype.equalOption2Exp = function(v) {
    return this._params[2] === v;
};
// some meta methods for model sys_condition
_sys_condition.prototype.params = function() {
    return this._params;
};
_sys_condition.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_CONDITION = 'sys_condition';
_sys_condition.prototype.className = MODEL_CLASS_NAME_SYS_CONDITION;
// construcor for sys_guardedAbstractionLine
var sys_guardedAbstractionLine = function(ordinaryAbstraction, guards) {
    return new _sys_guardedAbstractionLine(ordinaryAbstraction, guards);
};
// private inner class
var _sys_guardedAbstractionLine = function(ordinaryAbstraction, guards) {
    this._params = [ordinaryAbstraction, guards];
};
// get method for attribute ordinaryAbstraction
_sys_guardedAbstractionLine.prototype.getOrdinaryAbstraction = function() {
    return this._params[0];
};

// get method for attribute guards
_sys_guardedAbstractionLine.prototype.getGuards = function() {
    return this._params[1];
};
// set method for attribute ordinaryAbstraction
_sys_guardedAbstractionLine.prototype.setOrdinaryAbstraction = function(v) {
    this._params[0] = v;
};

// set method for attribute guards
_sys_guardedAbstractionLine.prototype.setGuards = function(v) {
    this._params[1] = v;
};
// equal method for attribute ordinaryAbstraction
_sys_guardedAbstractionLine.prototype.equalOrdinaryAbstraction = function(v) {
    return this._params[0] === v;
};

// equal method for attribute guards
_sys_guardedAbstractionLine.prototype.equalGuards = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_guardedAbstractionLine
_sys_guardedAbstractionLine.prototype.params = function() {
    return this._params;
};
_sys_guardedAbstractionLine.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_GUARDEDABSTRACTIONLINE = 'sys_guardedAbstractionLine';
_sys_guardedAbstractionLine.prototype.className = MODEL_CLASS_NAME_SYS_GUARDEDABSTRACTIONLINE;
// construcor for sys_guardedAbstraction
var sys_guardedAbstraction = function(guardLines, context) {
    return new _sys_guardedAbstraction(guardLines, context);
};
// private inner class
var _sys_guardedAbstraction = function(guardLines, context) {
    this._params = [guardLines, context];
};
// get method for attribute guardLines
_sys_guardedAbstraction.prototype.getGuardLines = function() {
    return this._params[0];
};

// get method for attribute context
_sys_guardedAbstraction.prototype.getContext = function() {
    return this._params[1];
};
// set method for attribute guardLines
_sys_guardedAbstraction.prototype.setGuardLines = function(v) {
    this._params[0] = v;
};

// set method for attribute context
_sys_guardedAbstraction.prototype.setContext = function(v) {
    this._params[1] = v;
};
// equal method for attribute guardLines
_sys_guardedAbstraction.prototype.equalGuardLines = function(v) {
    return this._params[0] === v;
};

// equal method for attribute context
_sys_guardedAbstraction.prototype.equalContext = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_guardedAbstraction
_sys_guardedAbstraction.prototype.params = function() {
    return this._params;
};
_sys_guardedAbstraction.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_GUARDEDABSTRACTION = 'sys_guardedAbstraction';
_sys_guardedAbstraction.prototype.className = MODEL_CLASS_NAME_SYS_GUARDEDABSTRACTION;
// construcor for middle_ordinary_abstraction
var middle_ordinary_abstraction = function(variableList, body, context) {
    return new _middle_ordinary_abstraction(variableList, body, context);
};
// private inner class
var _middle_ordinary_abstraction = function(variableList, body, context) {
    this._params = [variableList, body, context];
};
// get method for attribute variableList
_middle_ordinary_abstraction.prototype.getVariableList = function() {
    return this._params[0];
};

// get method for attribute body
_middle_ordinary_abstraction.prototype.getBody = function() {
    return this._params[1];
};

// get method for attribute context
_middle_ordinary_abstraction.prototype.getContext = function() {
    return this._params[2];
};
// set method for attribute variableList
_middle_ordinary_abstraction.prototype.setVariableList = function(v) {
    this._params[0] = v;
};

// set method for attribute body
_middle_ordinary_abstraction.prototype.setBody = function(v) {
    this._params[1] = v;
};

// set method for attribute context
_middle_ordinary_abstraction.prototype.setContext = function(v) {
    this._params[2] = v;
};
// equal method for attribute variableList
_middle_ordinary_abstraction.prototype.equalVariableList = function(v) {
    return this._params[0] === v;
};

// equal method for attribute body
_middle_ordinary_abstraction.prototype.equalBody = function(v) {
    return this._params[1] === v;
};

// equal method for attribute context
_middle_ordinary_abstraction.prototype.equalContext = function(v) {
    return this._params[2] === v;
};
// some meta methods for model middle_ordinary_abstraction
_middle_ordinary_abstraction.prototype.params = function() {
    return this._params;
};
_middle_ordinary_abstraction.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_ORDINARY_ABSTRACTION = 'middle_ordinary_abstraction';
_middle_ordinary_abstraction.prototype.className = MODEL_CLASS_NAME_MIDDLE_ORDINARY_ABSTRACTION;
// construcor for middle_statements_list
var middle_statements_list = function(statementList) {
    return new _middle_statements_list(statementList);
};
// private inner class
var _middle_statements_list = function(statementList) {
    this._params = [statementList];
};
// get method for attribute statementList
_middle_statements_list.prototype.getStatementList = function() {
    return this._params[0];
};
// set method for attribute statementList
_middle_statements_list.prototype.setStatementList = function(v) {
    this._params[0] = v;
};
// equal method for attribute statementList
_middle_statements_list.prototype.equalStatementList = function(v) {
    return this._params[0] === v;
};
// some meta methods for model middle_statements_list
_middle_statements_list.prototype.params = function() {
    return this._params;
};
_middle_statements_list.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_STATEMENTS_LIST = 'middle_statements_list';
_middle_statements_list.prototype.className = MODEL_CLASS_NAME_MIDDLE_STATEMENTS_LIST;
// construcor for middle_identity
var middle_identity = function(value) {
    return new _middle_identity(value);
};
// private inner class
var _middle_identity = function(value) {
    this._params = [value];
};
// get method for attribute value
_middle_identity.prototype.getValue = function() {
    return this._params[0];
};
// set method for attribute value
_middle_identity.prototype.setValue = function(v) {
    this._params[0] = v;
};
// equal method for attribute value
_middle_identity.prototype.equalValue = function(v) {
    return this._params[0] === v;
};
// some meta methods for model middle_identity
_middle_identity.prototype.params = function() {
    return this._params;
};
_middle_identity.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_IDENTITY = 'middle_identity';
_middle_identity.prototype.className = MODEL_CLASS_NAME_MIDDLE_IDENTITY;
// construcor for middle_importStatement
var middle_importStatement = function(module, variable, nextStatements) {
    return new _middle_importStatement(module, variable, nextStatements);
};
// private inner class
var _middle_importStatement = function(module, variable, nextStatements) {
    this._params = [module, variable, nextStatements];
};
// get method for attribute module
_middle_importStatement.prototype.getModule = function() {
    return this._params[0];
};

// get method for attribute variable
_middle_importStatement.prototype.getVariable = function() {
    return this._params[1];
};

// get method for attribute nextStatements
_middle_importStatement.prototype.getNextStatements = function() {
    return this._params[2];
};
// set method for attribute module
_middle_importStatement.prototype.setModule = function(v) {
    this._params[0] = v;
};

// set method for attribute variable
_middle_importStatement.prototype.setVariable = function(v) {
    this._params[1] = v;
};

// set method for attribute nextStatements
_middle_importStatement.prototype.setNextStatements = function(v) {
    this._params[2] = v;
};
// equal method for attribute module
_middle_importStatement.prototype.equalModule = function(v) {
    return this._params[0] === v;
};

// equal method for attribute variable
_middle_importStatement.prototype.equalVariable = function(v) {
    return this._params[1] === v;
};

// equal method for attribute nextStatements
_middle_importStatement.prototype.equalNextStatements = function(v) {
    return this._params[2] === v;
};
// some meta methods for model middle_importStatement
_middle_importStatement.prototype.params = function() {
    return this._params;
};
_middle_importStatement.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_IMPORTSTATEMENT = 'middle_importStatement';
_middle_importStatement.prototype.className = MODEL_CLASS_NAME_MIDDLE_IMPORTSTATEMENT;
// construcor for middle_letStatement
var middle_letStatement = function(letStatement, nextStatements) {
    return new _middle_letStatement(letStatement, nextStatements);
};
// private inner class
var _middle_letStatement = function(letStatement, nextStatements) {
    this._params = [letStatement, nextStatements];
};
// get method for attribute letStatement
_middle_letStatement.prototype.getLetStatement = function() {
    return this._params[0];
};

// get method for attribute nextStatements
_middle_letStatement.prototype.getNextStatements = function() {
    return this._params[1];
};
// set method for attribute letStatement
_middle_letStatement.prototype.setLetStatement = function(v) {
    this._params[0] = v;
};

// set method for attribute nextStatements
_middle_letStatement.prototype.setNextStatements = function(v) {
    this._params[1] = v;
};
// equal method for attribute letStatement
_middle_letStatement.prototype.equalLetStatement = function(v) {
    return this._params[0] === v;
};

// equal method for attribute nextStatements
_middle_letStatement.prototype.equalNextStatements = function(v) {
    return this._params[1] === v;
};
// some meta methods for model middle_letStatement
_middle_letStatement.prototype.params = function() {
    return this._params;
};
_middle_letStatement.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_LETSTATEMENT = 'middle_letStatement';
_middle_letStatement.prototype.className = MODEL_CLASS_NAME_MIDDLE_LETSTATEMENT;
// construcor for middle_applyGuardedAbstraction
var middle_applyGuardedAbstraction = function() {
    return new _middle_applyGuardedAbstraction();
};
// private inner class
var _middle_applyGuardedAbstraction = function() {
    this._params = [];
};
// some meta methods for model middle_applyGuardedAbstraction
_middle_applyGuardedAbstraction.prototype.params = function() {
    return this._params;
};
_middle_applyGuardedAbstraction.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_APPLYGUARDEDABSTRACTION = 'middle_applyGuardedAbstraction';
_middle_applyGuardedAbstraction.prototype.className = MODEL_CLASS_NAME_MIDDLE_APPLYGUARDEDABSTRACTION;
// construcor for middle_applyOrdinaryAbstraction
var middle_applyOrdinaryAbstraction = function(abstractionMiddle, params) {
    return new _middle_applyOrdinaryAbstraction(abstractionMiddle, params);
};
// private inner class
var _middle_applyOrdinaryAbstraction = function(abstractionMiddle, params) {
    this._params = [abstractionMiddle, params];
};
// get method for attribute abstractionMiddle
_middle_applyOrdinaryAbstraction.prototype.getAbstractionMiddle = function() {
    return this._params[0];
};

// get method for attribute params
_middle_applyOrdinaryAbstraction.prototype.getParams = function() {
    return this._params[1];
};
// set method for attribute abstractionMiddle
_middle_applyOrdinaryAbstraction.prototype.setAbstractionMiddle = function(v) {
    this._params[0] = v;
};

// set method for attribute params
_middle_applyOrdinaryAbstraction.prototype.setParams = function(v) {
    this._params[1] = v;
};
// equal method for attribute abstractionMiddle
_middle_applyOrdinaryAbstraction.prototype.equalAbstractionMiddle = function(v) {
    return this._params[0] === v;
};

// equal method for attribute params
_middle_applyOrdinaryAbstraction.prototype.equalParams = function(v) {
    return this._params[1] === v;
};
// some meta methods for model middle_applyOrdinaryAbstraction
_middle_applyOrdinaryAbstraction.prototype.params = function() {
    return this._params;
};
_middle_applyOrdinaryAbstraction.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_APPLYORDINARYABSTRACTION = 'middle_applyOrdinaryAbstraction';
_middle_applyOrdinaryAbstraction.prototype.className = MODEL_CLASS_NAME_MIDDLE_APPLYORDINARYABSTRACTION;
// construcor for middle_applyMetaMethod
var middle_applyMetaMethod = function(metaMethod, params) {
    return new _middle_applyMetaMethod(metaMethod, params);
};
// private inner class
var _middle_applyMetaMethod = function(metaMethod, params) {
    this._params = [metaMethod, params];
};
// get method for attribute metaMethod
_middle_applyMetaMethod.prototype.getMetaMethod = function() {
    return this._params[0];
};

// get method for attribute params
_middle_applyMetaMethod.prototype.getParams = function() {
    return this._params[1];
};
// set method for attribute metaMethod
_middle_applyMetaMethod.prototype.setMetaMethod = function(v) {
    this._params[0] = v;
};

// set method for attribute params
_middle_applyMetaMethod.prototype.setParams = function(v) {
    this._params[1] = v;
};
// equal method for attribute metaMethod
_middle_applyMetaMethod.prototype.equalMetaMethod = function(v) {
    return this._params[0] === v;
};

// equal method for attribute params
_middle_applyMetaMethod.prototype.equalParams = function(v) {
    return this._params[1] === v;
};
// some meta methods for model middle_applyMetaMethod
_middle_applyMetaMethod.prototype.params = function() {
    return this._params;
};
_middle_applyMetaMethod.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_APPLYMETAMETHOD = 'middle_applyMetaMethod';
_middle_applyMetaMethod.prototype.className = MODEL_CLASS_NAME_MIDDLE_APPLYMETAMETHOD;
// construcor for middle_context
var middle_context = function(variableMap, parent) {
    return new _middle_context(variableMap, parent);
};
// private inner class
var _middle_context = function(variableMap, parent) {
    this._params = [variableMap, parent];
};
// get method for attribute variableMap
_middle_context.prototype.getVariableMap = function() {
    return this._params[0];
};

// get method for attribute parent
_middle_context.prototype.getParent = function() {
    return this._params[1];
};
// set method for attribute variableMap
_middle_context.prototype.setVariableMap = function(v) {
    this._params[0] = v;
};

// set method for attribute parent
_middle_context.prototype.setParent = function(v) {
    this._params[1] = v;
};
// equal method for attribute variableMap
_middle_context.prototype.equalVariableMap = function(v) {
    return this._params[0] === v;
};

// equal method for attribute parent
_middle_context.prototype.equalParent = function(v) {
    return this._params[1] === v;
};
// some meta methods for model middle_context
_middle_context.prototype.params = function() {
    return this._params;
};
_middle_context.prototype.instanceModel = true;
var MODEL_CLASS_NAME_MIDDLE_CONTEXT = 'middle_context';
_middle_context.prototype.className = MODEL_CLASS_NAME_MIDDLE_CONTEXT;

module.exports = {sys_pair, sys_void, sys_data, sys_number, sys_null, sys_true, sys_false, sys_string, sys_array, sys_object, sys_metaMethod, sys_application, sys_ordinary_abstraction, sys_variable, sys_exp, sys_statements, sys_letBinding, sys_import, sys_condition, sys_guardedAbstractionLine, sys_guardedAbstraction, middle_ordinary_abstraction, middle_statements_list, middle_identity, middle_importStatement, middle_letStatement, middle_applyGuardedAbstraction, middle_applyOrdinaryAbstraction, middle_applyMetaMethod, middle_context};