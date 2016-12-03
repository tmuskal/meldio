'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ObjectList = ObjectList;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsAtMostOneOf = require('../../../jsutils/atMostOneOf');

var _jsutilsAtMostOneOf2 = _interopRequireDefault(_jsutilsAtMostOneOf);

var _ListFilter = require('./ListFilter');

var _ListOrder = require('./ListOrder');

var _graphqlLanguage = require('graphql/language');

var _graphqlError = require('graphql/error');

var _graphql = require('graphql');

var _graphqlUtilities = require('graphql/utilities');

function ObjectList(_ref) {
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

  var filterList = (0, _ListFilter.ListFilter)({ schema: schema, typeName: typeName });
  var orderList = (0, _ListOrder.ListOrder)({ schema: schema, typeName: typeName });

  return function callee$1$0(parent, args) {
    var first, last, filterBy, filter, orderBy, order, objects, list, filterValue, valueAST, validationResults, orderValue, orderListType;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          first = args.first;
          last = args.last;
          filterBy = args.filterBy;
          filter = args.filter;
          orderBy = args.orderBy;
          order = args.order;
          objects = parent[field];

          if (objects) {
            context$2$0.next = 9;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 9:
          if (objects.length) {
            context$2$0.next = 11;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 11:
          list = [].concat(_toConsumableArray(objects));

          if ((0, _jsutilsAtMostOneOf2['default'])(filterBy, filter)) {
            context$2$0.next = 14;
            break;
          }

          throw new _graphqlError.GraphQLError('List cannot specify more than one filter.');

        case 14:
          filterValue = null;

          if (!filterBy) {
            context$2$0.next = 19;
            break;
          }

          filterValue = filterBy;
          context$2$0.next = 25;
          break;

        case 19:
          if (!filter) {
            context$2$0.next = 25;
            break;
          }

          valueAST = filterConditions[filter];

          // TODO: pass only args relevant to given filter key:
          filterValue = (0, _graphqlUtilities.valueFromAST)(valueAST, filterInputObjectDefinition, args);
          validationResults = (0, _graphqlUtilities.isValidJSValue)(filterValue, filterInputObjectDefinition);

          if (!validationResults.length) {
            context$2$0.next = 25;
            break;
          }

          throw new _graphqlError.GraphQLError('List filter validation failed:\n' + validationResults.join('\n'));

        case 25:
          list = filterValue ? filterList(filterValue, list) : list;

          if ((0, _jsutilsAtMostOneOf2['default'])(orderBy, order)) {
            context$2$0.next = 28;
            break;
          }

          throw new _graphqlError.GraphQLError('List cannot specify more than one order.');

        case 28:
          orderValue = null;

          if (!orderBy) {
            context$2$0.next = 33;
            break;
          }

          orderValue = orderBy;
          context$2$0.next = 40;
          break;

        case 33:
          if (!order) {
            context$2$0.next = 40;
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
            context$2$0.next = 40;
            break;
          }

          throw new _graphqlError.GraphQLError('List order validation failed:\n' + validationResults.join('\n'));

        case 40:
          list = orderValue ? orderList(orderValue, list) : list;

          list = first ? list.slice(0, first) : list;
          list = last ? list.slice(-last) : list;

          return context$2$0.abrupt('return', list);

        case 44:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}