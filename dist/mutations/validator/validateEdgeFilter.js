'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateEdgeFilter = validateEdgeFilter;

var _templateObject = _taggedTemplateLiteral(['', ' must be an object expression.'], ['', ' must be an object expression.']),
    _templateObject2 = _taggedTemplateLiteral(['', ' cannot reference edge properties because\n             ~ connection defined in "', '" field does not specify\n             ~ edge props.'], ['', ' cannot reference edge properties because\n             ~ connection defined in "', '" field does not specify\n             ~ edge props.']);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _validateFilter = require('./validateFilter');

function validateEdgeFilter(context, filter) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateEdgeFilter.');
  (0, _jsutilsInvariant2['default'])(context['function'] && context.field && context.field.name && context.schema, 'must pass correct context to validateEdgeFilter.');

  var schema = context.schema;
  var _context$field = context.field;
  var fieldName = _context$field.name;
  var typeName = _context$field.type;
  var edgeTypeName = _context$field.edgeType;

  var options = { prefix: 'Edge filter' };

  if ((0, _jsutilsIsNullish2['default'])(filter) || typeof filter !== 'object' || Array.isArray(filter)) {
    return {
      context: context,
      results: [(0, _jsutilsStrip2['default'])(_templateObject, options.prefix)]
    };
  }

  var nodeFilter = filter.node || {};
  var edgeFilter = _extends({}, filter);
  delete edgeFilter.node;

  var results = !edgeTypeName && _Object$keys(edgeFilter).length !== 0 ? [(0, _jsutilsStrip2['default'])(_templateObject2, options.prefix, fieldName)] : [].concat(_toConsumableArray((0, _validateFilter.validateObjectFilter)(schema, typeName, nodeFilter, 'node', options)), _toConsumableArray(edgeTypeName ? (0, _validateFilter.validateObjectFilter)(schema, edgeTypeName, edgeFilter, '', options) : []));

  return { context: context, results: results };
}