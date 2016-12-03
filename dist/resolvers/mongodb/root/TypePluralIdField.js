'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.TypePluralIdField = TypePluralIdField;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _common = require('../common');

function TypePluralIdField(_ref2) {
  var schema = _ref2.schema;
  var name = _ref2.name;
  var field = _ref2.field;

  var type = schema[name];
  (0, _jsutilsInvariant2['default'])(type && type.kind === 'type', 'type must be passed to resolver');
  (0, _jsutilsInvariant2['default'])(field, 'field must be passed to resolver');

  return function callee$1$0(parent, args, info) {
    var rootValue, db, config, readOptions, ids, filter, query, results, resultsMap;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          rootValue = info.rootValue;
          db = rootValue.db;
          config = rootValue.config;
          readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;

          if (!(!args[field] || !args[field].length)) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 6:
          ids = field === 'id' ? [].concat(args[field]).filter(function (id) {
            return (0, _jsutilsGlobalId.typeFromGlobalId)(id) === type.name;
          }) : [].concat(args[field]);
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap((0, _common.permissionFilter)(schema, rootValue, type.name));

        case 9:
          filter = context$2$0.sent;

          if (filter) {
            context$2$0.next = 12;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 12:
          query = { $and: [].concat(_toConsumableArray(filter), [_defineProperty({}, field === 'id' ? '_id' : field, ids.length === 1 ? ids[0] : { $in: ids })]) };
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(db.collection(type.name, readOptions).find(query).toArray());

        case 15:
          results = context$2$0.sent;
          resultsMap = results.reduce(function (acc, result) {
            return _extends({}, acc, _defineProperty({}, result[field === 'id' ? '_id' : field], result));
          }, {});
          return context$2$0.abrupt('return', args[field].map(function (val) {
            return resultsMap[val] || null;
          }));

        case 18:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}

// Relay requires each plural identifying root field to return results in
// the same order as specified in the argument list and null if not found: