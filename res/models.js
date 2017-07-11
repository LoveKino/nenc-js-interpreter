// construcor for BasicContainer
var BasicContainer = function(type, content) {
    return new _BasicContainer(type, content);
};
// private inner class
var _BasicContainer = function(type, content) {
    this._params = [type, content];
};
// get method for attribute type
_BasicContainer.prototype.getType = function() {
    return this._params[0];
};

// get method for attribute content
_BasicContainer.prototype.getContent = function() {
    return this._params[1];
};
// set method for attribute type
_BasicContainer.prototype.setType = function(v) {
    this._params[0] = v;
};

// set method for attribute content
_BasicContainer.prototype.setContent = function(v) {
    this._params[1] = v;
};
// equal method for attribute type
_BasicContainer.prototype.equalType = function(v) {
    return this._params[0] === v;
};

// equal method for attribute content
_BasicContainer.prototype.equalContent = function(v) {
    return this._params[1] === v;
};
// some meta methods for model BasicContainer
_BasicContainer.prototype.params = function() {
    return this._params;
};
_BasicContainer.prototype.instanceModel = true;
var MODEL_CLASS_NAME_BASICCONTAINER = 'BasicContainer';
_BasicContainer.prototype.className = MODEL_CLASS_NAME_BASICCONTAINER;
// construcor for Context
var Context = function(variableMap, parent) {
    return new _Context(variableMap, parent);
};
// private inner class
var _Context = function(variableMap, parent) {
    this._params = [variableMap, parent];
};
// get method for attribute variableMap
_Context.prototype.getVariableMap = function() {
    return this._params[0];
};

// get method for attribute parent
_Context.prototype.getParent = function() {
    return this._params[1];
};
// set method for attribute variableMap
_Context.prototype.setVariableMap = function(v) {
    this._params[0] = v;
};

// set method for attribute parent
_Context.prototype.setParent = function(v) {
    this._params[1] = v;
};
// equal method for attribute variableMap
_Context.prototype.equalVariableMap = function(v) {
    return this._params[0] === v;
};

// equal method for attribute parent
_Context.prototype.equalParent = function(v) {
    return this._params[1] === v;
};
// some meta methods for model Context
_Context.prototype.params = function() {
    return this._params;
};
_Context.prototype.instanceModel = true;
var MODEL_CLASS_NAME_CONTEXT = 'Context';
_Context.prototype.className = MODEL_CLASS_NAME_CONTEXT;
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
// construcor for sys_ordinary_abstraction_middle
var sys_ordinary_abstraction_middle = function(variableList, body, context) {
    return new _sys_ordinary_abstraction_middle(variableList, body, context);
};
// private inner class
var _sys_ordinary_abstraction_middle = function(variableList, body, context) {
    this._params = [variableList, body, context];
};
// get method for attribute variableList
_sys_ordinary_abstraction_middle.prototype.getVariableList = function() {
    return this._params[0];
};

// get method for attribute body
_sys_ordinary_abstraction_middle.prototype.getBody = function() {
    return this._params[1];
};

// get method for attribute context
_sys_ordinary_abstraction_middle.prototype.getContext = function() {
    return this._params[2];
};
// set method for attribute variableList
_sys_ordinary_abstraction_middle.prototype.setVariableList = function(v) {
    this._params[0] = v;
};

// set method for attribute body
_sys_ordinary_abstraction_middle.prototype.setBody = function(v) {
    this._params[1] = v;
};

// set method for attribute context
_sys_ordinary_abstraction_middle.prototype.setContext = function(v) {
    this._params[2] = v;
};
// equal method for attribute variableList
_sys_ordinary_abstraction_middle.prototype.equalVariableList = function(v) {
    return this._params[0] === v;
};

// equal method for attribute body
_sys_ordinary_abstraction_middle.prototype.equalBody = function(v) {
    return this._params[1] === v;
};

