'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" of input object "', '" should be\n                 ~ in "camelCase". ', ''], ['Field "', '" of input object "', '" should be\n                 ~ in "camelCase". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var NameInCamelCase = function NameInCamelCase(_ref) {
  var input = _ref.input;
  var argument = _ref.argument;

  if (!input || !argument) {
    throw Error('context not passed to rule.');
  }
  var inputName = input.name;
  var name = argument.name;
  var loc = argument.loc;

  if (name !== (0, _jsutilsCasing.camelCase)(name)) {
    return (0, _utils.warning)(_templateObject, name, inputName, loc);
  }
};
exports.NameInCamelCase = NameInCamelCase;