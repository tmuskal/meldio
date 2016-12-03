'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateUpdate = validateUpdate;
exports.validateObjectUpdate = validateObjectUpdate;

var _templateObject = _taggedTemplateLiteral(['', ' has a "clear" operator ', '.\n             ~ Clear operator can not be applied to a required field.'], ['', ' has a "clear" operator ', '.\n             ~ Clear operator can not be applied to a required field.']),
    _templateObject2 = _taggedTemplateLiteral(['', ' has an unexpected value ', '.\n           ~ Expected "', '" scalar value or "clear" operator\n           ~ expression.'], ['', ' has an unexpected value ', '.\n           ~ Expected "', '" scalar value or "clear" operator\n           ~ expression.']),
    _templateObject3 = _taggedTemplateLiteral(['', ' has invalid "div" operator value of zero ', '.\n             ~ Division by zero is not allowed.'], ['', ' has invalid "div" operator value of zero ', '.\n             ~ Division by zero is not allowed.']),
    _templateObject4 = _taggedTemplateLiteral(['', ' has an invalid node id value ', '.\n           ~ Expected "', '" node id value.'], ['', ' has an invalid node id value ', '.\n           ~ Expected "', '" node id value.']),
    _templateObject5 = _taggedTemplateLiteral(['', ' has an invalid "pop" operator ', '. Value\n             ~ passed to "pop" operator must be a String that is either\n             ~ "first" or "last".'], ['', ' has an invalid "pop" operator ', '. Value\n             ~ passed to "pop" operator must be a String that is either\n             ~ "first" or "last".']),
    _templateObject6 = _taggedTemplateLiteral(['', ' has an unexpected value ', '.\n           ~ Expected "', '" array or ', ' operator\n           ~ expression.'], ['', ' has an unexpected value ', '.\n           ~ Expected "', '" array or ', ' operator\n           ~ expression.']),
    _templateObject7 = _taggedTemplateLiteral(['', ' has an invalid array value ', '.\n           ~ Expected "', '" array or ', ' operator\n           ~ expression.'], ['', ' has an invalid array value ', '.\n           ~ Expected "', '" array or ', ' operator\n           ~ expression.']),
    _templateObject8 = _taggedTemplateLiteral(['', ' has an unexpected value ', '.\n           ~ Expected "', '" node id array or ', ' operator\n           ~ expression.'], ['', ' has an unexpected value ', '.\n           ~ Expected "', '" node id array or ', ' operator\n           ~ expression.']),
    _templateObject9 = _taggedTemplateLiteral(['', ' has an invalid array value ', '.\n            ~ Expected "', '" node id array or ', ' operator\n            ~ expression.'], ['', ' has an invalid array value ', '.\n            ~ Expected "', '" node id array or ', ' operator\n            ~ expression.']),
    _templateObject10 = _taggedTemplateLiteral(['', ' has an "insert" operator with invalid value ', '.\n              ~ Value passed to "insert" operator must be "', '" object or\n              ~ array of objects.'], ['', ' has an "insert" operator with invalid value ', '.\n              ~ Value passed to "insert" operator must be "', '" object or\n              ~ array of objects.']),
    _templateObject11 = _taggedTemplateLiteral(['', ' has an unexpected value ', '.\n           ~ Expected "', '" object array or ', ' operator\n           ~ expression.'], ['', ' has an unexpected value ', '.\n           ~ Expected "', '" object array or ', ' operator\n           ~ expression.']),
    _templateObject12 = _taggedTemplateLiteral(['', ' must be an object expression.'], ['', ' must be an object expression.']);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _validateFields = require('./validateFields');

var _helpers = require('./helpers');

var _validateNode = require('./validateNode');

var _validateFilter = require('./validateFilter');

function validateUpdate(context, expression) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateUpdate.');
  (0, _jsutilsInvariant2['default'])(context.schema && context.type && context.schema[context.type] && context.schema[context.type].kind === 'type' && context.schema[context.type].implementsNode, 'must pass Node context to validateUpdate.');

  var schema = context.schema;
  var type = context.type;

  var prefix = 'Update expression';
  var options = {
    noConnections: true,
    enforceRequired: false,
    noUndefinedFields: true,
    fieldValidator: fieldValidator,
    prefix: prefix
  };
  var path = '';

  var fields = context.schema[type].fields;
  var results = (0, _jsutilsIsNullish2['default'])(expression) || typeof expression !== 'object' || Array.isArray(expression) ? [(0, _jsutilsStrip2['default'])(_templateObject12, prefix)] : !(0, _jsutilsIsNullish2['default'])(expression.id) ? [prefix + ' can not include an id field.'] : (0, _validateFields.validateFields)(schema, fields, expression, path, options);

  return { context: context, results: results };
}