// equal method for attribute context
_sys_ordinary_abstraction_middle.prototype.equalContext = function(v) {
    return this._params[2] === v;
};
// some meta methods for model sys_ordinary_abstraction_middle
_sys_ordinary_abstraction_middle.prototype.params = function() {
    return this._params;
};
_sys_ordinary_abstraction_middle.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_ORDINARY_ABSTRACTION_MIDDLE = 'sys_ordinary_abstraction_middle';
_sys_ordinary_abstraction_middle.prototype.className = MODEL_CLASS_NAME_SYS_ORDINARY_ABSTRACTION_MIDDLE;
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
// construcor for sys_statements_middle
var sys_statements_middle = function(statementList) {
    return new _sys_statements_middle(statementList);
};
// private inner class
var _sys_statements_middle = function(statementList) {
    this._params = [statementList];
};
// get method for attribute statementList
_sys_statements_middle.prototype.getStatementList = function() {
    return this._params[0];
};
// set method for attribute statementList
_sys_statements_middle.prototype.setStatementList = function(v) {
    this._params[0] = v;
};
// equal method for attribute statementList
_sys_statements_middle.prototype.equalStatementList = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_statements_middle
_sys_statements_middle.prototype.params = function() {
    return this._params;
};
_sys_statements_middle.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_STATEMENTS_MIDDLE = 'sys_statements_middle';
_sys_statements_middle.prototype.className = MODEL_CLASS_NAME_SYS_STATEMENTS_MIDDLE;
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
// construcor for sys_identity
var sys_identity = function(value) {
    return new _sys_identity(value);
};
// private inner class
var _sys_identity = function(value) {
    this._params = [value];
};
// get method for attribute value
_sys_identity.prototype.getValue = function() {
    return this._params[0];
};
// set method for attribute value
_sys_identity.prototype.setValue = function(v) {
    this._params[0] = v;
};
// equal method for attribute value
_sys_identity.prototype.equalValue = function(v) {
    return this._params[0] === v;
};
// some meta methods for model sys_identity
_sys_identity.prototype.params = function() {
    return this._params;
};
_sys_identity.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_IDENTITY = 'sys_identity';
_sys_identity.prototype.className = MODEL_CLASS_NAME_SYS_IDENTITY;
// construcor for sys_importStatementMiddle
var sys_importStatementMiddle = function(module, variable, nextStatements) {
    return new _sys_importStatementMiddle(module, variable, nextStatements);
};
// private inner class
var _sys_importStatementMiddle = function(module, variable, nextStatements) {
    this._params = [module, variable, nextStatements];
};
// get method for attribute module
_sys_importStatementMiddle.prototype.getModule = function() {
    return this._params[0];
};

// get method for attribute variable
_sys_importStatementMiddle.prototype.getVariable = function() {
    return this._params[1];
};

// get method for attribute nextStatements
_sys_importStatementMiddle.prototype.getNextStatements = function() {
    return this._params[2];
};
// set method for attribute module
_sys_importStatementMiddle.prototype.setModule = function(v) {
    this._params[0] = v;
};

// set method for attribute variable
_sys_importStatementMiddle.prototype.setVariable = function(v) {
    this._params[1] = v;
};

// set method for attribute nextStatements
_sys_importStatementMiddle.prototype.setNextStatements = function(v) {
    this._params[2] = v;
};
// equal method for attribute module
_sys_importStatementMiddle.prototype.equalModule = function(v) {
    return this._params[0] === v;
};

// equal method for attribute variable
_sys_importStatementMiddle.prototype.equalVariable = function(v) {
    return this._params[1] === v;
};

// equal method for attribute nextStatements
_sys_importStatementMiddle.prototype.equalNextStatements = function(v) {
    return this._params[2] === v;
};
// some meta methods for model sys_importStatementMiddle
_sys_importStatementMiddle.prototype.params = function() {
    return this._params;
};
_sys_importStatementMiddle.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_IMPORTSTATEMENTMIDDLE = 'sys_importStatementMiddle';
_sys_importStatementMiddle.prototype.className = MODEL_CLASS_NAME_SYS_IMPORTSTATEMENTMIDDLE;
// construcor for sys_letStatementMiddle
var sys_letStatementMiddle = function(letStatement, nextStatements) {
    return new _sys_letStatementMiddle(letStatement, nextStatements);
};
// private inner class
var _sys_letStatementMiddle = function(letStatement, nextStatements) {
    this._params = [letStatement, nextStatements];
};
// get method for attribute letStatement
_sys_letStatementMiddle.prototype.getLetStatement = function() {
    return this._params[0];
};

// get method for attribute nextStatements
_sys_letStatementMiddle.prototype.getNextStatements = function() {
    return this._params[1];
};
// set method for attribute letStatement
_sys_letStatementMiddle.prototype.setLetStatement = function(v) {
    this._params[0] = v;
};

// set method for attribute nextStatements
_sys_letStatementMiddle.prototype.setNextStatements = function(v) {
    this._params[1] = v;
};
// equal method for attribute letStatement
_sys_letStatementMiddle.prototype.equalLetStatement = function(v) {
    return this._params[0] === v;
};

