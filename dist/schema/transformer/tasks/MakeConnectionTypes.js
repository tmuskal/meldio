'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeConnectionTypes = MakeConnectionTypes;

var _ast = require('../../ast');

var _analyzer = require('../../analyzer');

function MakeConnectionTypes(accumulator, context) {
  var empty = [];
  return context.connections.map(function (connection) {
    return [makeConnectionType(connection, accumulator, context), makeEdgeType(connection, accumulator, context)];
  }).reduce(function (acc, defs) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(defs));
  }, empty);
}

function makeConnectionType(connection, accumulator, context) {
  var schema = context.schema;

  var hasNumericFields = function hasNumericFields(typeName) {
    return schema[typeName] && schema[typeName].fields && schema[typeName].fields.some(function (field) {
      return field.isNumeric;
    });
  };

  var kind = connection.kind;
  var name = connection.name;
  var edgeType = connection.edgeType;
  var type = connection.type;

  var edgeHasNumericFields = hasNumericFields(edgeType);
  var nodeHasNumericFields = hasNumericFields(type);

  var filterName = 'Filter#' + kind + '(' + type + (edgeType ? ', ' + edgeType : '') + ')';
  var filter = schema[filterName];

  var edgeFilterName = '_' + type + '_' + edgeType + '_EdgeFilter';

  var countFieldArgs = [(0, _ast.makeInput)('filterBy', edgeFilterName)].concat(_toConsumableArray(filter ? [(0, _ast.makeInput)('filter', '_' + type + '_' + edgeType + '_ConnectionFilterKeys')].concat(_toConsumableArray(accumulator.filterArguments[filterName] || [])) : []));

  var countField = (0, _ast.makeField)('count', countFieldArgs, 'Int');

  var aggregationSelectorArgs = [].concat(_toConsumableArray(edgeHasNumericFields ? [(0, _ast.makeInput)('edges', '_' + edgeType + '_NumericFields')] : []), _toConsumableArray(nodeHasNumericFields ? // type or interface connection
  [(0, _ast.makeInput)('node', '_' + type + '_NumericFields')] : []), _toConsumableArray(_analyzer.NUMERIC_TYPES.includes(type) ? // scalar connection
  [(0, _ast.makeInput)('node', '_NodeValue')] : []));

  var aggregationFields = aggregationSelectorArgs.length ? [(0, _ast.makeField)('sum', aggregationSelectorArgs, 'Float'), (0, _ast.makeField)('average', aggregationSelectorArgs, 'Float'), (0, _ast.makeField)('min', aggregationSelectorArgs, 'Float'), (0, _ast.makeField)('max', aggregationSelectorArgs, 'Float')] : [];

  var fields = [(0, _ast.makeListField)('edges', [], (0, _analyzer.getEdgeName)(type, edgeType)), (0, _ast.makeRequiredField)('pageInfo', [], 'PageInfo'), countField].concat(aggregationFields);

  return (0, _ast.makeType)(name, [], fields);
}

function makeEdgeType(connection, accumulator) {
  var edgeTypeName = connection.edgeType;
  var typeName = connection.type;

  var edgeTypeFields = accumulator.edgeTypeFields[edgeTypeName];

  var fields = [(0, _ast.makeField)('node', [], typeName), (0, _ast.makeField)('cursor', [], 'String')].concat(_toConsumableArray(edgeTypeName && edgeTypeFields ? edgeTypeFields : []));

  return (0, _ast.makeType)((0, _analyzer.getEdgeName)(typeName, edgeTypeName), [], fields);
}