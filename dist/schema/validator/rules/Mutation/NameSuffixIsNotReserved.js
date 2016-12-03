'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation name "', '" cannot end with "', '".\n          | The following suffixes are reserved: ', '. ', ''], ['Mutation name "', '" cannot end with "', '".\n          | The following suffixes are reserved: ', '. ', '']);

var _utilsJs = require('../../utils.js');

var NameSuffixIsNotReserved = function NameSuffixIsNotReserved(_ref) {
  var mutation = _ref.mutation;
  var TYPE_RESERVED_SUFFIXES = _ref.TYPE_RESERVED_SUFFIXES;

  if (!mutation) {
    throw Error('context not passed to rule.');
  }
  var name = mutation.name;
  var loc = mutation.loc;

  var reserved = TYPE_RESERVED_SUFFIXES.join(', ');

  return TYPE_RESERVED_SUFFIXES.filter(function (suffix) {
    return name.endsWith(suffix);
  }).map(function (suffix) {
    return (0, _utilsJs.error)(_templateObject, name, suffix, reserved, loc);
  });
};
exports.NameSuffixIsNotReserved = NameSuffixIsNotReserved;