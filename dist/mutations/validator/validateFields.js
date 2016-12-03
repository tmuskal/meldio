'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateFields = validateFields;

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsFlatten2 = require('../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

function validateFields(schema, fields, object, path, options) {
  var _ref = options || {};

  var noConnections = _ref.noConnections;
  var enforceRequired = _ref.enforceRequired;
  var noUndefinedFields = _ref.noUndefinedFields;
  var _ref$prefix = _ref.prefix;
  var prefix = _ref$prefix === undefined ? '' : _ref$prefix;
  var _ref$additionalAllowedFields = _ref.additionalAllowedFields;
  var additionalAllowedFields = _ref$additionalAllowedFields === undefined ? [] : _ref$additionalAllowedFields;
  var _ref$fieldValidator = _ref.fieldValidator;
  var fieldValidator = _ref$fieldValidator === undefined ? function () {
    return true;
  } : _ref$fieldValidator;

  var isConnection = function isConnection(f) {
    return f.isNodeConnection || f.isObjectConnection || f.isScalarConnection;
  };
  var withPath = function withPath(fieldName) {
    return path ? path + '.' + fieldName : fieldName;
  };
  var fieldNames = new _Set(fields.map(function (f) {
    return f.name;
  }).concat(additionalAllowedFields));

  return [].concat(_toConsumableArray(noConnections ? fields.filter(function (f) {
    return !(0, _jsutilsIsNullish2['default'])(object[f.name]) && isConnection(f);
  }).map(function (f) {
    return prefix + ' cannot have a connection field "' + withPath(f.name) + '".';
  }) : []), _toConsumableArray(enforceRequired ? fields.filter(function (f) {
    return (0, _jsutilsIsNullish2['default'])(object[f.name]) && f.isRequired;
  }).map(function (f) {
    return prefix + ' must have a required field "' + withPath(f.name) + '".';
  }) : []), _toConsumableArray(noUndefinedFields ? _Object$keys(object).filter(function (key) {
    return !fieldNames.has(key);
  }).map(function (key) {
    return prefix + ' cannot have an undefined field "' + withPath(key) + '".';
  }) : []), _toConsumableArray((0, _jsutilsFlatten22['default'])(fields.filter(function (f) {
    return !(0, _jsutilsIsNullish2['default'])(object[f.name]) && (!isConnection(f) || !noConnections);
  }).map(function (f) {
    return fieldValidator(schema, f, object[f.name], path, options);
  }).filter(function (res) {
    return res && res.length;
  }))));
}