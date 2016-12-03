'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Argument name "', '" of filter on ', ' is reserved.\n               ~ The following names are reserved: ', '. ', ''], ['Argument name "', '" of filter on ', ' is reserved.\n               ~ The following names are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameIsNotReserved = function NameIsNotReserved(_ref) {
  var filter = _ref.filter;
  var argument = _ref.argument;
  var ARGUMENT_RESERVED_WORDS = _ref.ARGUMENT_RESERVED_WORDS;

  if (!filter || !argument) {
    throw Error('context not passed to rule.');
  }
  var filterName = filter.name;

  var target = filterName.replace('Filter#', '');
  var name = argument.name;
  var loc = argument.loc;

  var reserved = ARGUMENT_RESERVED_WORDS.join(', ');

  if (ARGUMENT_RESERVED_WORDS.includes(name)) {
    return (0, _utils.error)(_templateObject, name, target, reserved, loc);
  }
};
exports.NameIsNotReserved = NameIsNotReserved;