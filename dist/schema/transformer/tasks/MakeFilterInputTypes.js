'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeFilterInputTypes = MakeFilterInputTypes;

var _ast = require('../../ast');

function MakeFilterInputTypes(accumulator, context) {
  var schema = context.schema;
  var connections = context.connections;
  var lists = context.lists;

  var filters = {};
  var typeEnums = {};

  var makeFieldFilters = function makeFieldFilters(fields) {
    return fields.filter(function (field) {
      return !field.isNodeConnection && !field.isObjectConnection && !field.isScalarConnection;
    }).map(function (field) {
      return field.isNode ? (0, _ast.makeInput)(field.name, '_ID_Filter') : field.isNodeList ? (0, _ast.makeInput)(field.name, '_ID_ListFilter') : field.isObjectList || field.isScalarList ? (0, _ast.makeInput)(field.name, '_' + field.type + '_ListFilter') : (0, _ast.makeInput)(field.name, '_' + field.type + '_Filter');
    });
  };

  var makeFieldTypeFilters = function makeFieldTypeFilters(fields) {
    fields.filter(function (field) {
      return !field.isNodeConnection && !field.isObjectConnection && !field.isScalarConnection;
    }).forEach(function (field) {
      if (field.isNode) {
        makeTypeFilter('ID');
      } else if (field.isNodeList) {
        makeListTypeFilter('ID');
      } else if (field.isObjectList || field.isScalarList) {
        makeListTypeFilter(field.type);
      } else {
        makeTypeFilter(field.type);
      }
    });
  };

  var makeListTypeFilter = function makeListTypeFilter(typeName) {
    var listTypeName = '[' + typeName + ']';

    if (filters[listTypeName]) {
      return;
    }

    filters[listTypeName] = (0, _ast.makeInputObject)('_' + typeName + '_ListFilter', [(0, _ast.makeInput)('exists', 'Boolean'), (0, _ast.makeInput)('length', 'Int'), (0, _ast.makeInput)('empty', 'Boolean'), (0, _ast.makeInput)('some', '_' + typeName + '_Filter'), (0, _ast.makeInput)('every', '_' + typeName + '_Filter'), (0, _ast.makeInput)('none', '_' + typeName + '_Filter')]);
    makeTypeFilter(typeName);
  };

  var makeEdgeFilter = function makeEdgeFilter(typeName, edgeTypeName) {
    var edgeType = schema[edgeTypeName];

    if (edgeType && edgeType.fields) {
      makeFieldTypeFilters(edgeType.fields);
    }

    return (0, _ast.makeInputObject)('_' + typeName + '_' + edgeTypeName + '_EdgeFilter', [].concat(_toConsumableArray(edgeType && edgeType.fields ? makeFieldFilters(edgeType.fields) : []), [(0, _ast.makeInput)('node', '_' + typeName + '_Filter')]));
  };

  var makeTypesEnumFilter = function makeTypesEnumFilter(typeName, values) {
    var enumTypeName = '_' + typeName + '_Types';
    if (typeEnums[typeName]) {
      return;
    }

    typeEnums[typeName] = (0, _ast.makeEnum)(enumTypeName, values);
    filters[enumTypeName] = (0, _ast.makeInputObject)(enumTypeName + '_Filter', [(0, _ast.makeListReqInput)('eq', enumTypeName), (0, _ast.makeListReqInput)('ne', enumTypeName)]);
  };

  var makeTypeFilter = function makeTypeFilter(typeName) {
    if (filters[typeName]) {
      return;
    }
    var type = schema[typeName];

    if (scalarFilters[typeName]) {
      filters[typeName] = scalarFilters[typeName];
    } else if (type && type.kind === 'enum') {
      filters[typeName] = (0, _ast.makeInputObject)('_' + typeName + '_Filter', [(0, _ast.makeListReqInput)('eq', typeName), (0, _ast.makeListReqInput)('ne', typeName), (0, _ast.makeInput)('exists', 'Boolean')]);
    } else if (type && type.kind === 'union') {
      var isNode = type.everyTypeImplementsNode;

      filters[typeName] = (0, _ast.makeInputObject)('_' + typeName + '_Filter', [(0, _ast.makeInput)('exists', 'Boolean')].concat(_toConsumableArray(isNode ? [(0, _ast.makeInput)('id', '_ID_Filter')] : []), [(0, _ast.makeInput)('type', '_' + typeName + '_Types_Filter')]));

      if (isNode) {
        makeTypeFilter('ID');
      }

      makeTypesEnumFilter(typeName, type.typeNames);
    } else if (type && type.kind === 'interface') {
      var isNode = type.everyTypeImplementsNode;
      var fields = type.fields;

      filters[typeName] = (0, _ast.makeInputObject)('_' + typeName + '_Filter', [(0, _ast.makeInput)('exists', 'Boolean')].concat(_toConsumableArray(isNode && !fields.some(function (f) {
        return f.name === 'id';
      }) ? [(0, _ast.makeInput)('id', '_ID_Filter')] : []), [(0, _ast.makeInput)('type', '_' + typeName + '_Types_Filter')], _toConsumableArray(makeFieldFilters(fields))));

      if (isNode && !fields.some(function (f) {
        return f.name === 'id';
      })) {
        makeTypeFilter('ID');
      }

      makeFieldTypeFilters(fields);

      makeTypesEnumFilter(typeName, type.implementations);
    } else if (type && type.kind === 'type') {
      var fields = type.fields;

      filters[typeName] = (0, _ast.makeInputObject)('_' + typeName + '_Filter', [(0, _ast.makeInput)('exists', 'Boolean')].concat(_toConsumableArray(makeFieldFilters(fields))));

      makeFieldTypeFilters(fields);
    }
  };

  lists.forEach(function (list) {
    if (!filters[list.type]) {
      makeTypeFilter(list.type);
    }
  });

  connections.forEach(function (connection) {
    if (!filters[connection.type]) {
      makeTypeFilter(connection.type);
    }
  });

  var edgeFilters = connections.map(function (connection) {
    return makeEdgeFilter(connection.type, connection.edgeType);
  });

  return [].concat(_toConsumableArray(edgeFilters), _toConsumableArray(_Object$keys(filters).map(function (key) {
    return filters[key];
  })), _toConsumableArray(_Object$keys(typeEnums).map(function (key) {
    return typeEnums[key];
  })));
}

