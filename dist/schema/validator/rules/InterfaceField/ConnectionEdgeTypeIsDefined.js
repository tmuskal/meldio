'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" interface defines a\n               ~ connection with "', '" edge type that is undefined.\n               ~ Edges must be defined as types and cannot implement Node\n               ~ interface. ', ''], ['Field "', '" on "', '" interface defines a\n               ~ connection with "', '" edge type that is undefined.\n               ~ Edges must be defined as types and cannot implement Node\n               ~ interface. ', '']);

var _utils = require('../../utils');

var ConnectionEdgeTypeIsDefined = function ConnectionEdgeTypeIsDefined(_ref) {
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
  var isObjectConnection = field.isObjectConnection;
  var isScalarConnection = field.isScalarConnection;
  var edgeType = field.edgeType;

  var isConnectionField = isNodeConnection || isObjectConnection || isScalarConnection;
  var edgeTypeIsNotDefined = edgeType && (!schema[edgeType] || schema[edgeType].kind !== 'type');

  if (isConnectionField && edgeTypeIsNotDefined) {
    return (0, _utils.error)(_templateObject, name, interfaceName, edgeType, loc);
  }
};
exports.ConnectionEdgeTypeIsDefined = ConnectionEdgeTypeIsDefined;