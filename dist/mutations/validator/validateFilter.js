'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateFilter = validateFilter;
exports.validateScalarFilter = validateScalarFilter;
exports.validateObjectFilter = validateObjectFilter;

var _templateObject = _taggedTemplateLiteral(['', ' must be an object expression.'], ['', ' must be an object expression.']),
    _templateObject2 = _taggedTemplateLiteral(['', ' has an invalid scalar value ', '.\n               ~ Expected "', '" scalar value or array.'], ['', ' has an invalid scalar value ', '.\n               ~ Expected "', '" scalar value or array.']),
    _templateObject3 = _taggedTemplateLiteral(['', ' has "matches" operator with invalid value ', '.\n             ~ Value passed to "matches" operator must be "String" scalar or\n             ~ RegExp object.'], ['', ' has "matches" operator with invalid value ', '.\n             ~ Value passed to "matches" operator must be "String" scalar or\n             ~ RegExp object.']);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _validateFields = require('./validateFields');

var _helpers = require('./helpers');

function validateFilter(context, expression) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateFilter.');
  (0, _jsutilsInvariant2['default'])(context.schema && context.type && context.schema[context.type] && context.schema[context.type].kind === 'type' && context.schema[context.type].implementsNode, 'must pass Node context to validateFilter.');

  var schema = context.schema;
  var type = context.type;

  var prefix = 'Filter expression';
  var options = {
    noConnections: true,
    enforceRequired: false,
    noUndefinedFields: true,
    fieldValidator: fieldValidator,
    prefix: prefix
  };
  var path = '';

  var fields = context.schema[type].fields;
  return {
    context: context,
    results: (0, _jsutilsIsNullish2['default'])(expression) || typeof expression !== 'object' || Array.isArray(expression) ? [(0, _jsutilsStrip2['default'])(_templateObject, prefix)] : (0, _validateFields.validateFields)(schema, fields, expression, path, options)
  };
}

function fieldValidator(schema, field, filter, parentPath, options) {
  var path = parentPath ? parentPath + '.' + field.name : field.name;
  var prefix = options.prefix;

  var suffix = 'within "' + path + '" subexpression';
  var type = field.type;
  var tags = { prefix: prefix, suffix: suffix };

  return field.isScalar ? validateScalarFilter(schema, type, filter, path, tags) : field.isScalarList ? validateScalarListFilter(schema, type, filter, path, tags) : field.isNode ? validateScalarFilter(schema, 'ID', filter, path, tags) : field.isNodeList ? validateScalarListFilter(schema, 'ID', filter, path, tags) : field.isObject ? validateObjectFilter(schema, type, filter, path, tags) : field.isObjectList ? validateObjectListFilter(schema, type, filter, path, tags) :
  /* istanbul ignore next */
  [];
}

function validateScalarFilter(schema, type, filter, path, _ref) {
  var prefix = _ref.prefix;

  var suffix = 'within "' + path + '" subexpression';
  var options = { prefix: prefix, suffix: suffix };

  if (typeof filter !== 'object' || Array.isArray(filter)) {
    return !(0, _helpers.isValidScalar)(schema, type, filter) && !(0, _helpers.isValidScalarList)(schema, type, filter) ? [(0, _jsutilsStrip2['default'])(_templateObject2, prefix, suffix, type)] : [];
  }
  var allowed = type === 'Int' ? ['eq', 'ne', 'lt', 'gt', 'lte', 'gte', 'exists'] : type === 'Float' ? ['eq', 'ne', 'lt', 'gt', 'lte', 'gte', 'exists'] : type === 'String' ? ['eq', 'ne', 'lt', 'gt', 'lte', 'gte', 'matches', 'exists'] : type === 'Boolean' ? ['eq', 'ne', 'exists'] : type === 'ID' ? ['eq', 'ne', 'lt', 'gt', 'lte', 'gte', 'exists'] : schema[type].kind === 'enum' ? ['eq', 'ne', 'exists'] :
  /* istanbul ignore next */
  [];
  return [].concat(_toConsumableArray((0, _helpers.allowedOps)(filter, allowed, path, options)), _toConsumableArray((0, _helpers.scalarListOp)(schema, 'eq', type, filter, options)), _toConsumableArray((0, _helpers.scalarListOp)(schema, 'ne', type, filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'lt', type, filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'gt', type, filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'lte', type, filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'gte', type, filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'exists', 'Boolean', filter, options)), _toConsumableArray(!(0, _jsutilsIsNullish2['default'])(filter.matches) && !(0, _helpers.isValidScalar)(schema, 'String', filter.matches) && !(filter.matches instanceof RegExp) ? [(0, _jsutilsStrip2['default'])(_templateObject3, prefix, suffix)] : []));
}

function validateScalarListFilter(schema, type, filter, path, options) {
  var allowed = ['exists', 'length', 'empty', 'some', 'every', 'none'];
  return [].concat(_toConsumableArray((0, _helpers.allowedOps)(filter, allowed, path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'exists', 'Boolean', filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'length', 'Int', filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'empty', 'Boolean', filter, options)), _toConsumableArray((0, _helpers.hasOp)('some', filter) ? validateScalarFilter(schema, type, filter.some, path + '.some', options) : []), _toConsumableArray((0, _helpers.hasOp)('every', filter) ? validateScalarFilter(schema, type, filter.every, path + '.every', options) : []), _toConsumableArray((0, _helpers.hasOp)('none', filter) ? validateScalarFilter(schema, type, filter.none, path + '.none', options) : []));
}

function validateObjectFilter(schema, typeName, filter, path, options) {
  var prefix = options.prefix;

  var type = schema[typeName];
  (0, _jsutilsInvariant2['default'])(type && ['type', 'union', 'interface'].includes(type.kind), 'validateObjectFilter expects type, union or interface.');

  var allowed = type.kind === 'type' ? ['exists'] : ['exists', 'type'];

  var fieldOptions = {
    noConnections: true,
    enforceRequired: false,
    noUndefinedFields: true,
    fieldValidator: fieldValidator,
    prefix: prefix,
    additionalAllowedFields: allowed
  };

  if (type.kind === 'type') {
    return [].concat(_toConsumableArray((0, _helpers.scalarOp)(schema, 'exists', 'Boolean', filter, options)), _toConsumableArray((0, _validateFields.validateFields)(schema, type.fields, filter, path, fieldOptions)));
  } else if (type.kind === 'interface') {
    var allowedTypes = type.implementations;
    var typePath = path + '.type';
    return [].concat(_toConsumableArray((0, _helpers.scalarOp)(schema, 'exists', 'Boolean', filter, options)), _toConsumableArray((0, _helpers.typeOp)(schema, allowedTypes, filter, typePath, options)), _toConsumableArray((0, _validateFields.validateFields)(schema, type.fields, filter, path, fieldOptions)));
  } else if (type.kind === 'union') {
    var allowedTypes = type.typeNames;
    var typePath = path + '.type';
    return [].concat(_toConsumableArray((0, _helpers.allowedOps)(filter, allowed, path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'exists', 'Boolean', filter, options)), _toConsumableArray((0, _helpers.typeOp)(schema, allowedTypes, filter, typePath, options)));
  }
}

function validateObjectListFilter(schema, type, filter, path, options) {
  var allowed = ['exists', 'length', 'empty', 'some', 'every', 'none'];
  return [].concat(_toConsumableArray((0, _helpers.allowedOps)(filter, allowed, path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'exists', 'Boolean', filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'length', 'Int', filter, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'empty', 'Boolean', filter, options)), _toConsumableArray((0, _helpers.hasOp)('some', filter) ? validateObjectFilter(schema, type, filter.some, path + '.some', options) : []), _toConsumableArray((0, _helpers.hasOp)('every', filter) ? validateObjectFilter(schema, type, filter.every, path + '.every', options) : []), _toConsumableArray((0, _helpers.hasOp)('none', filter) ? validateObjectFilter(schema, type, filter.none, path + '.none', options) : []));
}