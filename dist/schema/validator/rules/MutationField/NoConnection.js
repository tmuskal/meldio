'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation "', '" declares field "', '" as a\n               ~ connection. Mutation fields cannot be connections, but could be\n               ~ edges of a connection. ', ''], ['Mutation "', '" declares field "', '" as a\n               ~ connection. Mutation fields cannot be connections, but could be\n               ~ edges of a connection. ', '']);

var _utils = require('../../utils');

var NoConnection = function NoConnection(_ref) {
  var mutation = _ref.mutation;
  var field = _ref.field;

  if (!mutation || !field) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = field.name;
  var loc = field.loc;
  var isNodeConnection = field.isNodeConnection;
  var isObjectConnection = field.isObjectConnection;
  var isScalarConnection = field.isScalarConnection;

  if (isNodeConnection || isObjectConnection || isScalarConnection) {
    return (0, _utils.error)(_templateObject, mutationName, name, loc);
  }
};
exports.NoConnection = NoConnection;