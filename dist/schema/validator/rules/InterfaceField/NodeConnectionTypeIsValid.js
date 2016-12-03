'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" interface defines a\n               ~ NodeConnection with an invalid type.  NodeConnection can link\n               ~ to a type that implements Node, interface with implementations\n               ~ that all implement Node or union with members that all\n               ~ implement Node. ', ''], ['Field "', '" on "', '" interface defines a\n               ~ NodeConnection with an invalid type.  NodeConnection can link\n               ~ to a type that implements Node, interface with implementations\n               ~ that all implement Node or union with members that all\n               ~ implement Node. ', '']);

var _utils = require('../../utils');

var NodeConnectionTypeIsValid = function NodeConnectionTypeIsValid(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;
  var schema = _ref.schema;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var isNodeConnection = field.isNodeConnection;
  var type = field.type;

  var related = schema[type];

  if (isNodeConnection && (!related || related.kind !== 'type' || !related.implementsNode) && (!related || related.kind !== 'interface' || !related.everyTypeImplementsNode) && (!related || related.kind !== 'union' || !related.everyTypeImplementsNode)) {
    return (0, _utils.error)(_templateObject, name, interfaceName, loc);
  }
};
exports.NodeConnectionTypeIsValid = NodeConnectionTypeIsValid;