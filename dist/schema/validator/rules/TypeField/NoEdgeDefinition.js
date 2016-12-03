'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Type "', '" defines a field "', '" as\n               ~ an edge, but edges could only be defined on mutation and\n               ~ subscription fields. ', ''], ['Type "', '" defines a field "', '" as\n               ~ an edge, but edges could only be defined on mutation and\n               ~ subscription fields. ', '']);

var _utils = require('../../utils');

var NoEdgeDefinition = function NoEdgeDefinition(_ref) {
  var type = _ref.type;
  var field = _ref.field;

  if (!type || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var name = field.name;
  var loc = field.loc;
  var isEdge = field.isEdge;

  if (isEdge) {
    return (0, _utils.error)(_templateObject, typeName, name, loc);
  }
};
exports.NoEdgeDefinition = NoEdgeDefinition;