'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.connect = connect;

var _templateObject = _taggedTemplateLiteral(['Meldio needs MongoDB to run storage engine\n                                ~ that supports majority read concern.'], ['Meldio needs MongoDB to run storage engine\n                                ~ that supports majority read concern.']),
    _templateObject2 = _taggedTemplateLiteral(['Meldio needs MongoDB to run with\n                                     ~ enableMajorityReadConcern enabled.'], ['Meldio needs MongoDB to run with\n                                     ~ enableMajorityReadConcern enabled.']),
    _templateObject3 = _taggedTemplateLiteral(['\n          |\n          | Edit mongod.conf to include the following and restart the mongod\n            ~ process:\n          |\n          |   replication:\n          |      enableMajorityReadConcern: true\n          |\n          | You may also start mongod instance with --enableMajorityReadConcern\n            ~ flag\n          |\n          '], ['\n          |\n          | Edit mongod.conf to include the following and restart the mongod\n            ~ process:\n          |\n          |   replication:\n          |      enableMajorityReadConcern: true\n          |\n          | You may also start mongod instance with --enableMajorityReadConcern\n            ~ flag\n          |\n          ']);

var _mongodb = require('mongodb');

var _jsutilsStrip = require('../../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _definitions = require('./definitions');

var _schemaAnalyzer = require('../../../schema/analyzer');

function connect(config, schema) {
  var dbConnectionUri, committedReads, db, status, info, version, isInvalidVersion, error;
  return _regeneratorRuntime.async(function connect$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        dbConnectionUri = config.dbConnectionUri;
        committedReads = config.committedReads;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_mongodb.MongoClient.connect(dbConnectionUri));

      case 4:
        db = context$1$0.sent;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(db.admin().serverStatus());

      case 7:
        status = context$1$0.sent;
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(db.admin().serverInfo());

      case 10:
        info = context$1$0.sent;
        version = info.versionArray;
        isInvalidVersion = !version || typeof version[0] !== 'number' || typeof version[1] !== 'number' || version[0] < 3 || version[0] === 3 && version[0] < 2;

        if (!isInvalidVersion) {
          context$1$0.next = 17;
          break;
        }

        error = new Error('Meldio requires MongoDB 3.2 or later.');

        error.meldio = true;
        throw error;

      case 17:
        if (!(committedReads && !status.storageEngine.supportsCommittedReads)) {
          context$1$0.next = 21;
          break;
        }

        error = new Error((0, _jsutilsStrip2['default'])(_templateObject));

        error.meldio = true;
        throw error;

      case 21:
        if (!committedReads) {
          context$1$0.next = 37;
          break;
        }

        context$1$0.prev = 22;
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(db.collection('__TEST__', _definitions.MAJORITY_READ_OPTIONS).find({}).toArray());

      case 25:
        context$1$0.next = 37;
        break;

      case 27:
        context$1$0.prev = 27;
        context$1$0.t0 = context$1$0['catch'](22);

        if (!(context$1$0.t0.message && context$1$0.t0.message.startsWith('Majority read concern'))) {
          context$1$0.next = 36;
          break;
        }

        error = new Error((0, _jsutilsStrip2['default'])(_templateObject2));

        error.meldio = true;
        error.details = (0, _jsutilsStrip2['default'])(_templateObject3);
        throw error;

      case 36:
        throw context$1$0.t0;

      case 37:
        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(db.collection('_Edge').createIndexes([{
          name: '_Edge_Node',
          key: { nodeId: 1, nodeField: 1 }
        }, {
          name: '_Edge_Related',
          key: { relatedId: 1, relatedField: 1, nodeId: 1, nodeField: 1 },
          unique: true,
          partialFilterExpression: {
            relatedId: { $exists: true },
            relatedField: { $exists: true }
          }
        }]));

      case 39:
        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(db.collection('_AuthProvider').createIndexes([{
          name: '_AuthProvider_Viewer',
          key: { viewerId: 1 }
        }, {
          name: '_AuthProvider_Provider',
          key: { provider: 1, providerId: 1 },
          unique: true
        }]));

      case 41:
        if (!schema) {
          context$1$0.next = 44;
          break;
        }

        context$1$0.next = 44;
        return _regeneratorRuntime.awrap(_Promise.all((0, _schemaAnalyzer.rootPluralIdDirectives)(schema).map(function (dir) {
          return db.collection(dir.parentTypeName).createIndexes([{
            name: '_' + dir.parentTypeName + '_' + dir.parentFieldName + '_uniqueId',
            key: _defineProperty({}, dir.parentFieldName, 1),
            unique: true
          }]);
        })));

      case 44:
        return context$1$0.abrupt('return', db);

      case 45:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[22, 27]]);
}

// tough to test without mock, not important enough for a mock

// tough to test without mock, not important enough for a mock

// this is actually tested, but for some reason istanbul doesn't pick it
// up on the coverage report, possibly because of nested try/catch

// ensure required indicies exist on _Edge and _AuthProvider collections:

// ensure there is a unique index on each root plural id field: