'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateNode = validateNode;
exports.objectValidator = objectValidator;

var _templateObject = _taggedTemplateLiteral(['Value passed to ', ' must be a node object.'], ['Value passed to ', ' must be a node object.']),
    _templateObject2 = _taggedTemplateLiteral(['', ' has an id field for "', '"\n             ~ type where an id for "', '" type is expected.'], ['', ' has an id field for "', '"\n             ~ type where an id for "', '" type is expected.']);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsGlobalId = require('../../jsutils/globalId');

var _validateFields = require('./validateFields');

var _helpers = require('./helpers');

function validateNode(context, object) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateNode.');
  (0, _jsutilsInvariant2['default'])(context.schema && context.type && context.schema[context.type] && context.schema[context.type].kind === 'type' && context.schema[context.type].implementsNode, 'must pass Node context to validateNode.');

  var schema = context.schema;
  var func = context['function'];
  var type = context.type;

  var prefix = 'Object passed to ' + func;
  var options = {
    noConnections: true,
    enforceRequired: true,
    noUndefinedFields: true,
    fieldValidator: fieldValidator,
    prefix: prefix
  };
  var path = '';

  var fields = [];
  var results = (0, _jsutilsIsNullish2['default'])(object) || typeof object !== 'object' || Array.isArray(object) ? [(0, _jsutilsStrip2['default'])(_templateObject, func)] : (0, _jsutilsIsNullish2['default'])(object.id) ? [prefix + ' is missing an id field.'] : !(0, _jsutilsGlobalId.isGlobalId)(object.id) ? [prefix + ' has an invalid id field.'] : (0, _jsutilsGlobalId.typeFromGlobalId)(object.id) !== type ? [(0, _jsutilsStrip2['default'])(_templateObject2, prefix, (0, _jsutilsGlobalId.typeFromGlobalId)(object.id), type)] : (fields = context.schema[type].fields, (0, _validateFields.validateFields)(schema, fields, object, path, options));

  return { context: context, results: results };
}

function fieldValidator(schema, field, value, path, options) {
  var fullPath = path ? path + '.' + field.name : field.name;
  var prefix = options.prefix;

  var suffix = 'in field "' + fullPath + '".';
  var type = field.type;

  return field.isScalar && !(0, _helpers.isValidScalar)(schema, type, value) ? [prefix + ' should have "' + type + '" value ' + suffix] : field.isScalarList && !(0, _helpers.isValidScalarList)(schema, type, value) ? [prefix + ' should have an array of "' + type + '" ' + suffix] : field.isNode && !(0, _helpers.isValidNodeId)(schema, type, value) ? [prefix + ' should have "' + type + '" Node ID ' + suffix] : field.isNodeList && !(0, _helpers.isValidNodeIdList)(schema, type, value) ? [prefix + ' should have an array of "' + type + '" Node IDs ' + suffix] : field.isObject ? objectValidator(schema, type, value, fullPath, options) : field.isObjectList && !Array.isArray(value) ? [prefix + ' should have an array of "' + type + '" objects ' + suffix] : field.isObjectList ? value.reduce(function (acc, elem, ix) {
    return acc.concat(objectValidator(schema, type, elem, fullPath + '[' + ix + ']', options));
  }, []) : [];
}

function objectValidator(schema, typeName, value, path, options) {
  var prefix = options.prefix;

  var suffix = 'in "' + path + '" field.';
  var type = schema[typeName];
  var fields = [];

  if (typeof value !== 'object' || Array.isArray(value)) {
    return [prefix + ' should have "' + typeName + '" object ' + suffix];
  }

  if (type.kind === 'type') {
    fields = type.fields;
  } else if (type.kind === 'interface') {
    if (value._type) {
      if (type.implementations.includes(value._type) && schema[value._type].kind === 'type') {
        fields = schema[value._type].fields;
      } else {
        return [prefix + ' contains object with an invalid "_type" value ' + suffix];
      }
    } else if (type.implementations.length === 1 && schema[type.implementations[0]].kind === 'type') {
      fields = schema[type.implementations[0]].fields;
    } else {
      return [prefix + ' must disambiguate object type with "_type" ' + suffix];
    }
  } else if (type.kind === 'union') {
    if (value._type) {
      if (type.typeNames.includes(value._type) && schema[value._type].kind === 'type') {
        fields = schema[value._type].fields;
      } else {
        return [prefix + ' contains object with an invalid "_type" value ' + suffix];
      }
    } else if (type.typeNames.length === 1 && schema[type.typeNames[0]].kind === 'type') {
      fields = schema[type.typeNames[0]].fields;
    } else {
      return [prefix + ' must disambiguate object type with "_type" ' + suffix];
    }
  }
  (0, _jsutilsInvariant2['default'])(fields, 'Must see fields in objectValidator');

  var fieldOptions = {
    noConnections: true,
    enforceRequired: true,
    noUndefinedFields: true,
    prefix: prefix,
    fieldValidator: fieldValidator,
    additionalAllowedFields: ['_type']
  };

  return (0, _validateFields.validateFields)(schema, fields, value, path, fieldOptions);
}