function fieldValidator(schema, field, exp, parentPath, _ref) {
  var prefix = _ref.prefix;

  var path = parentPath ? parentPath + '.' + field.name : field.name;
  var suffix = 'in "' + path + '" field';
  var type = field.type;
  var options = { prefix: prefix, suffix: suffix };

  return field.isRequired && (0, _helpers.hasOp)('clear', exp) && exp.clear === true ? [(0, _jsutilsStrip2['default'])(_templateObject, prefix, suffix)] : field.isScalar && !field.isNumeric ? validateScalarUpdate(schema, type, exp, path, options) : field.isNumeric ? validateNumericUpdate(schema, type, exp, path, options) : field.isScalarList ? validateScalarListUpdate(schema, type, exp, path, options) : field.isNode ? validateNodeUpdate(schema, type, exp, path, options) : field.isNodeList ? validateNodeListUpdate(schema, type, exp, path, options) : field.isObject ? validateObjectUpdate(schema, type, exp, path, options) : field.isObjectList ? validateObjectListUpdate(schema, type, exp, path, options) :
  /* istanbul ignore next */
  [];
}

function validateScalarUpdate(schema, type, exp, path, options) {
  var prefix = options.prefix;
  var suffix = options.suffix;

  return (0, _helpers.hasOp)('clear', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['clear'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'clear', 'Boolean', exp, options))) : !(0, _helpers.isValidScalar)(schema, type, exp) ? [(0, _jsutilsStrip2['default'])(_templateObject2, prefix, suffix, type)] : [];
}

function validateNumericUpdate(schema, type, exp, path, options) {
  var prefix = options.prefix;
  var suffix = options.suffix;

  return (0, _helpers.hasOp)('clear', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['clear'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'clear', 'Boolean', exp, options))) : (0, _helpers.hasOp)('add', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['add'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'add', type, exp, options))) : (0, _helpers.hasOp)('sub', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['sub'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'sub', type, exp, options))) : (0, _helpers.hasOp)('mul', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['mul'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'mul', type, exp, options))) : (0, _helpers.hasOp)('div', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['div'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'div', type, exp, options)), _toConsumableArray(exp.div === 0 ? [(0, _jsutilsStrip2['default'])(_templateObject3, prefix, suffix)] : [])) : (0, _helpers.hasOp)('min', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['min'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'min', type, exp, options))) : (0, _helpers.hasOp)('max', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['max'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'max', type, exp, options))) : !(0, _helpers.isValidScalar)(schema, type, exp) ? [(0, _jsutilsStrip2['default'])(_templateObject2, prefix, suffix, type)] : [];
}

function validateNodeUpdate(schema, type, exp, path, options) {
  var prefix = options.prefix;
  var suffix = options.suffix;

  return (0, _helpers.hasOp)('clear', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['clear'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'clear', 'Boolean', exp, options))) : !(0, _helpers.isValidNodeId)(schema, type, exp) ? [(0, _jsutilsStrip2['default'])(_templateObject4, prefix, suffix, type)] : [];
}

