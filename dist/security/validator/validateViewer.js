'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateViewer = validateViewer;

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

function validateViewer(context, viewerType) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateViewerId.');
  var func = context['function'];

  (0, _jsutilsInvariant2['default'])(func, 'must pass function to context of validateViewer.');

  var results = (0, _jsutilsIsNullish2['default'])(viewerType) || !viewerType ? ['Schema must define @rootViewer for ' + func + ' to be invoked.'] : [];

  return { context: context, results: results };
}