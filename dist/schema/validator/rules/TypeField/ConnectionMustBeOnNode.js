'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" type is defined as a\n               ~ connection, but ', ' type does not implement Node\n               ~ interface. Connection fields can only be defined on types\n               ~ that implement Node. ', ''], ['Field "', '" on "', '" type is defined as a\n               ~ connection, but ', ' type does not implement Node\n               ~ interface. Connection fields can only be defined on types\n               ~ that implement Node. ', '']);

var _utils = require('../../utils');

var ConnectionMustBeOnNode = function ConnectionMustBeOnNode(_ref) {
  var type = _ref.type;
  var field = _ref.field;

  if (!type || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var implementsNode = type.implementsNode;
  var name = field.name;
  var loc = field.loc;
  var isNodeConnection = field.isNodeConnection;
  var isObjectConnection = field.isObjectConnection;
  var isScalarConnection = field.isScalarConnection;

  var isConn = isNodeConnection || isObjectConnection || isScalarConnection;

  if (isConn && !implementsNode) {
    return (0, _utils.error)(_templateObject, name, typeName, typeName, loc);
  }
};
exports.ConnectionMustBeOnNode = ConnectionMustBeOnNode;