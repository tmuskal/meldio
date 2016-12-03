'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateString = validateString;

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

function validateString(context, value) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateString.');
  var func = context['function'];
  var parameter = context.parameter;

  (0, _jsutilsInvariant2['default'])(func, 'must pass function to context of validateString.');
  (0, _jsutilsInvariant2['default'])(parameter, 'must pass parameter to context of validateString.');

  var results = !(0, _jsutilsIsNullish2['default'])(value) && typeof value !== 'string' ? ['Parameter ' + parameter + ' of ' + func + ' must be a string.'] : [];

  return { context: context, results: results };
}