'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateId = validateId;

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsGlobalId = require('../../jsutils/globalId');

function validateId(context, id) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateId.');
  var func = context['function'];
  var type = context.type;

  var results = (0, _jsutilsIsNullish2['default'])(id) ? ['Must pass an id to ' + context['function'] + '.'] : !(0, _jsutilsGlobalId.isGlobalId)(id) ? ['Id passed to ' + func + ' is invalid.'] : (0, _jsutilsGlobalId.typeFromGlobalId)(id) !== type ? ['Id passed to ' + func + ' must be of type "' + type + '".'] : [];

  return { context: context, results: results };
}