'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateNumeric = validateNumeric;

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

function validateNumeric(context, value) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateNumeric.');
  var func = context['function'];
  var parameter = context.parameter;

  (0, _jsutilsInvariant2['default'])(func, 'must pass function to context of validateNumeric.');
  (0, _jsutilsInvariant2['default'])(parameter, 'must pass parameter to context of validateNumeric.');

  var results = !(0, _jsutilsIsNullish2['default'])(value) && typeof value !== 'number' ? ['Parameter ' + parameter + ' of ' + func + ' must be a number.'] : [];

  return { context: context, results: results };
}