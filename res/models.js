
// construcor for BasicContainer
var BasicContainer = function(type, content) {
    this._params = [type, content];
};
// get method for attribute type
BasicContainer.prototype.getType = function() {
    return this._params[0];
};

// get method for attribute content
BasicContainer.prototype.getContent = function() {
    return this._params[1];
};
// set method for attribute type
BasicContainer.prototype.setType = function(v) {
    this._params[0] = v;
};

// set method for attribute content
BasicContainer.prototype.setContent = function(v) {
    this._params[1] = v;
};
// equal method for attribute type
BasicContainer.prototype.equalType = function(v) {
    return this._params[0] === v;
};

// equal method for attribute content
BasicContainer.prototype.equalContent = function(v) {
    return this._params[1] === v;
};
// some meta methods for model BasicContainer
BasicContainer.prototype.params = function() {
    return this._params;
};
BasicContainer.prototype.instanceModel = true;
BasicContainer.prototype.className = "BasicContainer";

// construcor for Context
var Context = function(variableMap, parent) {
    this._params = [variableMap, parent];
};
// get method for attribute variableMap
Context.prototype.getVariableMap = function() {
    return this._params[0];
};

// get method for attribute parent
Context.prototype.getParent = function() {
    return this._params[1];
};
// set method for attribute variableMap
Context.prototype.setVariableMap = function(v) {
    this._params[0] = v;
};

// set method for attribute parent
Context.prototype.setParent = function(v) {
    this._params[1] = v;
};
// equal method for attribute variableMap
Context.prototype.equalVariableMap = function(v) {
    return this._params[0] === v;
};

// equal method for attribute parent
Context.prototype.equalParent = function(v) {
    return this._params[1] === v;
};
// some meta methods for model Context
Context.prototype.params = function() {
    return this._params;
};
Context.prototype.instanceModel = true;
Context.prototype.className = "Context";

// construcor for Pair
var Pair = function(v1, v2) {
    this._params = [v1, v2];
};
// get method for attribute v1
Pair.prototype.getV1 = function() {
    return this._params[0];
};

// get method for attribute v2
Pair.prototype.getV2 = function() {
    return this._params[1];
};
// set method for attribute v1
Pair.prototype.setV1 = function(v) {
    this._params[0] = v;
};

// set method for attribute v2
Pair.prototype.setV2 = function(v) {
    this._params[1] = v;
};
// equal method for attribute v1
Pair.prototype.equalV1 = function(v) {
    return this._params[0] === v;
};

// equal method for attribute v2
Pair.prototype.equalV2 = function(v) {
    return this._params[1] === v;
};
// some meta methods for model Pair
Pair.prototype.params = function() {
    return this._params;
};
Pair.prototype.instanceModel = true;
Pair.prototype.className = "Pair";

module.exports = {BasicContainer, Context, Pair};