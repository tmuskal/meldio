'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.FilterDefinition = FilterDefinition;

var _mappers = require('../mappers');

var _mappersUtils = require('../mappers/utils');

var _language = require('../../language');

function FilterDefinition(context) {
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
    FilterDefinition: function FilterDefinition(node) {
      var isNode = function isNode(typeName) {
        return context.schema[typeName] && (context.schema[typeName].implementsNode || context.schema[typeName].everyTypeImplementsNode);
      };

      var filterName = 'Filter#' + (0, _language.print)(node.type);

      if (context.schema[filterName]) {
        throw new Error('Filter on ' + (0, _language.print)(node.type) + ' cannot be redefined.');
      }

      context.schema[filterName] = _extends({
        kind: 'filter',
        name: filterName
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
        conditions: node.conditions.map((0, _mappers.FilterCondition)(context))
      });
      return undefined; // node remains unchanged
    }
  };
}