function validateObjectUpdate(schema, typeName, exp, path) {
  var opts = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

  (0, _jsutilsInvariant2['default'])(schema, 'must pass schema to validateObjectUpdate.');
  (0, _jsutilsInvariant2['default'])(schema[typeName] && ['type', 'interface', 'union'].includes(schema[typeName].kind) && !schema[typeName].implementsNode && !schema[typeName].everyTypeImplementsNode, 'must pass non-Node object to validateObjectUpdate.');

  var prefix = opts.prefix;
  var suffix = opts.suffix || 'in "' + path + '" field.';
  var type = schema[typeName];
  var fields = [];

  if (typeof exp !== 'object' || Array.isArray(exp)) {
    return [prefix + ' should have "' + typeName + '" object ' + suffix];
  }

  if (type.kind === 'type') {
    fields = type.fields;
  } else if (type.kind === 'interface') {
    if (exp._type) {
      if (type.implementations.includes(exp._type) && schema[exp._type].kind === 'type') {
        fields = schema[exp._type].fields;
      } else {
        return [prefix + ' contains object with an invalid "_type" value ' + suffix];
      }
    } else if (type.implementations.length === 1 && schema[type.implementations[0]].kind === 'type') {
      fields = schema[type.implementations[0]].fields;
    } else {
      return [prefix + ' must disambiguate object type with "_type" ' + suffix];
    }
  } else if (type.kind === 'union') {
    if (exp._type) {
      if (type.typeNames.includes(exp._type) && schema[exp._type].kind === 'type') {
        fields = schema[exp._type].fields;
      } else {
        return [prefix + ' contains object with an invalid "_type" value ' + suffix];
      }
    } else if (type.typeNames.length === 1 && schema[type.typeNames[0]].kind === 'type') {
      fields = schema[type.typeNames[0]].fields;
    } else {
      return [prefix + ' must disambiguate object type with "_type" ' + suffix];
    }
  }
  (0, _jsutilsInvariant2['default'])(fields, 'Must see some fields in validateObjectUpdate');

  var options = {
    noConnections: true,
    enforceRequired: false,
    noUndefinedFields: true,
    fieldValidator: fieldValidator,
    additionalAllowedFields: ['_type'],
    prefix: prefix
  };

  return (0, _validateFields.validateFields)(schema, fields, exp, path, options);
}

function validateScalarListUpdate(schema, type, exp, path, options) {
  var prefix = options.prefix;
  var suffix = options.suffix;

  var topLevelOps = ['insert', 'delete', 'pop', 'clear'].map(function (o) {
    return '"' + o + '"';
  }).join(', ');
  return (0, _helpers.hasOp)('insert', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['insert', 'at', 'ascending', 'descending', 'keepFirst', 'keepLast'], path, options)), _toConsumableArray((0, _helpers.atMostOneOp)(exp, ['at', 'ascending', 'descending'], path, options)), _toConsumableArray((0, _helpers.scalarListOp)(schema, 'insert', type, exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'at', 'Int', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'ascending', 'Boolean', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'descending', 'Boolean', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'keepFirst', 'Int', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'keepLast', 'Int', exp, options))) : (0, _helpers.hasOp)('delete', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['delete'], path, options)), _toConsumableArray(typeof exp['delete'] === 'object' && !Array.isArray(exp['delete']) ? (0, _validateFilter.validateScalarFilter)(schema, type, exp['delete'], path + '.delete', options) : (0, _helpers.scalarListOp)(schema, 'delete', type, exp, options))) : (0, _helpers.hasOp)('pop', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['pop'], path, options)), _toConsumableArray(typeof exp.pop !== 'string' || exp.pop.toLowerCase() !== 'first' && exp.pop.toLowerCase() !== 'last' ? [(0, _jsutilsStrip2['default'])(_templateObject5, prefix, suffix)] : [])) : (0, _helpers.hasOp)('clear', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['clear'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'clear', 'Boolean', exp, options))) : !Array.isArray(exp) ? [(0, _jsutilsStrip2['default'])(_templateObject6, prefix, suffix, type, topLevelOps)] : !(0, _helpers.isValidScalarList)(schema, type, exp) ? [(0, _jsutilsStrip2['default'])(_templateObject7, prefix, suffix, type, topLevelOps)] : [];
}