var scalarFilters = {
  Int: (0, _ast.makeInputObject)('_Int_Filter', [(0, _ast.makeListReqInput)('eq', 'Int'), (0, _ast.makeListReqInput)('ne', 'Int'), (0, _ast.makeInput)('lt', 'Int'), (0, _ast.makeInput)('gt', 'Int'), (0, _ast.makeInput)('lte', 'Int'), (0, _ast.makeInput)('gte', 'Int'), (0, _ast.makeInput)('exists', 'Boolean')]),
  Float: (0, _ast.makeInputObject)('_Float_Filter', [(0, _ast.makeListReqInput)('eq', 'Float'), (0, _ast.makeListReqInput)('ne', 'Float'), (0, _ast.makeInput)('lt', 'Float'), (0, _ast.makeInput)('gt', 'Float'), (0, _ast.makeInput)('lte', 'Float'), (0, _ast.makeInput)('gte', 'Float'), (0, _ast.makeInput)('exists', 'Boolean')]),
  String: (0, _ast.makeInputObject)('_String_Filter', [(0, _ast.makeListReqInput)('eq', 'String'), (0, _ast.makeListReqInput)('ne', 'String'), (0, _ast.makeInput)('lt', 'String'), (0, _ast.makeInput)('gt', 'String'), (0, _ast.makeInput)('lte', 'String'), (0, _ast.makeInput)('gte', 'String'), (0, _ast.makeInput)('matches', 'String'), (0, _ast.makeInput)('exists', 'Boolean')]),
  Boolean: (0, _ast.makeInputObject)('_Boolean_Filter', [(0, _ast.makeInput)('eq', 'Boolean'), (0, _ast.makeInput)('ne', 'Boolean'), (0, _ast.makeInput)('exists', 'Boolean')]),
  ID: (0, _ast.makeInputObject)('_ID_Filter', [(0, _ast.makeListReqInput)('eq', 'ID'), (0, _ast.makeListReqInput)('ne', 'ID'), (0, _ast.makeInput)('lt', 'ID'), (0, _ast.makeInput)('gt', 'ID'), (0, _ast.makeInput)('lte', 'ID'), (0, _ast.makeInput)('gte', 'ID'), (0, _ast.makeInput)('exists', 'Boolean')])
};