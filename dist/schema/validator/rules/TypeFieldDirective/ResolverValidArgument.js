'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive @resolver defined on "', '" of\n                 ~ "', '" type should have exactly one argument. ', ''], ['Directive @resolver defined on "', '" of\n                 ~ "', '" type should have exactly one argument. ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Directive @resolver defined on "', '" of\n                 ~ "', '" type should have argument "function" with a\n                 ~ String value. ', ''], ['Directive @resolver defined on "', '" of\n                 ~ "', '" type should have argument "function" with a\n                 ~ String value. ', '']);

var _utils = require('../../utils');

var ResolverValidArgument = function ResolverValidArgument(_ref) {
  var type = _ref.type;
  var field = _ref.field;
  var directive = _ref.directive;

  if (!type || !field || !directive) {
    throw Error('context not passed to rule.');
  }

  var typeName = type.name;
  var fieldName = field.name;
  var name = directive.name;
  var loc = directive.loc;
  var args = directive.arguments;

  if (name === 'resolver') {
    if (args.length !== 1) {
      return (0, _utils.error)(_templateObject, fieldName, typeName, loc);
    }

    var _args$0 = args[0];
    var argName = _args$0.name;
    var argType = _args$0.type;
    var argValue = _args$0.value;

    if (argName !== 'function' || argType !== 'String' || !argValue) {
      return (0, _utils.error)(_templateObject2, fieldName, typeName, loc);
    }
  }
};
exports.ResolverValidArgument = ResolverValidArgument;