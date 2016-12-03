'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ScalarList = ScalarList;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsAtMostOneOf = require('../../../jsutils/atMostOneOf');

var _jsutilsAtMostOneOf2 = _interopRequireDefault(_jsutilsAtMostOneOf);

var _ListFilter = require('./ListFilter');

var _ListOrder = require('./ListOrder');

var _schemaAnalyzer = require('../../../schema/analyzer');

var _graphqlError = require('graphql/error');

var _graphqlUtilities = require('graphql/utilities');

function ScalarList(_ref) {
  var schema = _ref.schema;
  var typeName = _ref.typeName;
  var field = _ref.field;
  var filterInputObjectDefinition = _ref.filterInputObjectDefinition;

  var isScalarType = _schemaAnalyzer.SCALAR_TYPES.includes(typeName) || schema[typeName] && schema[typeName].kind === 'enum';
  (0, _jsutilsInvariant2['default'])(isScalarType, 'scalar type must be passed to resolver');

  var filterName = 'Filter#[' + typeName + ']';
  var filterConditions = schema[filterName] ? schema[filterName].conditions.reduce(function (acc, cond) {
    return _extends({}, acc, _defineProperty({}, cond.key, cond.conditionAST));
  }, {}) : {};

  var filterList = (0, _ListFilter.ListFilter)({ schema: schema, typeName: typeName });
  var orderList = (0, _ListOrder.ListOrder)({ schema: schema, typeName: typeName });

  return function callee$1$0(parent, args) {
    var first, last, filterBy, filter, orderBy, aggregate, scalars, list, filterValue, valueAST, validationResults;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          first = args.first;
          last = args.last;
          filterBy = args.filterBy;
          filter = args.filter;
          orderBy = args.orderBy;
          aggregate = args.aggregate;
          scalars = parent[field];

          if (scalars) {
            context$2$0.next = 9;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 9:
          if (scalars.length) {
            context$2$0.next = 11;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 11:
          list = [].concat(_toConsumableArray(scalars));

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
          list = orderBy ? orderList(orderBy, list) : list;
          list = first ? list.slice(0, first) : list;
          list = last ? list.slice(-last) : list;
          list = aggregate === 'SUM' ? [list.reduce(function (acc, item) {
            return acc + item;
          }, 0)] : aggregate === 'COUNT' ? [list.length] : aggregate === 'MIN' ? [list.slice(1).reduce(function (acc, item) {
            return item < acc ? item : acc;
          }, list[0])] : aggregate === 'MAX' ? [list.slice(1).reduce(function (acc, item) {
            return item > acc ? item : acc;
          }, list[0])] : aggregate === 'AVERAGE' ? [list.reduce(function (acc, item) {
            return acc + item;
          }, 0) / list.length] : list;

          return context$2$0.abrupt('return', list);

        case 31:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}