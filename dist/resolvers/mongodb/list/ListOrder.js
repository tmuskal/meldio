'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ListOrder = ListOrder;

var _jsutilsIsNullish = require('../../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _schemaAnalyzer = require('../../../schema/analyzer');

function ListOrder(_ref) {
  var schema = _ref.schema;
  var typeName = _ref.typeName;

  var isScalar = _schemaAnalyzer.SCALAR_TYPES.includes(typeName) || schema[typeName] && schema[typeName].kind === 'enum';
  if (isScalar) {
    return function (order, list) {
      var nullishValues = list.filter(function (item) {
        return (0, _jsutilsIsNullish2['default'])(item);
      });
      var sortedWithoutNullish = list.filter(function (item) {
        return !(0, _jsutilsIsNullish2['default'])(item);
      });
      /* eslint no-implicit-coercion: 0 */
      if (order === 'DESCENDING') {
        sortedWithoutNullish.sort(function (a, b) {
          return -(+(a > b) || +(a === b) - 1);
        });
      } else {
        sortedWithoutNullish.sort(function (a, b) {
          return +(a > b) || +(a === b) - 1;
        });
      }
      return nullishValues.concat(sortedWithoutNullish);
    };
  }
  return function (order, list) {
    var sortOrder = order.reduce(function (acc, o) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(_Object$keys(o).map(function (field) {
        return [field, o[field]];
      })));
    }, []);

    return list.sort(function (a, b) {
      return evalOrder(a, b, sortOrder, 0);
    });
  };

  function evalOrder(_x, _x2, _x3, _x4) {
    var _again = true;

    _function: while (_again) {
      var a = _x,
          b = _x2,
          sortOrder = _x3,
          depth = _x4;
      _again = false;

      if (depth >= sortOrder.length) {
        return 0;
      }

      var _sortOrder$depth = _slicedToArray(sortOrder[depth], 2);

      var fieldName = _sortOrder$depth[0];
      var order = _sortOrder$depth[1];

      if (a[fieldName] < b[fieldName]) {
        return order === 'DESCENDING' ? +1 : -1;
      } else if (a[fieldName] > b[fieldName]) {
        return order === 'DESCENDING' ? -1 : +1;
      }
      _x = a;
      _x2 = b;
      _x3 = sortOrder;
      _x4 = depth + 1;
      _again = true;
      _sortOrder$depth = fieldName = order = undefined;
      continue _function;
    }
  }
}