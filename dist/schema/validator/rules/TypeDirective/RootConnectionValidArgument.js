'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive "@rootConnection" defined on "', '"\n               ~ type specifies an invalid argument(s):\n               ~ ', '. ', ''], ['Directive "@rootConnection" defined on "', '"\n               ~ type specifies an invalid argument(s):\n               ~ ', '. ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Directive "@rootConnection" defined on "', '"\n               ~ type must have argument "field". ', ''], ['Directive "@rootConnection" defined on "', '"\n               ~ type must have argument "field". ', '']),
    _templateObject3 = _taggedTemplateLiteral(['Directive "@rootConnection" defined on "', '"\n               ~ type must have argument "field" with a String\n               ~ value. ', ''], ['Directive "@rootConnection" defined on "', '"\n               ~ type must have argument "field" with a String\n               ~ value. ', '']),
    _templateObject4 = _taggedTemplateLiteral(['Directive "@rootConnection" defined on "', '"\n                 ~ type should specify field name in "camelCase",\n                 ~ e.g. "', '". ', ''], ['Directive "@rootConnection" defined on "', '"\n                 ~ type should specify field name in "camelCase",\n                 ~ e.g. "', '". ', '']),
    _templateObject5 = _taggedTemplateLiteral(['Directive "@rootConnection" defined on "', '"\n               ~ type specifies field name "', '", which\n               ~ is not unique. ', ''], ['Directive "@rootConnection" defined on "', '"\n               ~ type specifies field name "', '", which\n               ~ is not unique. ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var RootConnectionValidArgument = function RootConnectionValidArgument(_ref) {
  var type = _ref.type;
  var directive = _ref.directive;
  var rootQueryFieldNames = _ref.rootQueryFieldNames;

  if (!type || !directive) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var name = directive.name;
  var loc = directive.loc;
  var args = directive.arguments;

  if (name !== 'rootConnection') {
    return;
  }

  var goodArgs = ['field'];
  var badArgs = args.filter(function (a) {
    return !goodArgs.includes(a.name);
  });
  if (badArgs.length) {
    return (0, _utils.error)(_templateObject, typeName, badArgs.map(function (a) {
      return '"' + a.name + '"';
    }).join(', '), loc);
  }
  var fieldArg = args.filter(function (a) {
    return a.name === 'field';
  });
  if (fieldArg.length !== 1) {
    return (0, _utils.error)(_templateObject2, typeName, loc);
  }

  var _fieldArg$0 = fieldArg[0];
  var fieldType = _fieldArg$0.type;
  var fieldValue = _fieldArg$0.value;

  var fieldValueStr = String(fieldValue);

  if (fieldType !== 'String' || !fieldValueStr) {
    return (0, _utils.error)(_templateObject3, typeName, loc);
  }
  if (fieldValueStr !== (0, _jsutilsCasing.camelCase)(fieldValueStr)) {
    return (0, _utils.warning)(_templateObject4, typeName, (0, _jsutilsCasing.camelCase)(fieldValueStr), loc);
  }

  var isFieldNameUniqueAtRoot = rootQueryFieldNames.filter(function (fieldName) {
    return fieldName === fieldValueStr;
  }).length === 1;
  if (!isFieldNameUniqueAtRoot) {
    return (0, _utils.error)(_templateObject5, typeName, fieldValueStr, loc);
  }
};
exports.RootConnectionValidArgument = RootConnectionValidArgument;