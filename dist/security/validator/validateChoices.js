'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateChoices = validateChoices;

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

function validateChoices(context, value) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateChoices.');
  var func = context['function'];
  var parameter = context.parameter;
  var choices = context.choices;

  (0, _jsutilsInvariant2['default'])(func, 'must pass function to context of validateChoices.');
  (0, _jsutilsInvariant2['default'])(parameter, 'must pass parameter to context of validateChoices.');
  (0, _jsutilsInvariant2['default'])(choices, 'must pass choices to context of validateChoices.');
  (0, _jsutilsInvariant2['default'])(Array.isArray(choices), 'choices passed to context of validateChoices must be an array.');

  var list = choices.map(function (c) {
    return '"' + c + '"';
  }).join(', ');
  var results = !(0, _jsutilsIsNullish2['default'])(value) && !choices.includes(value) ? ['Parameter ' + parameter + ' of ' + func + ' must be one of: ' + list + '.'] : [];

  return { context: context, results: results };
}