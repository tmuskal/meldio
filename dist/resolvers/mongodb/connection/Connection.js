'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Connection = Connection;

var _jsutilsIsNullish = require('../../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsAtMostOneOf = require('../../../jsutils/atMostOneOf');

var _jsutilsAtMostOneOf2 = _interopRequireDefault(_jsutilsAtMostOneOf);

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _common = require('../../common');

var _common2 = require('../common');

var _ConnectionFilter = require('./ConnectionFilter');

var _ConnectionCountFilter = require('./ConnectionCountFilter');

var _ConnectionOrder = require('./ConnectionOrder');

var _pagingBuilder2 = require('./pagingBuilder');

var _aggregationBuilder = require('./aggregationBuilder');

var _graphqlLanguage = require('graphql/language');

var _graphqlError = require('graphql/error');

var _graphql = require('graphql');

var _graphqlUtilities = require('graphql/utilities');

function Connection(_ref) {
  var schema = _ref.schema;
  var kind = _ref.kind;
  var node = _ref.node;
  var edge = _ref.edge;
  var InitialStages = _ref.InitialStages;
  var collection = _ref.collection;
  var aggFieldDefinitions = _ref.aggFieldDefinitions;
  var filterInputObjectDefinition = _ref.filterInputObjectDefinition;
  var orderInputObjectDefinition = _ref.orderInputObjectDefinition;

  var filterBuilder = (0, _ConnectionFilter.ConnectionFilter)({ schema: schema, node: node, edge: edge });
  var countFilterBuilder = (0, _ConnectionCountFilter.ConnectionCountFilter)({ schema: schema, node: node, edge: edge });
  var orderBuilder = (0, _ConnectionOrder.ConnectionOrder)({ schema: schema, node: node, edge: edge });

  var filterName = 'Filter#' + kind + '(' + node + (edge ? ', ' + edge : '') + ')';
  var filterConditions = schema[filterName] ? schema[filterName].conditions.reduce(function (acc, cond) {
    return _extends({}, acc, _defineProperty({}, cond.key, cond.conditionAST));
  }, {}) : {};
  var orderName = 'Order#' + kind + '(' + node + (edge ? ', ' + edge : '') + ')';
  var orderExpressions = schema[orderName] ? schema[orderName].expressions.reduce(function (acc, exp) {
    return _extends({}, acc, _defineProperty({}, exp.key, exp.expressionASTs));
  }, {}) : {};

  var isNode = schema[node] && schema[node].kind === 'type' ? schema[node].implementsNode : schema[node] && (schema[node].kind === 'union' || schema[node].kind === 'interface') ? schema[node].everyTypeImplementsNode : false;

  var typeNames = schema[node] && schema[node].kind === 'type' ? [schema[node].name] : schema[node] && schema[node].kind === 'union' ? schema[node].typeNames : schema[node] && schema[node].kind === 'interface' ? schema[node].implementations : [];

  return function callee$1$0(parent, args, info) {
    var rootValue, fieldASTs, variableValues, db, config, first, last, after, before, filterBy, filter, orderBy, order, pagingArgs, id, readOptions, permFilter, filterValue, valueAST, validationResults, orderValue, orderListType, mongoFilter, mongoSort, filterStages, lengthStages, lengthResult, length, _pagingBuilder, skipOffset, pgStages, edgeStages, aggregations, aggregationStages, _ref2, _ref22, edgeData, aggregationData, aggregationValues, edges, firstEdge, lastEdge, hasPreviousPage, hasNextPage, startCursor, endCursor;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          rootValue = info.rootValue;
          fieldASTs = info.fieldASTs;
          variableValues = info.variableValues;
          db = rootValue.db;
          config = rootValue.config;
          first = args.first;
          last = args.last;
          after = args.after;
          before = args.before;
          filterBy = args.filterBy;
          filter = args.filter;
          orderBy = args.orderBy;
          order = args.order;
          pagingArgs = { first: first, last: last, after: after, before: before };
          id = parent._id || parent.id;
          readOptions = config.committedReads ? _common2.MAJORITY_READ_OPTIONS : _common2.LOCAL_READ_OPTIONS;
          permFilter = [];

          if (!isNode) {
            context$2$0.next = 21;
            break;
          }

          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(_Promise.all(typeNames.map(function callee$2$0(typeName) {
            var encodedTypeName, f;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  encodedTypeName = (0, _jsutilsGlobalId.encode)(typeName);
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _common2.permissionFilter)(schema, rootValue, typeName, 'node'));

                case 3:
                  f = context$3$0.sent;
                  return context$3$0.abrupt('return', {
                    $or: [{ __encodedNodeType: { $ne: encodedTypeName } }].concat(_toConsumableArray(f ? [{ $and: f.length ? f : [{}] }] : []))
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          })));

        case 20:
          permFilter = context$2$0.sent;

        case 21:
          if ((0, _jsutilsAtMostOneOf2['default'])(filterBy, filter)) {
            context$2$0.next = 23;
            break;
          }

          throw new _graphqlError.GraphQLError('Connection cannot specify more than one filter.');

        case 23:
          filterValue = null;

          if (!filterBy) {
            context$2$0.next = 28;
            break;
          }

          filterValue = filterBy;
          context$2$0.next = 34;
          break;

        case 28:
          if (!filter) {
            context$2$0.next = 34;
            break;
          }

          valueAST = filterConditions[filter];

          // TODO: pass only args relevant to given filter key:
          filterValue = (0, _graphqlUtilities.valueFromAST)(valueAST, filterInputObjectDefinition, args);
          validationResults = (0, _graphqlUtilities.isValidJSValue)(filterValue, filterInputObjectDefinition);

          if (!validationResults.length) {
            context$2$0.next = 34;
            break;
          }

          throw new _graphqlError.GraphQLError('Filter validation failed:\n' + validationResults.join('\n'));

        case 34:
          if ((0, _jsutilsAtMostOneOf2['default'])(orderBy, order)) {
            context$2$0.next = 36;
            break;
          }

          throw new _graphqlError.GraphQLError('Connection cannot specify more than one order.');

        case 36:
          orderValue = null;

          if (!orderBy) {
            context$2$0.next = 41;
            break;
          }

          orderValue = orderBy;
          context$2$0.next = 48;
          break;

        case 41:
          if (!order) {
            context$2$0.next = 48;
            break;
          }

          valueAST = {
            kind: _graphqlLanguage.Kind.LIST,
            values: orderExpressions[order]
          };
          orderListType = new _graphql.GraphQLList(orderInputObjectDefinition);

          orderValue = (0, _graphqlUtilities.valueFromAST)(valueAST, orderListType);
          validationResults = (0, _graphqlUtilities.isValidJSValue)(orderValue, orderListType);

          if (!validationResults.length) {
            context$2$0.next = 48;
            break;
          }

          throw new _graphqlError.GraphQLError('Order validation failed:\n' + validationResults.join('\n'));

        case 48:
          mongoFilter = filterValue ? filterBuilder(filterValue) : null;
          mongoSort = orderValue ? orderBuilder(orderValue) : null;
          filterStages = [].concat(_toConsumableArray(InitialStages(id)), _toConsumableArray(mongoFilter || permFilter.length ? [{
            $match: {
              $and: [mongoFilter ? mongoFilter : {}].concat(_toConsumableArray(permFilter.length ? permFilter : [{}]))
            }
          }] : []));

          if (!(!(0, _jsutilsIsNullish2['default'])(first) && first <= 0)) {
            context$2$0.next = 53;
            break;
          }

          throw new _graphqlError.GraphQLError('Argument "first" has invalid value ' + first + '.\n' + ('Expected a positive integer, found ' + first + '.'));

        case 53:
          if (!(!(0, _jsutilsIsNullish2['default'])(last) && last <= 0)) {
            context$2$0.next = 55;
            break;
          }

          throw new _graphqlError.GraphQLError('Argument "last" has invalid value ' + last + '.\n' + ('Expected a positive integer, found ' + last + '.'));

        case 55:
          lengthStages = filterStages.concat({ $group: { _id: null, length: { $sum: 1 } } });
          context$2$0.next = 58;
          return _regeneratorRuntime.awrap(db.collection(collection, readOptions).aggregate(lengthStages).toArray());

        case 58:
          lengthResult = context$2$0.sent;
          length = lengthResult && lengthResult[0] && lengthResult[0].length ? lengthResult[0].length : 0;
          _pagingBuilder = (0, _pagingBuilder2.pagingBuilder)(pagingArgs, length);
          skipOffset = _pagingBuilder.skipOffset;
          pgStages = _pagingBuilder.stages;
          edgeStages = filterStages.concat(mongoSort && _Object$keys(mongoSort).length ? [{ $sort: mongoSort }] : []).concat(pgStages);
          aggregations = (0, _common.extractAggregations)(fieldASTs, aggFieldDefinitions, variableValues);
          aggregationStages = aggregations.length ? [].concat(_toConsumableArray(filterStages), [(0, _aggregationBuilder.aggregationBuilder)(kind, aggregations, countFilterBuilder, filterConditions, filterInputObjectDefinition)]) : [];
          context$2$0.next = 68;
          return _regeneratorRuntime.awrap(_Promise.all([db.collection(collection, readOptions).aggregate(edgeStages).toArray()].concat(_toConsumableArray(aggregations.length ? [db.collection(collection, readOptions).aggregate(aggregationStages).toArray()] : []))));

        case 68:
          _ref2 = context$2$0.sent;
          _ref22 = _slicedToArray(_ref2, 2);
          edgeData = _ref22[0];
          aggregationData = _ref22[1];
          aggregationValues = {};

          if (aggregationData && aggregationData.length) {
            delete aggregationData[0]._id;
            aggregationValues = aggregationData[0];
          }

          edges = edgeData.map(function (obj, index) {
            return _extends({
              cursor: (0, _common.offsetToCursor)(skipOffset + index)
            }, obj.edgeProps || {}, {
              node: obj.node
            });
          });
          firstEdge = edges[0];
          lastEdge = edges[edges.length - 1];
          hasPreviousPage = !(0, _jsutilsIsNullish2['default'])(last) ? skipOffset !== 0 : false;
          hasNextPage = !(0, _jsutilsIsNullish2['default'])(first) ? skipOffset + edges.length < length : false;
          startCursor = firstEdge ? firstEdge.cursor : null;
          endCursor = lastEdge ? lastEdge.cursor : null;
          return context$2$0.abrupt('return', _extends({}, aggregationValues, {
            edges: edges,
            pageInfo: { hasPreviousPage: hasPreviousPage, hasNextPage: hasNextPage, startCursor: startCursor, endCursor: endCursor }
          }));

        case 82:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}

// construct permissions filter for node connections:

// need length of the result set to satisfy Relay spec that before / after
// arguments with invalid cursor (< 0 or >= length) are ignored.
// TODO: explore alternatives to another aggregation query to get the count