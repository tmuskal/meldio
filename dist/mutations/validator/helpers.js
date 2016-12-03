'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isValidNodeId = isValidNodeId;
exports.isValidNodeIdList = isValidNodeIdList;
exports.isValidScalar = isValidScalar;
exports.isValidScalarList = isValidScalarList;
exports.hasOp = hasOp;
exports.allowedOps = allowedOps;
exports.typeOp = typeOp;
exports.scalarListOp = scalarListOp;
exports.nodeIdListOp = nodeIdListOp;
exports.scalarOp = scalarOp;
exports.scalarOpVal = scalarOpVal;
exports.atMostOneOp = atMostOneOp;

var _templateObject = _taggedTemplateLiteral(['', ' has a scalar value where object is expected ', '.\n             ~ Only object expressions are allowed in this context.'], ['', ' has a scalar value where object is expected ', '.\n             ~ Only object expressions are allowed in this context.']),
    _templateObject2 = _taggedTemplateLiteral(['', ' has an array where object is expected ', '.\n             ~ Only object expressions are allowed in this context.'], ['', ' has an array where object is expected ', '.\n             ~ Only object expressions are allowed in this context.']),
    _templateObject3 = _taggedTemplateLiteral(['', ' has an invalid "', '" operator ', '.\n             ~ Allowed operators are: ', '.'], ['', ' has an invalid "', '" operator ', '.\n             ~ Allowed operators are: ', '.']),
    _templateObject4 = _taggedTemplateLiteral(['', ' has an invalid value ', '.\n               ~ Expected "String" array or scalar of: ', '.'], ['', ' has an invalid value ', '.\n               ~ Expected "String" array or scalar of: ', '.']),
    _templateObject5 = _taggedTemplateLiteral(['', ' has invalid type name ', '.\n               ~ Expected "String" array or scalar of: ', '.'], ['', ' has invalid type name ', '.\n               ~ Expected "String" array or scalar of: ', '.']),
    _templateObject6 = _taggedTemplateLiteral(['', ' has invalid "eq" operator value ', '.\n             ~ Expected "String" array or scalar of: ', '.'], ['', ' has invalid "eq" operator value ', '.\n             ~ Expected "String" array or scalar of: ', '.']),
    _templateObject7 = _taggedTemplateLiteral(['', ' has invalid "ne" operator value ', '.\n             ~ Expected "String" array or scalar of: ', '.'], ['', ' has invalid "ne" operator value ', '.\n             ~ Expected "String" array or scalar of: ', '.']),
    _templateObject8 = _taggedTemplateLiteral(['', ' has "', '" operator with invalid value ', '. Value\n            ~ passed to "', '" operator must be "', '" scalar or array.'], ['', ' has "', '" operator with invalid value ', '. Value\n            ~ passed to "', '" operator must be "', '" scalar or array.']),
    _templateObject9 = _taggedTemplateLiteral(['', ' has "', '" operator with invalid value ', '. Value\n             ~ passed to "', '" operator must be "', '" node id or array\n             ~ of node ids.'], ['', ' has "', '" operator with invalid value ', '. Value\n             ~ passed to "', '" operator must be "', '" node id or array\n             ~ of node ids.']),
    _templateObject10 = _taggedTemplateLiteral(['', ' has "', '" operator with invalid value ', '. Value\n           ~ passed to "', '" operator must be "', '" scalar.'], ['', ' has "', '" operator with invalid value ', '. Value\n           ~ passed to "', '" operator must be "', '" scalar.']),
    _templateObject11 = _taggedTemplateLiteral(['', ' has "', '" operator with invalid value ', '. Value\n           ~ passed to "', '" operator must be "', '" scalar with one\n           ~ of the following values: ', '.'], ['', ' has "', '" operator with invalid value ', '. Value\n           ~ passed to "', '" operator must be "', '" scalar with one\n           ~ of the following values: ', '.']),
    _templateObject12 = _taggedTemplateLiteral(['', ' has an invalid operator expression ', '.\n           ~ Expected at most one of the following operators: ', '.'], ['', ' has an invalid operator expression ', '.\n           ~ Expected at most one of the following operators: ', '.']);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsGlobalId = require('../../jsutils/globalId');

function isValidNodeId(schema, type, id) {
  return Boolean((0, _jsutilsIsNullish2['default'])(id) || (0, _jsutilsGlobalId.isGlobalId)(id) && schema[type] && (schema[type].kind === 'type' && (0, _jsutilsGlobalId.typeFromGlobalId)(id) === type || schema[type].kind === 'interface' && schema[type].implementations.includes((0, _jsutilsGlobalId.typeFromGlobalId)(id)) || schema[type].kind === 'union' && schema[type].typeNames.includes((0, _jsutilsGlobalId.typeFromGlobalId)(id))));
}

function isValidNodeIdList(schema, type, list) {
  return Array.isArray(list) && list.reduce(function (acc, elem) {
    return acc && isValidNodeId(schema, type, elem);
  }, true);
}

function isValidScalar(schema, type, value) {
  return type === 'String' ? typeof value === 'string' : type === 'Int' || type === 'Float' ? typeof value === 'number' : type === 'Boolean' ? value === true || value === false : type === 'ID' ? typeof value === 'string' : schema[type] && schema[type].kind === 'enum' ? schema[type].values.includes(value) : false;
}

function isValidScalarList(schema, type, list) {
  return Array.isArray(list) && list.reduce(function (acc, elem) {
    return acc && isValidScalar(schema, type, elem);
  }, true);
}

