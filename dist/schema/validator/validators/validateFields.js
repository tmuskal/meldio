'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateFields = validateFields;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _validateDirectives = require('./validateDirectives');

function validateFields(fields, context, parentPath, rules) {
  var path = parentPath + '/field';
  var ruleSet = rules[path] || [];
  return (0, _jsutilsFlatten22['default'])(fields.map(function (field) {
    return (0, _jsutilsFlatten22['default'])(ruleSet.map(function (rule) {
      return rule(_extends({}, context, { field: field })) || [];
    })).concat((0, _validateDirectives.validateDirectives)(field.directives, _extends({}, context, { field: field }), path, rules));
  }));
}