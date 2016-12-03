'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" interface is defined as a\n               ~ connection, but some types that implement "', '"\n               ~ interface do not implement Node. Connection fields can only be\n               ~ defined on interfaces whose all implementations also implement\n               ~ Node. ', ''], ['Field "', '" on "', '" interface is defined as a\n               ~ connection, but some types that implement "', '"\n               ~ interface do not implement Node. Connection fields can only be\n               ~ defined on interfaces whose all implementations also implement\n               ~ Node. ', '']);

var _utils = require('../../utils');

var ConnectionMustBeOnNode = function ConnectionMustBeOnNode(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var everyTypeImplementsNode = inter.everyTypeImplementsNode;
  var name = field.name;
  var loc = field.loc;
  var isNodeConnection = field.isNodeConnection;
  var isObjectConnection = field.isObjectConnection;
  var isScalarConnection = field.isScalarConnection;

  var isConn = isNodeConnection || isObjectConnection || isScalarConnection;

  if (isConn && !everyTypeImplementsNode) {
    return (0, _utils.error)(_templateObject, name, interfaceName, interfaceName, loc);
  }
};
exports.ConnectionMustBeOnNode = ConnectionMustBeOnNode;