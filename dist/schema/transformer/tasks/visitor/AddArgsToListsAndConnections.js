'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.AddArgsToListsAndConnections = AddArgsToListsAndConnections;

var _jsutilsInvariant = require('../../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _ast = require('../../../ast');

var _analyzer = require('../../../analyzer');

function AddArgsToListsAndConnections(accumulator, context) {
  return {
    InterfaceTypeDefinition: function InterfaceTypeDefinition(nodeAST) {
      var filterArguments = accumulator.filterArguments;
      var typeName = nodeAST.name.value;
      var fields = nodeAST.fields;
      var parent = context.schema[typeName];
      (0, _jsutilsInvariant2['default'])(parent, 'Metadata is missing for interface ' + typeName + '.');

      return _extends({}, nodeAST, {
        fields: addArgsToFields(fields, _extends({}, context, { parent: parent, filterArguments: filterArguments }))
      });
    },

    ObjectTypeDefinition: function ObjectTypeDefinition(nodeAST) {
      var filterArguments = accumulator.filterArguments;
      var typeName = nodeAST.name.value;
      var fields = nodeAST.fields;
      var parent = context.schema[typeName];
      (0, _jsutilsInvariant2['default'])(parent, 'Metadata is missing for type ' + typeName + '.');

      // if this is an edge of a connection, add fields to accumulator:
      if (context.connections.some(function (c) {
        return c.edgeType === typeName;
      })) {
        accumulator.edgeTypeFields[typeName] = fields;
      }

      return _extends({}, nodeAST, {
        fields: addArgsToFields(fields, _extends({}, context, { parent: parent, filterArguments: filterArguments }))
      });
    }
  };
}

function addArgsToFields(fieldASTs, context) {
  var parent = context.parent;
  var schema = context.schema;
  var filterArguments = context.filterArguments;

  return fieldASTs.map(function (fieldAST) {
    var name = fieldAST.name.value;
    var field = parent.fields.filter(function (f) {
      return f.name === name;
    })[0];
    (0, _jsutilsInvariant2['default'])(field, 'Metadata is missing for field ' + name + ' in ' + parent.name);

    var edgeTypeSlug = field.edgeType ? ', ' + field.edgeType : '';
    var filterName = field.isNodeList || field.isObjectList || field.isScalarList ? 'Filter#[' + field.type + ']' : field.isNodeConnection ? 'Filter#NodeConnection(' + field.type + edgeTypeSlug + ')' : field.isObjectConnection ? 'Filter#ObjectConnection(' + field.type + edgeTypeSlug + ')' : field.isScalarConnection ? 'Filter#ScalarConnection(' + field.type + edgeTypeSlug + ')' : '#undefined#';
    var filter = schema[filterName];

    var orderName = field.isNodeList || field.isObjectList ? 'Order#[' + field.type + ']' : field.isNodeConnection ? 'Order#NodeConnection(' + field.type + edgeTypeSlug + ')' : field.isObjectConnection ? 'Order#ObjectConnection(' + field.type + edgeTypeSlug + ')' : field.isScalarConnection ? 'Order#ScalarConnection(' + field.type + edgeTypeSlug + ')' : '#undefined#';
    var order = schema[orderName];

    var typeName = field.type;
    var type = schema[typeName];
    var edgeTypeName = field.edgeType || '';
    var edgeType = schema[field.edgeType];
    var edgeHasScalarFields = edgeType && edgeType.fields && edgeType.fields.some(function (f) {
      return f.isScalar;
    });
    var nodeHasScalarFields = type && type.fields && type.fields.some(function (f) {
      return f.isScalar;
    });
    var hasScalarFields = edgeHasScalarFields || nodeHasScalarFields;
    var isList = field.isNodeList || field.isObjectList || field.isScalarList;
    var isConnection = field.isNodeConnection || field.isObjectConnection || field.isScalarConnection;

    var pagingArguments = isList ? [(0, _ast.makeInput)('first', 'Int'), (0, _ast.makeInput)('last', 'Int')] : isConnection ? [(0, _ast.makeInput)('first', 'Int'), (0, _ast.makeInput)('last', 'Int'), (0, _ast.makeInput)('after', 'String'), (0, _ast.makeInput)('before', 'String')] : [];

    var filterArgument = filter && filter.kind === 'filter' && filter.conditions.length ? [(0, _ast.makeInput)('filter', isList ? '_' + typeName + '_ListFilterKeys' : '_' + typeName + '_' + edgeTypeName + '_ConnectionFilterKeys')].concat(_toConsumableArray(filterArguments[filterName] || [])) : [];

    var filterByArgument = isList ? [(0, _ast.makeInput)('filterBy', '_' + typeName + '_Filter')] : isConnection ? [(0, _ast.makeInput)('filterBy', '_' + typeName + '_' + edgeTypeName + '_EdgeFilter')] : [];

    var orderArgument = order && order.kind === 'order' && order.expressions.length ? [(0, _ast.makeInput)('order', isList ? '_' + typeName + '_ListOrderKeys' : '_' + typeName + '_' + edgeTypeName + '_ConnectionOrderKeys')] : [];

    var orderByArgument = field.isScalarList ? [(0, _ast.makeInput)('orderBy', '_Order')] : field.isNodeList || field.isObjectList && hasScalarFields ? [(0, _ast.makeListReqInput)('orderBy', '_' + typeName + '_Order')] : field.isScalarConnection && !edgeHasScalarFields ? [(0, _ast.makeInput)('orderBy', '_' + typeName + '_' + edgeTypeName + '_EdgeOrder')] : field.isScalarConnection && edgeHasScalarFields || field.isNodeConnection || field.isObjectConnection && hasScalarFields ? [(0, _ast.makeListReqInput)('orderBy', '_' + typeName + '_' + edgeTypeName + '_EdgeOrder')] : [];

    var aggregationArgument = field.isScalarList && _analyzer.NUMERIC_TYPES.includes(typeName) ? [(0, _ast.makeInput)('aggregate', '_NumericAggregate')] : [];
    var fieldArgs = field.args.map(function (arg) {
      return (0, _ast.makeInput)(arg.name, arg.type);
    });
    return _extends({}, fieldAST, {
      arguments: [].concat(pagingArguments, filterByArgument, _toConsumableArray(filterArgument), orderByArgument, orderArgument, aggregationArgument, _toConsumableArray(fieldArgs))
    });
  });
}