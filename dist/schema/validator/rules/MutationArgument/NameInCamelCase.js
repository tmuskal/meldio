'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Argument "', '" of mutation "', '" should be in\n                 ~ "camelCase". ', ''], ['Argument "', '" of mutation "', '" should be in\n                 ~ "camelCase". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utilsJs = require('../../utils.js');

var NameInCamelCase = function NameInCamelCase(_ref) {
  var mutation = _ref.mutation;
  var argument = _ref.argument;

  if (!mutation || !argument) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = argument.name;
  var loc = argument.loc;

  if (name !== (0, _jsutilsCasing.camelCase)(name)) {
    return (0, _utilsJs.warning)(_templateObject, name, mutationName, loc);
  }
};
exports.NameInCamelCase = NameInCamelCase;