'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Input object name "', '" cannot end with "', '".\n          ~ The following suffixes are reserved: ', '. ', ''], ['Input object name "', '" cannot end with "', '".\n          ~ The following suffixes are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameSuffixIsNotReserved = function NameSuffixIsNotReserved(_ref) {
  var input = _ref.input;
  var TYPE_RESERVED_SUFFIXES = _ref.TYPE_RESERVED_SUFFIXES;

  if (!input) {
    throw Error('context not passed to rule.');
  }
  var name = input.name;
  var loc = input.loc;

  var reserved = TYPE_RESERVED_SUFFIXES.join(', ');

  return TYPE_RESERVED_SUFFIXES.filter(function (suffix) {
    return name.endsWith(suffix);
  }).map(function (suffix) {
    return (0, _utils.error)(_templateObject, name, suffix, reserved, loc);
  });
};
exports.NameSuffixIsNotReserved = NameSuffixIsNotReserved;