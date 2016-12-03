'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Argument "', '" of filter on ', ' should be in\n                 ~ "camelCase". ', ''], ['Argument "', '" of filter on ', ' should be in\n                 ~ "camelCase". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utilsJs = require('../../utils.js');

var NameInCamelCase = function NameInCamelCase(_ref) {
  var filter = _ref.filter;
  var argument = _ref.argument;

  if (!filter || !argument) {
    throw Error('context not passed to rule.');
  }
  var filterName = filter.name;

  var target = filterName.replace('Filter#', '');
  var name = argument.name;
  var loc = argument.loc;

  if (name !== (0, _jsutilsCasing.camelCase)(name)) {
    return (0, _utilsJs.warning)(_templateObject, name, target, loc);
  }
};
exports.NameInCamelCase = NameInCamelCase;