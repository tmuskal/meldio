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
exports.UnionPluralIdField = UnionPluralIdField;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _common = require('../common');

function UnionPluralIdField(_ref) {
  var schema = _ref.schema;
  var name = _ref.name;

  var union = schema[name];
  (0, _jsutilsInvariant2['default'])(union && union.kind === 'union', 'union must be passed to resolver');

  return function callee$1$0(parent, args, info) {
    var rootValue, db, config, readOptions, idMap, queries, results, resultsMap;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          rootValue = info.rootValue;
          db = rootValue.db;
          config = rootValue.config;
          readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;

          if (!(!args.id || !args.id.length)) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', []);

        case 6:
          idMap = args.id.reduce(function (acc, id) {
            return union.typeNames.includes((0, _jsutilsGlobalId.typeFromGlobalId)(id)) ? _extends({}, acc, _defineProperty({}, (0, _jsutilsGlobalId.typeFromGlobalId)(id), (acc[(0, _jsutilsGlobalId.typeFromGlobalId)(id)] || []).concat(id))) : acc;
          }, {});
          queries = _Object$keys(idMap).map(function callee$2$0(typeName) {
            var filter, query;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _common.permissionFilter)(schema, rootValue, typeName));

                case 2:
                  filter = context$3$0.sent;

                  if (filter) {
                    context$3$0.next = 5;
                    break;
                  }

                  return context$3$0.abrupt('return', []);

                case 5:
                  query = { $and: [].concat(_toConsumableArray(filter), [{
                      _id: idMap[typeName].length === 1 ? idMap[typeName][0] : { $in: idMap[typeName] }
                    }]) };
                  return context$3$0.abrupt('return', db.collection(typeName, readOptions).find(query).toArray());

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(_Promise.all(queries));

        case 10:
          results = context$2$0.sent;
          resultsMap = (0, _jsutilsFlatten22['default'])(results).reduce(function (acc, result) {
            return _extends({}, acc, _defineProperty({}, result._id, result));
          }, {});
          return context$2$0.abrupt('return', args.id.map(function (id) {
            return resultsMap[id] || null;
          }));

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}

// Relay requires each plural identifying root field to return results in
// the same order as specified in the argument list and null if not found: