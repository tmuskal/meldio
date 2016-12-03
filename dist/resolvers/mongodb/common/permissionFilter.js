'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.permissionFilter = permissionFilter;

var _mutationsNodes = require('../../../mutations/Nodes');

var _context = require('./context');

var _Filters = require('./Filters');

function permissionFilter(schema, rootValue, typeName, parent) {
  var permissions, config, permissionCtx, filter, mongoFilter;
  return _regeneratorRuntime.async(function permissionFilter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        permissions = rootValue.permissions;
        config = rootValue.config;

        if (!(config.enabledAuth.length === 0)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return', {});

      case 4:
        if (!(!permissions[typeName] || typeof permissions[typeName] !== 'function')) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return', undefined);

      case 6:
        permissionCtx = (0, _context.makePermissionContext)(schema, rootValue, typeName);
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(permissions[typeName].apply(permissionCtx, []));

      case 9:
        filter = context$1$0.sent;

        if (filter instanceof _mutationsNodes.Nodes) {
          context$1$0.next = 12;
          break;
        }

        return context$1$0.abrupt('return', undefined);

      case 12:
        mongoFilter = Array.isArray(filter.filter) ? [{ _id: { $in: filter.filter } }] : (0, _Filters.Filters)({ schema: schema }).objectFilter(filter.filter, typeName, parent || '');
        return context$1$0.abrupt('return', mongoFilter);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}