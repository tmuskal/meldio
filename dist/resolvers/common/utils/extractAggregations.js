'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.extractAggregations = extractAggregations;

var _graphqlLanguageVisitor = require('graphql/language/visitor');

var _graphqlUtilities = require('graphql/utilities');

var _schemaValidatorDefinitions = require('../../../schema/validator/definitions');

function extractAggregations(fieldASTs, aggFieldDefinitions, variableValues) {
  var result = [];
  var visitor = {
    Field: function Field(node) {
      var fieldName = node.name.value;
      if (['edges', 'pageInfo'].includes(fieldName)) {
        return false; // don't follow into these nodes
      } else if (_schemaValidatorDefinitions.AGGREGATION_FIELD_NAMES.includes(fieldName)) {
          result.push({
            name: fieldName,
            alias: node.alias ? node.alias.value : null,
            arguments: node.arguments.map(function (arg) {
              return {
                name: arg.name.value,
                value: (0, _graphqlUtilities.valueFromAST)(arg.value, aggFieldDefinitions[fieldName][arg.name.value], variableValues)
              };
            }) });
          return undefined; // leave node as is
        }
    }
  };
  (0, _graphqlLanguageVisitor.visit)(fieldASTs, visitor, _graphqlLanguageVisitor.QueryDocumentKeys);
  return result;
}