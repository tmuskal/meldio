'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Auth = Auth;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _common = require('../common');

function Auth(context) {
  var db = context.db;
  var config = context.config;

  (0, _jsutilsInvariant2['default'])(db, 'Must pass database connection to Auth context.');
  (0, _jsutilsInvariant2['default'])(config, 'Must pass config to Auth context.');

  var readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;
  var writeOptions = _common.DEFAULT_WRITE_OPTIONS;

  var mongoToNodeId = function mongoToNodeId(mongoObject) {
    var node = _extends({ id: mongoObject._id }, mongoObject);
    delete node._id;
    return node;
  };

  return {
    addAuthProvider: function addAuthProvider(obj) {
      var result;
      return _regeneratorRuntime.async(function addAuthProvider$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            (0, _jsutilsInvariant2['default'])(obj, 'Must pass object to addAuthProvider resolver.');
            (0, _jsutilsInvariant2['default'])(obj.viewerId && typeof obj.viewerId === 'string', 'Must pass object with viewerId to addAuthProvider resolver.');
            (0, _jsutilsInvariant2['default'])(obj.provider && typeof obj.provider === 'string', 'Must pass object with provider to addAuthProvider resolver.');
            (0, _jsutilsInvariant2['default'])(obj.providerId && typeof obj.providerId === 'string', 'Must pass object with providerId to addAuthProvider resolver.');

            obj._id = (0, _jsutilsGlobalId.newGlobalId)(_common.AUTH_PROVIDER_COLLECTION);
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(db.collection(_common.AUTH_PROVIDER_COLLECTION).insertOne(obj, writeOptions));

          case 7:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result.insertedId === obj._id);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    getAuthProvider: function getAuthProvider(condition) {
      var result;
      return _regeneratorRuntime.async(function getAuthProvider$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            (0, _jsutilsInvariant2['default'])(condition, 'Must pass condition to getAuthProvider resolver.');

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(db.collection(_common.AUTH_PROVIDER_COLLECTION, readOptions).find(condition).map(mongoToNodeId).toArray());

          case 3:
            result = context$2$0.sent;

            if (!result.length) {
              context$2$0.next = 6;
              break;
            }

            return context$2$0.abrupt('return', result[0]);

          case 6:
            return context$2$0.abrupt('return', null);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    deleteAuthProviders: function deleteAuthProviders(condition) {
      var result;
      return _regeneratorRuntime.async(function deleteAuthProviders$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            (0, _jsutilsInvariant2['default'])(condition, 'Must pass condition to deleteAuthProviders resolver.');

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(db.collection(_common.AUTH_PROVIDER_COLLECTION).deleteMany(condition, writeOptions));

          case 3:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result.deletedCount);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    updateAuthProvider: function updateAuthProvider(condition, update) {
      var result;
      return _regeneratorRuntime.async(function updateAuthProvider$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            (0, _jsutilsInvariant2['default'])(condition, 'Must pass condition to updateAuthProvider resolver.');
            (0, _jsutilsInvariant2['default'])(update, 'Must pass update to updateAuthProvider resolver.');

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection(_common.AUTH_PROVIDER_COLLECTION).updateOne(condition, { $set: update }, writeOptions));

          case 4:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result.result && result.result.ok === 1 && result.matchedCount === 1);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  };
}