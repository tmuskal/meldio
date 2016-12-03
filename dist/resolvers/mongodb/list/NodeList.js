'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NodeList = NodeList;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _jsutilsKeyMap = require('../../../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _jsutilsAtMostOneOf = require('../../../jsutils/atMostOneOf');

var _jsutilsAtMostOneOf2 = _interopRequireDefault(_jsutilsAtMostOneOf);

var _common = require('../common');

var _ListFilter = require('./ListFilter');

var _ListOrder = require('./ListOrder');

var _graphqlLanguage = require('graphql/language');

var _graphqlError = require('graphql/error');

var _graphql = require('graphql');

var _graphqlUtilities = require('graphql/utilities');

function NodeList(_ref) {
  var schema = _ref.schema;
  var typeName = _ref.typeName;
  var field = _ref.field;
  var filterInputObjectDefinition = _ref.filterInputObjectDefinition;
  var orderInputObjectDefinition = _ref.orderInputObjectDefinition;

  var type = schema[typeName];
  (0, _jsutilsInvariant2['default'])(type, 'type must be passed to resolver');

  var filterName = 'Filter#[' + typeName + ']';
  var filterConditions = schema[filterName] ? schema[filterName].conditions.reduce(function (acc, cond) {
    return _extends({}, acc, _defineProperty({}, cond.key, cond.conditionAST));
  }, {}) : {};

  var orderName = 'Order#[' + typeName + ']';
  var orderExpressions = schema[orderName] ? schema[orderName].expressions.reduce(function (acc, exp) {
    return _extends({}, acc, _defineProperty({}, exp.key, exp.expressionASTs));
  }, {}) : {};

  var typeNames = type.kind === 'type' ? [type.name] : type.kind === 'union' ? type.typeNames : type.kind === 'interface' ? type.implementations : [];
  (0, _jsutilsInvariant2['default'])(typeNames.length, 'union or interface must have implementations');

  var filterList = (0, _ListFilter.ListFilter)({ schema: schema, typeName: typeName });
  var orderList = (0, _ListOrder.ListOrder)({ schema: schema, typeName: typeName });

  return function callee$1$0(parent, args, info) {
    var rootValue, db, config, first, last, filterBy, filter, orderBy, order, readOptions, ids, idMap, queries, results, resultsMap, list, filterValue, valueAST, validationResults, orderValue, orderListType;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          rootValue = info.rootValue;
          db = rootValue.db;
          config = rootValue.config;
          first = args.first;
          last = args.last;
          filterBy = args.filterBy;
          filter = args.filter;
          orderBy = args.orderBy;
          order = args.order;
          readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;
          ids = parent[field];

          if (ids) {
            context$2$0.next = 13;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 13:
          if (ids.length) {
            context$2$0.next = 15;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 15:
          idMap = ids.filter(function (id) {
            return (0, _jsutilsGlobalId.isGlobalId)(id);
          }).reduce(function (acc, id) {
            return typeNames.includes((0, _jsutilsGlobalId.typeFromGlobalId)(id)) ? _extends({}, acc, _defineProperty({}, (0, _jsutilsGlobalId.typeFromGlobalId)(id), (acc[(0, _jsutilsGlobalId.typeFromGlobalId)(id)] || []).concat(id))) : acc;
          }, {});

          if (_Object$keys(idMap).length) {
            context$2$0.next = 18;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 18:
          queries = _Object$keys(idMap).map(function callee$2$0(coll) {
            var permFilter, query;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _common.permissionFilter)(schema, rootValue, coll));

                case 2:
                  permFilter = context$3$0.sent;

                  if (permFilter) {
                    context$3$0.next = 5;
                    break;
                  }

                  return context$3$0.abrupt('return', []);

                case 5:
                  query = {
                    $and: [].concat(_toConsumableArray(permFilter), [{
                      _id: idMap[coll].length === 1 ? idMap[coll][0] : { $in: idMap[coll] }
                    }]) };
                  return context$3$0.abrupt('return', db.collection(coll, readOptions).find(query).toArray());

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap(_Promise.all(queries));

        case 21:
          results = context$2$0.sent;
          resultsMap = (0, _jsutilsKeyMap2['default'])((0, _jsutilsFlatten22['default'])(results), function (res) {
            return res._id;
          });
          list = ids.map(function (id) {
            return resultsMap[id] || null;
          });

          if ((0, _jsutilsAtMostOneOf2['default'])(filterBy, filter)) {
            context$2$0.next = 26;
            break;
          }

          throw new _graphqlError.GraphQLError('List cannot specify more than one filter.');

        case 26:
          filterValue = null;

          if (!filterBy) {
            context$2$0.next = 31;
            break;
          }

          filterValue = filterBy;
          context$2$0.next = 37;
          break;

        case 31:
          if (!filter) {
            context$2$0.next = 37;
            break;
          }

          valueAST = filterConditions[filter];

          // TODO: pass only args relevant to given filter key:
          filterValue = (0, _graphqlUtilities.valueFromAST)(valueAST, filterInputObjectDefinition, args);
          validationResults = (0, _graphqlUtilities.isValidJSValue)(filterValue, filterInputObjectDefinition);

          if (!validationResults.length) {
            context$2$0.next = 37;
            break;
          }

          throw new _graphqlError.GraphQLError('List filter validation failed:\n' + validationResults.join('\n'));

        case 37:
          list = filterValue ? filterList(filterValue, list) : list;

          if ((0, _jsutilsAtMostOneOf2['default'])(orderBy, order)) {
            context$2$0.next = 40;
            break;
          }

          throw new _graphqlError.GraphQLError('List cannot specify more than one order.');

        case 40:
          orderValue = null;

          if (!orderBy) {
            context$2$0.next = 45;
            break;
          }

          orderValue = orderBy;
          context$2$0.next = 52;
          break;

        case 45:
          if (!order) {
            context$2$0.next = 52;
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
            context$2$0.next = 52;
            break;
          }

          throw new _graphqlError.GraphQLError('List order validation failed:\n' + validationResults.join('\n'));

        case 52:
          list = orderValue ? orderList(orderValue, list) : list;

          list = first ? list.slice(0, first) : list;
          list = last ? list.slice(-last) : list;

          return context$2$0.abrupt('return', list);

        case 56:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}