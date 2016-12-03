'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ViewerField = ViewerField;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _common = require('../common');

function ViewerField(_ref) {
  var typeName = _ref.typeName;

  return function callee$1$0(parent, args, info) {
    var rootValue, db, config, viewerId, readOptions, data;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          rootValue = info.rootValue;
          db = rootValue.db;
          config = rootValue.config;
          viewerId = rootValue.viewerId;
          readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;

          if (viewerId) {
            context$2$0.next = 7;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 7:
          if (!(typeName !== (0, _jsutilsGlobalId.typeFromGlobalId)(viewerId))) {
            context$2$0.next = 9;
            break;
          }

          throw new Error('Type of viewerId does not match declared viewer type.');

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(db.collection(typeName, readOptions).findOne({ _id: viewerId }));

        case 11:
          data = context$2$0.sent;
          return context$2$0.abrupt('return', data || null);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}