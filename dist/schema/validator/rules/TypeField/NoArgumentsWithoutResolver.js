'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" in type "', '" cannot have arguments,\n               | that is currently unsupported. ', ''], ['Field "', '" in type "', '" cannot have arguments,\n               | that is currently unsupported. ', '']);

var _utils = require('../../utils');

var NoArgumentsWithoutResolver = function NoArgumentsWithoutResolver(_ref) {
  var type = _ref.type;
  var field = _ref.field;

  if (!type || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var name = field.name;
  var loc = field.loc;
  var hasArguments = field.hasArguments;
  var directives = field.directives;

  if (hasArguments && !directives.some(function (d) {
    return d.name === 'resolver';
  })) {
    return (0, _utils.error)(_templateObject, name, typeName, loc);
  }
};
exports.NoArgumentsWithoutResolver = NoArgumentsWithoutResolver;