function hasOp(op, expression) {
  return typeof expression === 'object' && !Array.isArray(expression) && !(0, _jsutilsIsNullish2['default'])(expression[op]);
}

function allowedOps(expression, allowed, path, options) {
  var prefix = options.prefix;
  var suffix = options.suffix;

  var allowedSet = new _Set(allowed);
  var allowedStr = allowed.map(function (o) {
    return '"' + o + '"';
  }).join(', ');

  return typeof expression !== 'object' ? [(0, _jsutilsStrip2['default'])(_templateObject, prefix, suffix)] : Array.isArray(expression) ? [(0, _jsutilsStrip2['default'])(_templateObject2, prefix, suffix)] : _Object$keys(expression).filter(function (key) {
    return !allowedSet.has(key);
  }).map(function (key) {
    return (0, _jsutilsStrip2['default'])(_templateObject3, prefix, key, suffix, allowedStr);
  });
}

function typeOp(schema, allowedTypes, filter, path, _ref) {
  var prefix = _ref.prefix;

  var exp = filter.type;
  if ((0, _jsutilsIsNullish2['default'])(exp)) {
    return [];
  }

  var allowed = new _Set(allowedTypes);
  var allowedStr = allowedTypes.map(function (t) {
    return '"' + t + '"';
  }).join(', ');
  var suffix = 'within "' + path + '" subexpression';
  var options = { prefix: prefix, suffix: suffix };

  if (typeof exp !== 'object' || Array.isArray(exp)) {
    return !isValidScalar(schema, 'String', exp) && !isValidScalarList(schema, 'String', exp) ? [(0, _jsutilsStrip2['default'])(_templateObject4, prefix, suffix, allowedStr)] : ![].concat(exp).every(function (t) {
      return allowed.has(t);
    }) ? [(0, _jsutilsStrip2['default'])(_templateObject5, prefix, suffix, allowedStr)] : [];
  }
  return [].concat(_toConsumableArray(allowedOps(exp, ['eq', 'ne'], path, options)), _toConsumableArray(!(0, _jsutilsIsNullish2['default'])(exp.eq) && !allowed.has(exp.eq) && (!Array.isArray(exp.eq) || !exp.eq.every(function (t) {
    return allowed.has(t);
  })) ? [(0, _jsutilsStrip2['default'])(_templateObject6, prefix, suffix, allowedStr)] : []), _toConsumableArray(!(0, _jsutilsIsNullish2['default'])(exp.ne) && !allowed.has(exp.ne) && (!Array.isArray(exp.ne) || !exp.ne.every(function (t) {
    return allowed.has(t);
  })) ? [(0, _jsutilsStrip2['default'])(_templateObject7, prefix, suffix, allowedStr)] : []));
}

function scalarListOp(schema, op, type, exp, options) {
  if (typeof exp !== 'object' || Array.isArray(exp)) {
    return [];
  }

  var prefix = options.prefix;
  var suffix = options.suffix;

  return !(0, _jsutilsIsNullish2['default'])(exp[op]) && !isValidScalar(schema, type, exp[op]) && !isValidScalarList(schema, type, exp[op]) ? [(0, _jsutilsStrip2['default'])(_templateObject8, prefix, op, suffix, op, type)] : [];
}

function nodeIdListOp(schema, op, type, exp, options) {
  if (typeof exp !== 'object' || Array.isArray(exp)) {
    return [];
  }

  var prefix = options.prefix;
  var suffix = options.suffix;

  return !(0, _jsutilsIsNullish2['default'])(exp[op]) && !isValidNodeId(schema, type, exp[op]) && !isValidNodeIdList(schema, type, exp[op]) ? [(0, _jsutilsStrip2['default'])(_templateObject9, prefix, op, suffix, op, type)] : [];
}

function scalarOp(schema, op, type, exp, options) {
  if (typeof exp !== 'object' || Array.isArray(exp)) {
    return [];
  }

  var prefix = options.prefix;
  var suffix = options.suffix;

  return !(0, _jsutilsIsNullish2['default'])(exp[op]) && !isValidScalar(schema, type, exp[op]) ? [(0, _jsutilsStrip2['default'])(_templateObject10, prefix, op, suffix, op, type)] : [];
}

function scalarOpVal(schema, op, type, values, exp, options) {
  if (typeof exp !== 'object' || Array.isArray(exp)) {
    return [];
  }
  var valuesStr = values.map(function (v) {
    return '' + String(v);
  }).join(', ');

  var prefix = options.prefix;
  var suffix = options.suffix;

  return !(0, _jsutilsIsNullish2['default'])(exp[op]) && !isValidScalar(schema, type, exp[op]) ? [(0, _jsutilsStrip2['default'])(_templateObject11, prefix, op, suffix, op, type, valuesStr)] : !(0, _jsutilsIsNullish2['default'])(exp[op]) && !values.includes(exp[op]) ? [(0, _jsutilsStrip2['default'])(_templateObject11, prefix, op, suffix, op, type, valuesStr)] : [];
}

function atMostOneOp(exp, ops, path, options) {
  if (typeof exp !== 'object' || Array.isArray(exp)) {
    return [];
  }

  var opsString = ops.map(function (o) {
    return '"' + o + '"';
  }).join(', ');
  var prefix = options.prefix;
  var suffix = options.suffix;

  var hasOneOrLess = ops.filter(function (op) {
    return !(0, _jsutilsIsNullish2['default'])(exp[op]);
  }).length <= 1;

  return !hasOneOrLess ? [(0, _jsutilsStrip2['default'])(_templateObject12, prefix, suffix, opsString)] : [];
}