'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Type name "', '" cannot end with "', '". The following\n          ~ suffixes are reserved: ', '. ', ''], ['Type name "', '" cannot end with "', '". The following\n          ~ suffixes are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameSuffixIsNotReserved = function NameSuffixIsNotReserved(_ref) {
  var type = _ref.type;
  var TYPE_RESERVED_SUFFIXES = _ref.TYPE_RESERVED_SUFFIXES;

  if (!type) {
    throw Error('context not passed to rule.');
  }
  var name = type.name;
  var loc = type.loc;

  var reserved = TYPE_RESERVED_SUFFIXES.join(', ');

  return TYPE_RESERVED_SUFFIXES.filter(function (suffix) {
    return name.endsWith(suffix);
  }).map(function (suffix) {
    return (0, _utils.error)(_templateObject, name, suffix, reserved, loc);
  });
};
exports.NameSuffixIsNotReserved = NameSuffixIsNotReserved;