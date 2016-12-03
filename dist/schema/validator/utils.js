'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.error = error;
exports.warning = warning;
exports.rootQueryFieldNames = rootQueryFieldNames;

var _jsutilsCasing = require('../../jsutils/casing');

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _analyzer = require('../analyzer');

function error(template) {
  for (var _len = arguments.length, vs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    vs[_key - 1] = arguments[_key];
  }

  var loc = vs.filter(function (v) {
    return typeof v === 'object' && (!v || v.kind === 'location');
  })[0];
  var values = vs.map(function (v) {
    return typeof v === 'object' && (!v || v.kind === 'location') ? '' : v;
  });

  return { kind: 'error', description: _jsutilsStrip2['default'].apply(undefined, [template].concat(_toConsumableArray(values))).trim(), loc: loc };
}

function warning(template) {
  for (var _len2 = arguments.length, vs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    vs[_key2 - 1] = arguments[_key2];
  }

  var loc = vs.filter(function (v) {
    return typeof v === 'object' && (!v || v.kind === 'location');
  })[0];
  var values = vs.map(function (v) {
    return typeof v === 'object' && (!v || v.kind === 'location') ? '' : v;
  });

  return { kind: 'warning', description: _jsutilsStrip2['default'].apply(undefined, [template].concat(_toConsumableArray(values))).trim(), loc: loc };
}

function rootQueryFieldNames(schema) {
  var getFieldValue = function getFieldValue(directive) {
    return directive.arguments.filter(function (a) {
      return a.name === 'field';
    }).map(function (a) {
      return a.value;
    })[0];
  };

  var rootConnectionFieldNames = (0, _analyzer.rootConnectionDirectives)(schema).map(function (directive) {
    return String(getFieldValue(directive));
  });

  var rootPluralIdFieldNames = (0, _analyzer.rootPluralIdDirectives)(schema).map(function (directive) {
    return String(directive.arguments[0].value);
  });

  var implicitRootPluralIdFieldNames = (0, _analyzer.implicitRootPluralIdTypes)(schema).map(function (type) {
    return (0, _jsutilsCasing.camelCase)(type.name);
  });

  var viewerFieldName = (0, _analyzer.rootViewerDirectives)(schema).map(function (directive) {
    return String(directive.arguments[0].value);
  });

  return ['node'].concat(_toConsumableArray(viewerFieldName), _toConsumableArray(implicitRootPluralIdFieldNames), _toConsumableArray(rootConnectionFieldNames), _toConsumableArray(rootPluralIdFieldNames));
}