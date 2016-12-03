'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.OrderDefinition = OrderDefinition;

var _mappers = require('../mappers');

var _mappersUtils = require('../mappers/utils');

var _language = require('../../language');

function OrderDefinition(context) {
  var _ASTHelpers = (0, _mappersUtils.ASTHelpers)(context);

  var isNodeConnectionField = _ASTHelpers.isNodeConnectionField;
  var isObjectConnectionField = _ASTHelpers.isObjectConnectionField;
  var isScalarConnectionField = _ASTHelpers.isScalarConnectionField;
  var getConnectionType = _ASTHelpers.getConnectionType;
  var getConnectionEdgeType = _ASTHelpers.getConnectionEdgeType;
  var isListOfScalarField = _ASTHelpers.isListOfScalarField;
  var isListOfObjectField = _ASTHelpers.isListOfObjectField;
  var getScalarType = _ASTHelpers.getScalarType;
  var getListType = _ASTHelpers.getListType;
  var getObjectType = _ASTHelpers.getObjectType;

  return {
    OrderDefinition: function OrderDefinition(node) {
      var isNode = function isNode(typeName) {
        return context.schema[typeName] && (context.schema[typeName].implementsNode || context.schema[typeName].everyTypeImplementsNode);
      };

      var orderName = 'Order#' + (0, _language.print)(node.type);

      if (context.schema[orderName]) {
        throw new Error('Order on ' + (0, _language.print)(node.type) + ' cannot be redefined.');
      }

      context.schema[orderName] = _extends({
        kind: 'order',
        name: orderName
      }, !context.noLocation && node.loc ? {
        loc: {
          kind: 'location',
          start: node.loc.start,
          end: node.loc.end } } : {}, isNodeConnectionField(node) ? {
        isNodeConnection: true,
        type: getObjectType(getConnectionType(node)),
        edgeType: getConnectionEdgeType(node) } : {}, isObjectConnectionField(node) ? {
        isObjectConnection: true,
        type: getObjectType(getConnectionType(node)),
        edgeType: getConnectionEdgeType(node) } : {}, isScalarConnectionField(node) ? {
        isScalarConnection: true,
        type: getScalarType(getConnectionType(node)),
        edgeType: getConnectionEdgeType(node) } : {}, isListOfScalarField(node) ? {
        isScalarList: true,
        type: getScalarType(getListType(node)) } : {}, isListOfObjectField(node) && isNode(getObjectType(getListType(node))) ? {
        isNodeList: true,
        type: getObjectType(getListType(node)) } : {}, isListOfObjectField(node) && !isNode(getObjectType(getListType(node))) ? {
        isObjectList: true,
        type: getObjectType(getListType(node)) } : {}, {
        expressions: node.expressions.map((0, _mappers.OrderExpression)(context))
      });
      return undefined; // node remains unchanged
    }
  };
}