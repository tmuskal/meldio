'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateEdgeUpdate = validateEdgeUpdate;

var _templateObject = _taggedTemplateLiteral(['Edge properties cannot be updated because connection\n             ~ defined in "', '" field does not specify edge props.'], ['Edge properties cannot be updated because connection\n             ~ defined in "', '" field does not specify edge props.']),
    _templateObject2 = _taggedTemplateLiteral(['', ' must be an object expression.'], ['', ' must be an object expression.']);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _validateUpdate = require('./validateUpdate');

function validateEdgeUpdate(context, update) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateEdgeUpdate.');
  (0, _jsutilsInvariant2['default'])(context['function'] && context.field && context.field.name && context.schema, 'must pass correct context to validateEdgeUpdate.');

  var schema = context.schema;
  var _context$field = context.field;
  var fieldName = _context$field.name;
  var edgeTypeName = _context$field.edgeType;

  var options = { prefix: 'Edge props update' };

  var results = !edgeTypeName ? [(0, _jsutilsStrip2['default'])(_templateObject, fieldName)] : (0, _jsutilsIsNullish2['default'])(update) || typeof update !== 'object' || Array.isArray(update) ? [(0, _jsutilsStrip2['default'])(_templateObject2, options.prefix)] : (0, _validateUpdate.validateObjectUpdate)(schema, edgeTypeName, update, '', options);

  return { context: context, results: results };
}