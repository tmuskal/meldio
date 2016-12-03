'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _connect = require('./connect');

Object.defineProperty(exports, 'connect', {
  enumerable: true,
  get: function get() {
    return _connect.connect;
  }
});

var _context = require('./context');

Object.defineProperty(exports, 'makeMutationContext', {
  enumerable: true,
  get: function get() {
    return _context.makeMutationContext;
  }
});
Object.defineProperty(exports, 'makeHookContext', {
  enumerable: true,
  get: function get() {
    return _context.makeHookContext;
  }
});
Object.defineProperty(exports, 'makePermissionContext', {
  enumerable: true,
  get: function get() {
    return _context.makePermissionContext;
  }
});

var _definitions = require('./definitions');

Object.defineProperty(exports, 'EDGE_COLLECTION', {
  enumerable: true,
  get: function get() {
    return _definitions.EDGE_COLLECTION;
  }
});
Object.defineProperty(exports, 'AUTH_PROVIDER_COLLECTION', {
  enumerable: true,
  get: function get() {
    return _definitions.AUTH_PROVIDER_COLLECTION;
  }
});
Object.defineProperty(exports, 'MAJORITY_READ_OPTIONS', {
  enumerable: true,
  get: function get() {
    return _definitions.MAJORITY_READ_OPTIONS;
  }
});
Object.defineProperty(exports, 'LOCAL_READ_OPTIONS', {
  enumerable: true,
  get: function get() {
    return _definitions.LOCAL_READ_OPTIONS;
  }
});
Object.defineProperty(exports, 'DEFAULT_WRITE_OPTIONS', {
  enumerable: true,
  get: function get() {
    return _definitions.DEFAULT_WRITE_OPTIONS;
  }
});

var _Filters = require('./Filters');

Object.defineProperty(exports, 'Filters', {
  enumerable: true,
  get: function get() {
    return _Filters.Filters;
  }
});

var _IsTypeOf = require('./IsTypeOf');

Object.defineProperty(exports, 'IsTypeOf', {
  enumerable: true,
  get: function get() {
    return _IsTypeOf.IsTypeOf;
  }
});

var _permissionFilter = require('./permissionFilter');

Object.defineProperty(exports, 'permissionFilter', {
  enumerable: true,
  get: function get() {
    return _permissionFilter.permissionFilter;
  }
});

var _ResolveType = require('./ResolveType');

Object.defineProperty(exports, 'ResolveType', {
  enumerable: true,
  get: function get() {
    return _ResolveType.ResolveType;
  }
});

var _Updates = require('./Updates');

Object.defineProperty(exports, 'Updates', {
  enumerable: true,
  get: function get() {
    return _Updates.Updates;
  }
});