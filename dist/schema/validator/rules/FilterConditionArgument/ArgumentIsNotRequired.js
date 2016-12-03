'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' defines an argument "', '" as\n                 ~ required, which probably should not be the case.\n                 ~ Typically, arguments are only applicable to some of the\n                 ~ filter keys and should not be passed when other filter keys\n                 ~ are specified. ', ''], ['Filter on ', ' defines an argument "', '" as\n                 ~ required, which probably should not be the case.\n                 ~ Typically, arguments are only applicable to some of the\n                 ~ filter keys and should not be passed when other filter keys\n                 ~ are specified. ', '']);

var _utilsJs = require('../../utils.js');

var ArgumentIsNotRequired = function ArgumentIsNotRequired(_ref) {
  var filter = _ref.filter;
  var argument = _ref.argument;

  if (!filter || !argument) {
    throw Error('context not passed to rule.');
  }
  var filterName = filter.name;

  var target = filterName.replace('Filter#', '');
  var name = argument.name;
  var loc = argument.loc;
  var isRequired = argument.isRequired;

  if (isRequired) {
    return (0, _utilsJs.warning)(_templateObject, target, name, loc);
  }
};
exports.ArgumentIsNotRequired = ArgumentIsNotRequired;