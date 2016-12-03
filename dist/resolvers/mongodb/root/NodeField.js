'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NodeField = NodeField;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _common = require('../common');

var _jsutilsValues = require('../../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

function NodeField(_ref) {
  var schema = _ref.schema;

  var nodeTypes = new _Set((0, _jsutilsValues2['default'])(schema).filter(function (type) {
    return type.kind === 'type' && type.implementsNode;
  }).map(function (node) {
    return node.name;
  }));

  return function callee$1$0(parent, args, info) {
    var rootValue, db, config, readOptions, typeName, filter, data;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          rootValue = info.rootValue;
          db = rootValue.db;
          config = rootValue.config;
          readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;

          if (args.id) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 6:
          typeName = (0, _jsutilsGlobalId.typeFromGlobalId)(args.id);

          if (nodeTypes.has(typeName)) {
            context$2$0.next = 9;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap((0, _common.permissionFilter)(schema, rootValue, typeName));

        case 11:
          filter = context$2$0.sent;

          if (filter) {
            context$2$0.next = 14;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 14:
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap(db.collection(typeName, readOptions).findOne({
            $and: [].concat(_toConsumableArray(filter), [{ _id: args.id }]) }));

        case 16:
          data = context$2$0.sent;
          return context$2$0.abrupt('return', data || null);

        case 18:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}