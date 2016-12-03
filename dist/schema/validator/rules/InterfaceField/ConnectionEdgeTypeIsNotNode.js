'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" interface defines a\n               ~ connection with "', '" edge type that implements Node.\n               ~ Edge types cannot implement Node. ', ''], ['Field "', '" on "', '" interface defines a\n               ~ connection with "', '" edge type that implements Node.\n               ~ Edge types cannot implement Node. ', '']);

var _utils = require('../../utils');

var ConnectionEdgeTypeIsNotNode = function ConnectionEdgeTypeIsNotNode(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;
  var schema = _ref.schema;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var edgeType = field.edgeType;
  var isNodeConnection = field.isNodeConnection;
  var isObjectConnection = field.isObjectConnection;
  var isScalarConnection = field.isScalarConnection;

  var isConnectionField = isNodeConnection || isObjectConnection || isScalarConnection;
  var edgeTypeImplementsNode = edgeType && schema[edgeType] && schema[edgeType].kind === 'type' && schema[edgeType].implementsNode;

  if (isConnectionField && edgeTypeImplementsNode) {
    return (0, _utils.error)(_templateObject, name, interfaceName, edgeType, loc);
  }
};
exports.ConnectionEdgeTypeIsNotNode = ConnectionEdgeTypeIsNotNode;