'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ConnectionFilter = ConnectionFilter;

var _schemaAnalyzer = require('../../../schema/analyzer');

var _commonFilters = require('../common/Filters');

var hasEdgeFilter = function hasEdgeFilter(filter) {
  return _Object$keys(filter).filter(function (key) {
    return key !== 'node';
  }).length !== 0;
};

function ConnectionFilter(context) {
  var schema = context.schema;
  var edge = context.edge;
  var node = context.node;

  var _Filters = (0, _commonFilters.Filters)({ schema: schema });

  var objectFilter = _Filters.objectFilter;
  var fieldFilter = _Filters.fieldFilter;

  var nodeIsScalar = _schemaAnalyzer.SCALAR_TYPES.includes(node) || schema[node] && schema[node].kind === 'enum';

  if (nodeIsScalar) {
    return function (filter) {
      return {
        $and: [].concat(_toConsumableArray(filter.node ? fieldFilter(filter.node, { isScalar: true, name: 'node' }, '') : []), _toConsumableArray(hasEdgeFilter(filter) ? objectFilter(filter, edge, 'edgeProps') : []), [{}])
      };
    };
  }
  return function (filter) {
    return {
      $and: [].concat(_toConsumableArray(filter.node ? objectFilter(filter.node, node, 'node') : []), _toConsumableArray(hasEdgeFilter(filter) ? objectFilter(filter, edge, 'edgeProps') : []), [{}])
    };
  };
}