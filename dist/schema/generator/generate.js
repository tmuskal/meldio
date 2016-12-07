'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$values = require('babel-runtime/core-js/object/values')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.generate = generate;

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

// import invariant from '../../jsutils/invariant';
// import keyMap from '../../jsutils/keyMap';

var _jsutilsValues = require('../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _jsutilsCasing = require('../../jsutils/casing');

var _graphqlType = require('graphql/type');

var _graphqlUtilities = require('graphql/utilities');

var _analyzer = require('../analyzer');

var _validatorDefinitions = require('../validator/definitions');

function extractAggFieldDefinitions(fields) {
  return _Object$values(fields).filter(function (field) {
    return _validatorDefinitions.AGGREGATION_FIELD_NAMES.includes(field.name);
  }).map(function (aggField) {
    return _defineProperty({}, aggField.name, aggField.args.map(function (arg) {
      return _defineProperty({}, arg.name, arg.type);
    }).reduce(function (acc, arg) {
      return _extends({}, acc, arg);
    }, {}));
  }).reduce(function (acc, field) {
    return _extends({}, acc, field);
  }, {});
}

function extractFilterInputObjectDefinition(typeMap, node, edge) {
  var filterInputObjectName = '_' + node + '_' + (edge || '') + '_EdgeFilter';
  return typeMap[filterInputObjectName];
}

function extractOrderInputObjectDefinition(typeMap, node, edge) {
  var orderInputObjectName = '_' + node + '_' + (edge || '') + '_EdgeOrder';
  return typeMap[orderInputObjectName];
}

function extractListFilterInputObjectDefinition(typeMap, typeName) {
  var filterInputObjectName = '_' + typeName + '_Filter';
  return typeMap[filterInputObjectName];
}

function extractListOrderInputObjectDefinition(typeMap, typeName) {
  var filterInputObjectName = '_' + typeName + '_Order';
  return typeMap[filterInputObjectName];
}

// Simplified generator that  uses GraphQL's buildASTSchema and mokeypatches
// resolvers.  TODO: replace with proper codegen

function generate(transformedAST, schema, resolvers) {
  var rootsOnType = arguments.length <= 3 || arguments[3] === undefined ? "_Query" : arguments[3];

  if ((0, _jsutilsIsNullish2['default'])(transformedAST) || (0, _jsutilsIsNullish2['default'])(schema) || (0, _jsutilsIsNullish2['default'])(resolvers)) {
    throw new Error('must pass transformedAST, schema and resolvers.');
  }

  var ConnectionField = resolvers.ConnectionField;
  var InterfacePluralIdField = resolvers.InterfacePluralIdField;
  var NodeField = resolvers.NodeField;
  var TypePluralIdField = resolvers.TypePluralIdField;
  var UnionPluralIdField = resolvers.UnionPluralIdField;
  var IDField = resolvers.IDField;
  var ResolveType = resolvers.ResolveType;
  var IsTypeOf = resolvers.IsTypeOf;
  var NodeConnection = resolvers.NodeConnection;
  var ObjectConnection = resolvers.ObjectConnection;
  var ScalarConnection = resolvers.ScalarConnection;
  var Node = resolvers.Node;
  var NodeList = resolvers.NodeList;
  var ObjectList = resolvers.ObjectList;
  var ScalarList = resolvers.ScalarList;
  var AggregationField = resolvers.AggregationField;
  var Mutation = resolvers.Mutation;
  var ViewerField = resolvers.ViewerField;

  var hasMutations = (0, _jsutilsValues2['default'])(schema).some(function (type) {
    return type.kind === 'mutation';
  });
  // const hasSubscriptions = false;
  var rootTypes = ['_Query', hasMutations ? '_Mutations' : undefined];

  // hasSubscriptions ? '_Subscriptions' : undefined,
  var result = _graphqlUtilities.buildASTSchema.apply(undefined, [transformedAST].concat(rootTypes));

  // 1. Setup resolvers for root _Query type:
  // ... node field:
  result._typeMap._Query._fields['node'].resolve = NodeField({ schema: schema });
  // ... implicit plural id fields:
  (0, _analyzer.implicitRootPluralIdTypes)(schema).forEach(function (definition) {
    var name = definition.name;
    var fieldName = (0, _jsutilsCasing.camelCase)(definition.name);

    result._typeMap[rootsOnType]._fields[fieldName].resolve = definition.kind === 'type' ? TypePluralIdField({ schema: schema, name: name, field: 'id' }) : definition.kind === 'union' ? UnionPluralIdField({ schema: schema, name: name }) : definition.kind === 'interface' ? InterfacePluralIdField({ schema: schema, name: name }) :
    // istanbul ignore next
    function () {
      return null;
    };
  });
  // ... explicit plural id fields:
  (0, _analyzer.rootPluralIdDirectives)(schema).forEach(function (directive) {
    var fieldName = directive.arguments[0].value;
    var name = directive.parentTypeName;
    var field = directive.parentFieldName;
    result._typeMap[rootsOnType]._fields[fieldName].resolve = TypePluralIdField({ schema: schema, name: name, field: field });
  });
  // ... root connections:
  (0, _analyzer.rootConnectionDirectives)(schema).map(function (directive) {
    var fieldName = directive.arguments[0].value;
    var node = directive.parentTypeName;

    var fields = result._typeMap._Query._fields[fieldName].type._fields;
    var aggFieldDefinitions = extractAggFieldDefinitions(fields);
    var filterInputObjectDefinition = extractFilterInputObjectDefinition(result._typeMap, node);
    var orderInputObjectDefinition = extractOrderInputObjectDefinition(result._typeMap, node);

    result._typeMap[rootsOnType]._fields[fieldName].resolve = ConnectionField({
      schema: schema,
      node: node,
      aggFieldDefinitions: aggFieldDefinitions,
      filterInputObjectDefinition: filterInputObjectDefinition,
      orderInputObjectDefinition: orderInputObjectDefinition
    });
  });

  // 2. Setup type resolvers on each Union:
  (0, _jsutilsValues2['default'])(schema).filter(function (def) {
    return def.kind === 'union';
  }).forEach(function (union) {

    result._typeMap[union.name].resolveType = result._typeMap[union.name]._typeConfig.resolveType = ResolveType({ typeMap: result._typeMap });
  });

  // 3. Setup type resolvers on each Interface:
  (0, _jsutilsValues2['default'])(schema).filter(function (def) {
    return def.kind === 'interface';
  }).forEach(function (inter) {
    result._typeMap[inter.name].resolveType = ResolveType({ typeMap: result._typeMap });
  });

  // 4. Setup isTypeOf resolvers on each type that is in the generalted
  // GraphQL schema typeMap. Latter condition (result._typeMap[def.name]) is
  // neccessary because EdgeProps will be in Meldio schema, but not in
  // generated GraphQL schema instance.
  (0, _jsutilsValues2['default'])(schema).filter(function (def) {
    return def.kind === 'type' && result._typeMap[def.name];
  }).forEach(function (type) {
    result._typeMap[type.name].isTypeOf = IsTypeOf({ name: type.name });

    // setup resolver for id fields on nodes:
    if (type.implementsNode) {
      result._typeMap[type.name]._fields.id.resolve = IDField();
    }

    type.fields.forEach(function (field) {
      if (field.isNodeConnection) {
        var node = field.type;
        var edge = field.edgeType;
        var fields = result._typeMap[type.name]._fields[field.name].type._fields;
        var aggFieldDefinitions = extractAggFieldDefinitions(fields);
        var filterInputObjectDefinition = extractFilterInputObjectDefinition(result._typeMap, node, edge);
        var orderInputObjectDefinition = extractOrderInputObjectDefinition(result._typeMap, node, edge);

        result._typeMap[type.name]._fields[field.name].resolve = NodeConnection({
          schema: schema,
          node: node,
          edge: edge,
          field: field.name,
          relatedField: field.relatedField,
          aggFieldDefinitions: aggFieldDefinitions,
          filterInputObjectDefinition: filterInputObjectDefinition,
          orderInputObjectDefinition: orderInputObjectDefinition
        });
      } else if (field.isObjectConnection) {
        var node = field.type;
        var edge = field.edgeType;
        var fields = result._typeMap[type.name]._fields[field.name].type._fields;
        var aggFieldDefinitions = extractAggFieldDefinitions(fields);
        var filterInputObjectDefinition = extractFilterInputObjectDefinition(result._typeMap, node, edge);
        var orderInputObjectDefinition = extractOrderInputObjectDefinition(result._typeMap, node, edge);

        result._typeMap[type.name]._fields[field.name].resolve = ObjectConnection({
          schema: schema,
          node: node,
          edge: edge,
          field: field.name,
          aggFieldDefinitions: aggFieldDefinitions,
          filterInputObjectDefinition: filterInputObjectDefinition,
          orderInputObjectDefinition: orderInputObjectDefinition
        });
      } else if (field.isScalarConnection) {
        var node = field.type;
        var edge = field.edgeType;
        var fields = result._typeMap[type.name]._fields[field.name].type._fields;
        var aggFieldDefinitions = extractAggFieldDefinitions(fields);
        var filterInputObjectDefinition = extractFilterInputObjectDefinition(result._typeMap, node, edge);
        var orderInputObjectDefinition = extractOrderInputObjectDefinition(result._typeMap, node, edge);

        result._typeMap[type.name]._fields[field.name].resolve = ScalarConnection({
          schema: schema,
          node: node,
          edge: edge,
          field: field.name,
          aggFieldDefinitions: aggFieldDefinitions,
          filterInputObjectDefinition: filterInputObjectDefinition,
          orderInputObjectDefinition: orderInputObjectDefinition
        });
      } else if (field.isNode) {
        result._typeMap[type.name]._fields[field.name].resolve = Node({ schema: schema, field: field.name });
      } else if (field.isNodeList) {
        var filterInputObjectDefinition = extractListFilterInputObjectDefinition(result._typeMap, field.type);
        var orderInputObjectDefinition = extractListOrderInputObjectDefinition(result._typeMap, field.type);

        result._typeMap[type.name]._fields[field.name].resolve = NodeList({
          schema: schema,
          typeName: field.type,
          field: field.name,
          filterInputObjectDefinition: filterInputObjectDefinition,
          orderInputObjectDefinition: orderInputObjectDefinition
        });
      } else if (field.isObjectList) {
        var filterInputObjectDefinition = extractListFilterInputObjectDefinition(result._typeMap, field.type);
        var orderInputObjectDefinition = extractListOrderInputObjectDefinition(result._typeMap, field.type);

        result._typeMap[type.name]._fields[field.name].resolve = ObjectList({
          schema: schema,
          typeName: field.type,
          field: field.name,
          filterInputObjectDefinition: filterInputObjectDefinition,
          orderInputObjectDefinition: orderInputObjectDefinition
        });
      } else if (field.isScalarList) {
        var filterInputObjectDefinition = extractListFilterInputObjectDefinition(result._typeMap, field.type);

        result._typeMap[type.name]._fields[field.name].resolve = ScalarList({
          schema: schema,
          typeName: field.type,
          field: field.name,
          filterInputObjectDefinition: filterInputObjectDefinition
        });
      }
    });
  });

  // 5. Setup connection aggregation field resolvers
  (0, _analyzer.allConnections)(schema).forEach(function (connection) {
    var name = connection.name;

    // istanbul ignore else
    if (result._typeMap[name]._fields.count) {
      result._typeMap[name]._fields.count.resolve = AggregationField;
    }
    if (result._typeMap[name]._fields.sum) {
      result._typeMap[name]._fields.sum.resolve = AggregationField;
    }
    if (result._typeMap[name]._fields.average) {
      result._typeMap[name]._fields.average.resolve = AggregationField;
    }
    if (result._typeMap[name]._fields.min) {
      result._typeMap[name]._fields.min.resolve = AggregationField;
    }
    if (result._typeMap[name]._fields.max) {
      result._typeMap[name]._fields.max.resolve = AggregationField;
    }
  });

  // 6. Setup mutation resolvers:
  (0, _jsutilsValues2['default'])(schema).filter(function (def) {
    return def.kind === 'mutation';
  }).forEach(function (mutation) {
    result._typeMap._Mutations._fields[mutation.name].resolve = Mutation({ schema: schema });
  });

  // 7. Setup resolver for rootViewer field:
  (0, _analyzer.rootViewerDirectives)(schema).forEach(function (directive) {
    var fieldName = directive.arguments[0].value;
    var typeName = directive.parentTypeName;
    result._typeMap._Query._fields[fieldName].resolve = ViewerField({ schema: schema, typeName: typeName });
  });

  return result;
}