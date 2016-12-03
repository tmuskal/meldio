'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeRootQueryType = MakeRootQueryType;

var _ast = require('../../ast');

var _analyzer = require('../../analyzer');

function MakeRootQueryType(accumulator, context) {

  var getArgValue = function getArgValue(directive, name) {
    return directive.arguments.filter(function (arg) {
      return arg.name === name;
    }).map(function (arg) {
      return String(arg.value);
    })[0];
  };

  var filterByArg = function filterByArg(directive) {
    return (0, _ast.makeInput)('filterBy', '_' + directive.parentTypeName + '__EdgeFilter');
  };

  var filterArgs = function filterArgs(directive) {
    var filterName = 'Filter#NodeConnection(' + directive.parentTypeName + ')';
    var filter = context.schema[filterName];

    return filter && filter.kind === 'filter' && filter.conditions.length ? [(0, _ast.makeInput)('filter', '_' + directive.parentTypeName + '__ConnectionFilterKeys')].concat(_toConsumableArray(accumulator.filterArguments[filterName] || [])) : [];
  };

  var orderByArg = function orderByArg(directive) {
    return (0, _ast.makeListReqInput)('orderBy', '_' + directive.parentTypeName + '__EdgeOrder');
  };

  var orderArgs = function orderArgs(directive) {
    var orderName = 'Order#NodeConnection(' + directive.parentTypeName + ')';
    var order = context.schema[orderName];
    return order && order.kind === 'order' && order.expressions.length ? [(0, _ast.makeInput)('order', '_' + directive.parentTypeName + '__ConnectionOrderKeys')] : [];
  };

  // implicit plural id root fields for each Node type, union and interface:
  var implicitRootPluralIdFields = (0, _analyzer.implicitRootPluralIdTypes)(context.schema).map(function (type) {
    return (0, _ast.makePluralIdField)(type.name);
  });

  // fields defined explicitly with @rootConnection directive:
  var rootConnectionFields = (0, _analyzer.rootConnectionDirectives)(context.schema).map(function (directive) {
    return (0, _ast.makeField)(getArgValue(directive, 'field'), [(0, _ast.makeInput)('first', 'Int'), (0, _ast.makeInput)('last', 'Int'), (0, _ast.makeInput)('after', 'String'), (0, _ast.makeInput)('before', 'String'), filterByArg(directive)].concat(_toConsumableArray(filterArgs(directive)), [orderByArg(directive)], _toConsumableArray(orderArgs(directive))), (0, _analyzer.getConnectionName)(directive.parentTypeName));
  });

  // fields defined explicitly with @rootPluralId directive:
  var rootPluralIdFields = (0, _analyzer.rootPluralIdDirectives)(context.schema).map(function (directive) {
    return (0, _ast.makePluralIdField)(directive.arguments[0].value, directive.parentTypeName, directive.parentFieldName, directive.parentFieldType);
  });

  // viewer field:
  var viewerField = (0, _analyzer.rootViewerDirectives)(context.schema).map(function (directive) {
    return (0, _ast.makeField)(directive.arguments[0].value, [], directive.parentTypeName);
  });

  var fields = [(0, _ast.makeField)('node', [(0, _ast.makeRequiredInput)('id', 'ID')], 'Node')].concat(_toConsumableArray(viewerField), _toConsumableArray(implicitRootPluralIdFields), _toConsumableArray(rootPluralIdFields), _toConsumableArray(rootConnectionFields));

  return [(0, _ast.makeType)('_Query', [], fields)];
}