'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Interface name "', '" cannot end with "', '". The following\n          ~ suffixes are reserved: ', '. ', ''], ['Interface name "', '" cannot end with "', '". The following\n          ~ suffixes are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameSuffixIsNotReserved = function NameSuffixIsNotReserved(_ref) {
  var inter = _ref['interface'];
  var TYPE_RESERVED_SUFFIXES = _ref.TYPE_RESERVED_SUFFIXES;

  if (!inter) {
    throw Error('context not passed to rule.');
  }
  var name = inter.name;
  var loc = inter.loc;

  var reserved = TYPE_RESERVED_SUFFIXES.join(', ');

  return TYPE_RESERVED_SUFFIXES.filter(function (suffix) {
    return name.endsWith(suffix);
  }).map(function (suffix) {
    return (0, _utils.error)(_templateObject, name, suffix, reserved, loc);
  });
};
exports.NameSuffixIsNotReserved = NameSuffixIsNotReserved;