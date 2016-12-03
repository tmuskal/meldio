'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive "@rootViewer" defined on "', '"\n               ~ type should have exactly one argument. ', ''], ['Directive "@rootViewer" defined on "', '"\n               ~ type should have exactly one argument. ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Directive "@rootViewer" defined on "', '"\n               ~ type should have argument "field" with a String\n               ~ value. ', ''], ['Directive "@rootViewer" defined on "', '"\n               ~ type should have argument "field" with a String\n               ~ value. ', '']),
    _templateObject3 = _taggedTemplateLiteral(['Directive "@rootViewer" defined on "', '"\n                 ~ type should specify field name in "camelCase",\n                 ~ e.g. "', '". ', ''], ['Directive "@rootViewer" defined on "', '"\n                 ~ type should specify field name in "camelCase",\n                 ~ e.g. "', '". ', '']),
    _templateObject4 = _taggedTemplateLiteral(['Directive "@rootViewer" defined on "', '"\n               ~ type specifies field name "', '", which\n               ~ is not unique. ', ''], ['Directive "@rootViewer" defined on "', '"\n               ~ type specifies field name "', '", which\n               ~ is not unique. ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var RootViewerValidArgument = function RootViewerValidArgument(_ref) {
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

  if (name !== 'rootViewer') {
    return;
  }

  if (args.length !== 1) {
    return (0, _utils.error)(_templateObject, typeName, loc);
  }
  var _args$0 = args[0];
  var argName = _args$0.name;
  var argType = _args$0.type;
  var argValue = _args$0.value;

  var argValueStr = String(argValue);

  var isFieldNameUniqueAtRoot = rootQueryFieldNames.filter(function (fieldName) {
    return fieldName === argValueStr;
  }).length === 1;

  if (argName !== 'field' || argType !== 'String' || !argValue) {
    return (0, _utils.error)(_templateObject2, typeName, loc);
  }
  if (argValue !== (0, _jsutilsCasing.camelCase)(String(argValue))) {
    return (0, _utils.warning)(_templateObject3, typeName, (0, _jsutilsCasing.camelCase)(String(argValue)), loc);
  }
  if (!isFieldNameUniqueAtRoot) {
    return (0, _utils.error)(_templateObject4, typeName, argValue, loc);
  }
};
exports.RootViewerValidArgument = RootViewerValidArgument;