'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Node = Node;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _common = require('../common');

function Node(_ref) {
  var schema = _ref.schema;
  var field = _ref.field;

  (0, _jsutilsInvariant2['default'])(field, 'field must be passed to resolver');

  return function callee$1$0(parent, args, info) {
    var rootValue, db, config, readOptions, id, type, filter, result;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          rootValue = info.rootValue;
          db = rootValue.db;
          config = rootValue.config;
          readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;

          if (parent[field]) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 6:
          id = parent[field];
          type = (0, _jsutilsGlobalId.typeFromGlobalId)(id);

          if (type) {
            context$2$0.next = 10;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap((0, _common.permissionFilter)(schema, rootValue, type));

        case 12:
          filter = context$2$0.sent;

          if (filter) {
            context$2$0.next = 15;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 15:
          context$2$0.next = 17;
          return _regeneratorRuntime.awrap(db.collection(type, readOptions).findOne({
            $and: [].concat(_toConsumableArray(filter), [{ _id: id }])
          }));

        case 17:
          result = context$2$0.sent;
          return context$2$0.abrupt('return', result);

        case 19:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}