function validateNodeListUpdate(schema, type, exp, path, options) {
  var prefix = options.prefix;
  var suffix = options.suffix;

  var topLevelOps = ['insert', 'delete', 'pop', 'clear'].map(function (o) {
    return '"' + o + '"';
  }).join(', ');
  return (0, _helpers.hasOp)('insert', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['insert', 'at', 'ascending', 'descending', 'keepFirst', 'keepLast'], path, options)), _toConsumableArray((0, _helpers.atMostOneOp)(exp, ['at', 'ascending', 'descending'], path, options)), _toConsumableArray((0, _helpers.nodeIdListOp)(schema, 'insert', type, exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'at', 'Int', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'ascending', 'Boolean', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'descending', 'Boolean', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'keepFirst', 'Int', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'keepLast', 'Int', exp, options))) : (0, _helpers.hasOp)('delete', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['delete'], path, options)), _toConsumableArray(typeof exp['delete'] === 'object' && !Array.isArray(exp['delete']) ? (0, _validateFilter.validateScalarFilter)(schema, 'ID', exp['delete'], path + '.delete', options) : (0, _helpers.nodeIdListOp)(schema, 'delete', type, exp, options))) : (0, _helpers.hasOp)('pop', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['pop'], path, options)), _toConsumableArray(typeof exp.pop !== 'string' || exp.pop.toLowerCase() !== 'first' && exp.pop.toLowerCase() !== 'last' ? [(0, _jsutilsStrip2['default'])(_templateObject5, prefix, suffix)] : [])) : (0, _helpers.hasOp)('clear', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['clear'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'clear', 'Boolean', exp, options))) : !Array.isArray(exp) ? [(0, _jsutilsStrip2['default'])(_templateObject8, prefix, suffix, type, topLevelOps)] : !(0, _helpers.isValidNodeIdList)(schema, type, exp) ? [(0, _jsutilsStrip2['default'])(_templateObject9, prefix, suffix, type, topLevelOps)] : [];
}

function validateObjectListUpdate(schema, type, exp, path, options) {
  var prefix = options.prefix;
  var suffix = options.suffix;

  var isType = schema[type] && schema[type].kind === 'type';
  var topLevelOps = ['insert', 'delete', 'pop', 'clear'].map(function (o) {
    return '"' + o + '"';
  }).join(', ');
  var allowedInsertOps = isType ? ['insert', 'at', 'ascending', 'descending', 'keepFirst', 'keepLast'] : ['insert', 'at', 'keepFirst', 'keepLast']; // union, interface
  var atMostOneOpList = isType ? ['at', 'ascending', 'descending'] : ['at'];
  var scalarFields = isType ? schema[type].fields.filter(function (f) {
    return f.isScalar;
  }).map(function (f) {
    return f.name;
  }) : [];

  return (0, _helpers.hasOp)('insert', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, allowedInsertOps, path, options)), _toConsumableArray((0, _helpers.atMostOneOp)(exp, atMostOneOpList, path, options)), _toConsumableArray(typeof exp.insert !== 'object' ? [(0, _jsutilsStrip2['default'])(_templateObject10, prefix, suffix, type)] : Array.isArray(exp.insert) ? exp.insert.reduce(function (acc, elem, ix) {
    return acc.concat((0, _validateNode.objectValidator)(schema, type, elem, path + '.insert[' + ix + ']', options));
  }, []) : (0, _validateNode.objectValidator)(schema, type, exp.insert, path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'at', 'Int', exp, options)), _toConsumableArray(isType ? [].concat(_toConsumableArray((0, _helpers.scalarOpVal)(schema, 'ascending', 'String', scalarFields, exp, options)), _toConsumableArray((0, _helpers.scalarOpVal)(schema, 'descending', 'String', scalarFields, exp, options))) : []), _toConsumableArray((0, _helpers.scalarOp)(schema, 'keepFirst', 'Int', exp, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'keepLast', 'Int', exp, options))) : (0, _helpers.hasOp)('delete', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['delete'], path, options)), _toConsumableArray(Array.isArray(exp['delete']) ? exp['delete'].reduce(function (acc, elem, ix) {
    return acc.concat((0, _validateNode.objectValidator)(schema, type, elem, path + '.delete[' + ix + ']', options));
  }, []) : (0, _validateFilter.validateObjectFilter)(schema, type, exp['delete'], path + '.delete', options))) : (0, _helpers.hasOp)('pop', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['pop'], path, options)), _toConsumableArray(typeof exp.pop !== 'string' || exp.pop.toLowerCase() !== 'first' && exp.pop.toLowerCase() !== 'last' ? [(0, _jsutilsStrip2['default'])(_templateObject5, prefix, suffix)] : [])) : (0, _helpers.hasOp)('clear', exp) ? [].concat(_toConsumableArray((0, _helpers.allowedOps)(exp, ['clear'], path, options)), _toConsumableArray((0, _helpers.scalarOp)(schema, 'clear', 'Boolean', exp, options))) : !Array.isArray(exp) ? [(0, _jsutilsStrip2['default'])(_templateObject11, prefix, suffix, type, topLevelOps)] : exp.reduce(function (acc, elem, ix) {
    return acc.concat((0, _validateNode.objectValidator)(schema, type, elem, path + '[' + ix + ']', options));
  }, []);
}