// equal method for attribute nextStatements
_sys_letStatementMiddle.prototype.equalNextStatements = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_letStatementMiddle
_sys_letStatementMiddle.prototype.params = function() {
    return this._params;
};
_sys_letStatementMiddle.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_LETSTATEMENTMIDDLE = 'sys_letStatementMiddle';
_sys_letStatementMiddle.prototype.className = MODEL_CLASS_NAME_SYS_LETSTATEMENTMIDDLE;
// construcor for sys_applyGuardedAbstraction
var sys_applyGuardedAbstraction = function() {
    return new _sys_applyGuardedAbstraction();
};
// private inner class
var _sys_applyGuardedAbstraction = function() {
    this._params = [];
};
// some meta methods for model sys_applyGuardedAbstraction
_sys_applyGuardedAbstraction.prototype.params = function() {
    return this._params;
};
_sys_applyGuardedAbstraction.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_APPLYGUARDEDABSTRACTION = 'sys_applyGuardedAbstraction';
_sys_applyGuardedAbstraction.prototype.className = MODEL_CLASS_NAME_SYS_APPLYGUARDEDABSTRACTION;
// construcor for sys_applyOrdinaryAbstraction
var sys_applyOrdinaryAbstraction = function(abstractionMiddle, params) {
    return new _sys_applyOrdinaryAbstraction(abstractionMiddle, params);
};
// private inner class
var _sys_applyOrdinaryAbstraction = function(abstractionMiddle, params) {
    this._params = [abstractionMiddle, params];
};
// get method for attribute abstractionMiddle
_sys_applyOrdinaryAbstraction.prototype.getAbstractionMiddle = function() {
    return this._params[0];
};

// get method for attribute params
_sys_applyOrdinaryAbstraction.prototype.getParams = function() {
    return this._params[1];
};
// set method for attribute abstractionMiddle
_sys_applyOrdinaryAbstraction.prototype.setAbstractionMiddle = function(v) {
    this._params[0] = v;
};

// set method for attribute params
_sys_applyOrdinaryAbstraction.prototype.setParams = function(v) {
    this._params[1] = v;
};
// equal method for attribute abstractionMiddle
_sys_applyOrdinaryAbstraction.prototype.equalAbstractionMiddle = function(v) {
    return this._params[0] === v;
};

// equal method for attribute params
_sys_applyOrdinaryAbstraction.prototype.equalParams = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_applyOrdinaryAbstraction
_sys_applyOrdinaryAbstraction.prototype.params = function() {
    return this._params;
};
_sys_applyOrdinaryAbstraction.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_APPLYORDINARYABSTRACTION = 'sys_applyOrdinaryAbstraction';
_sys_applyOrdinaryAbstraction.prototype.className = MODEL_CLASS_NAME_SYS_APPLYORDINARYABSTRACTION;
// construcor for sys_applyMetaMethod
var sys_applyMetaMethod = function(metaMethod, params) {
    return new _sys_applyMetaMethod(metaMethod, params);
};
// private inner class
var _sys_applyMetaMethod = function(metaMethod, params) {
    this._params = [metaMethod, params];
};
// get method for attribute metaMethod
_sys_applyMetaMethod.prototype.getMetaMethod = function() {
    return this._params[0];
};

// get method for attribute params
_sys_applyMetaMethod.prototype.getParams = function() {
    return this._params[1];
};
// set method for attribute metaMethod
_sys_applyMetaMethod.prototype.setMetaMethod = function(v) {
    this._params[0] = v;
};

// set method for attribute params
_sys_applyMetaMethod.prototype.setParams = function(v) {
    this._params[1] = v;
};
// equal method for attribute metaMethod
_sys_applyMetaMethod.prototype.equalMetaMethod = function(v) {
    return this._params[0] === v;
};

// equal method for attribute params
_sys_applyMetaMethod.prototype.equalParams = function(v) {
    return this._params[1] === v;
};
// some meta methods for model sys_applyMetaMethod
_sys_applyMetaMethod.prototype.params = function() {
    return this._params;
};
_sys_applyMetaMethod.prototype.instanceModel = true;
var MODEL_CLASS_NAME_SYS_APPLYMETAMETHOD = 'sys_applyMetaMethod';
_sys_applyMetaMethod.prototype.className = MODEL_CLASS_NAME_SYS_APPLYMETAMETHOD;

module.exports = {BasicContainer, Context, sys_pair, sys_void, sys_data, sys_number, sys_null, sys_true, sys_false, sys_string, sys_array, sys_object, sys_metaMethod, sys_application, sys_ordinary_abstraction, sys_ordinary_abstraction_middle, sys_variable, sys_exp, sys_statements, sys_statements_middle, sys_letBinding, sys_import, sys_condition, sys_guardedAbstractionLine, sys_guardedAbstraction, sys_identity, sys_importStatementMiddle, sys_letStatementMiddle, sys_applyGuardedAbstraction, sys_applyOrdinaryAbstraction, sys_applyMetaMethod};