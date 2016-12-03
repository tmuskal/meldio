'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hooks = require('./hooks');

var hooks = _interopRequireWildcard(_hooks);

exports.hooks = hooks;

var _eslintrc = require('./eslintrc');

Object.defineProperty(exports, 'eslintrc', {
  enumerable: true,
  get: function get() {
    return _eslintrc.eslintrc;
  }
});

var _gitignore = require('./gitignore');

Object.defineProperty(exports, 'gitignore', {
  enumerable: true,
  get: function get() {
    return _gitignore.gitignore;
  }
});

var _permissions = require('./permissions');

Object.defineProperty(exports, 'permissions', {
  enumerable: true,
  get: function get() {
    return _permissions.permissions;
  }
});

var _schema = require('./schema');

Object.defineProperty(exports, 'schema', {
  enumerable: true,
  get: function get() {
    return _schema.schema;
  }
});