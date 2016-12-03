'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateViewerId = validateViewerId;

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsGlobalId = require('../../jsutils/globalId');

function validateViewerId(context, id) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateViewerId.');
  var func = context['function'];
  var viewerType = context.viewerType;

  (0, _jsutilsInvariant2['default'])(func, 'must pass function to context of validateViewerId.');

  var results = (0, _jsutilsIsNullish2['default'])(viewerType) ? [] : (0, _jsutilsIsNullish2['default'])(id) ? ['Must pass a viewerId to ' + func + '.'] : !(0, _jsutilsGlobalId.isGlobalId)(id) ? ['viewerId passed to ' + func + ' is invalid.'] : (0, _jsutilsGlobalId.typeFromGlobalId)(id) !== viewerType ? ['viewerId passed to ' + func + ' must be of type "' + viewerType + '".'] : [];

  return { context: context, results: results };
}