'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" type defines an\n               ~ ObjectConnection with an invalid type.  ObjectConnection can\n               ~ link to a type that does not implement Node, interface with no\n               ~ implementation that also implements Node or union with no\n               ~ members that implement Node. If you are looking to make a\n               ~ connection to a Node type, use NodeConnection instead. ', ''], ['Field "', '" on "', '" type defines an\n               ~ ObjectConnection with an invalid type.  ObjectConnection can\n               ~ link to a type that does not implement Node, interface with no\n               ~ implementation that also implements Node or union with no\n               ~ members that implement Node. If you are looking to make a\n               ~ connection to a Node type, use NodeConnection instead. ', '']);

var _utils = require('../../utils');

var ObjectConnectionTypeIsValid = function ObjectConnectionTypeIsValid(_ref) {
  var t = _ref.type;
  var field = _ref.field;
  var schema = _ref.schema;

  if (!t || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = t.name;
  var name = field.name;
  var loc = field.loc;
  var isObjectConnection = field.isObjectConnection;
  var type = field.type;

  var related = schema[type];

  if (isObjectConnection && (!related || related.kind !== 'type' || related.implementsNode) && (!related || related.kind !== 'interface' || related.everyTypeImplementsNode) && (!related || related.kind !== 'union' || related.everyTypeImplementsNode)) {
    return (0, _utils.error)(_templateObject, name, typeName, loc);
  }
};
exports.ObjectConnectionTypeIsValid = ObjectConnectionTypeIsValid;