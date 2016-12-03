'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Interface "', '" defines a field "', '" as\n               ~ an edge, but edges could only be defined on mutation and\n               ~ subscription fields. ', ''], ['Interface "', '" defines a field "', '" as\n               ~ an edge, but edges could only be defined on mutation and\n               ~ subscription fields. ', '']);

var _utils = require('../../utils');

var NoEdgeDefinition = function NoEdgeDefinition(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var isEdge = field.isEdge;

  if (isEdge) {
    return (0, _utils.error)(_templateObject, interfaceName, name, loc);
  }
};
exports.NoEdgeDefinition = NoEdgeDefinition;