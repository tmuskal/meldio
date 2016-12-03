'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Order cannot be defined on ', '. Order can only be defined\n               ~ on non-scalar lists and connections with scalar fields on nodes\n               ~ or edges. ', ''], ['Order cannot be defined on ', '. Order can only be defined\n               ~ on non-scalar lists and connections with scalar fields on nodes\n               ~ or edges. ', '']);

var _utils = require('../../utils');

var TypeIsValid = function TypeIsValid(_ref) {
  var order = _ref.order;
  var schema = _ref.schema;

  if (!order) {
    throw Error('context not passed to rule.');
  }

  function hasScalarFields(typeName) {
    return typeName ? schema[typeName] && (schema[typeName].kind === 'type' || schema[typeName].kind === 'interface') && schema[typeName].fields.some(function (f) {
      return f.isScalar;
    }) : false;
  }

  var loc = order.loc;
  var name = order.name;
  var typeName = order.type;
  var edgeTypeName = order.edgeType;
  var isObjectList = order.isObjectList;
  var isNodeList = order.isNodeList;
  var isScalarConnection = order.isScalarConnection;
  var isObjectConnection = order.isObjectConnection;
  var isNodeConnection = order.isNodeConnection;

  var target = name.replace('Order#', '');

  var isOrderSupported = isNodeList || isObjectList && hasScalarFields(typeName) || isScalarConnection || isNodeConnection || isObjectConnection && (hasScalarFields(typeName) || hasScalarFields(edgeTypeName));

  if (!isOrderSupported) {
    return (0, _utils.error)(_templateObject, target, loc);
  }
};
exports.TypeIsValid = TypeIsValid;