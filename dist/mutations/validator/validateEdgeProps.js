'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateEdgeProps = validateEdgeProps;

var _templateObject = _taggedTemplateLiteral(['Edge properties cannot be passed to ', ' because connection\n            ~ defined in "', '" field does not specify edge props.'], ['Edge properties cannot be passed to ', ' because connection\n            ~ defined in "', '" field does not specify edge props.']);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _validateNode = require('./validateNode');

function validateEdgeProps(context, edgeProps) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateEdgeNode.');
  (0, _jsutilsInvariant2['default'])(context['function'] && context.field && context.field.name && context.schema, 'must pass correct context to validateEdgeNode.');

  var func = context['function'];
  var schema = context.schema;
  var _context$field = context.field;
  var fieldName = _context$field.name;
  var edgeTypeName = _context$field.edgeType;

  var options = { prefix: 'Edge properties passed to ' + func };
  var results = !edgeTypeName && !(0, _jsutilsIsNullish2['default'])(edgeProps) ? [(0, _jsutilsStrip2['default'])(_templateObject, func, fieldName)] : edgeTypeName ? (0, _validateNode.objectValidator)(schema, edgeTypeName, edgeProps || {}, '', options) : [];

  return { context: context, results: results };
}