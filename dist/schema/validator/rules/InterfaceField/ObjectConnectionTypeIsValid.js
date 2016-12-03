'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" interface defines an\n               ~ ObjectConnection with an invalid type.  ObjectConnection can\n               ~ link to a type that does not implement Node, interface with no\n               ~ implementation that also implements Node or union with no\n               ~ members that implement Node. If you are looking to make a\n               ~ connection to a Node type, use NodeConnection instead. ', ''], ['Field "', '" on "', '" interface defines an\n               ~ ObjectConnection with an invalid type.  ObjectConnection can\n               ~ link to a type that does not implement Node, interface with no\n               ~ implementation that also implements Node or union with no\n               ~ members that implement Node. If you are looking to make a\n               ~ connection to a Node type, use NodeConnection instead. ', '']);

var _utils = require('../../utils');

var ObjectConnectionTypeIsValid = function ObjectConnectionTypeIsValid(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;
  var schema = _ref.schema;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var isObjectConnection = field.isObjectConnection;
  var type = field.type;

  var related = schema[type];

  if (isObjectConnection && (!related || related.kind !== 'type' || related.implementsNode) && (!related || related.kind !== 'interface' || related.everyTypeImplementsNode) && (!related || related.kind !== 'union' || related.everyTypeImplementsNode)) {
    return (0, _utils.error)(_templateObject, name, interfaceName, loc);
  }
};
exports.ObjectConnectionTypeIsValid = ObjectConnectionTypeIsValid;