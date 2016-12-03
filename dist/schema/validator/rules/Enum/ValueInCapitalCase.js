'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Enum value "', '" defined in enum "', '" should be in\n            ~ "CAPITAL_CASE". ', ''], ['Enum value "', '" defined in enum "', '" should be in\n            ~ "CAPITAL_CASE". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var ValueInCapitalCase = function ValueInCapitalCase(_ref) {
  var enumeration = _ref['enum'];

  if (!enumeration) {
    throw Error('context not passed to rule.');
  }
  var name = enumeration.name;
  var values = enumeration.values;
  var loc = enumeration.loc;

  return values.filter(function (value) {
    return value !== (0, _jsutilsCasing.capitalCase)(value);
  }).map(function (value) {
    return (0, _utils.warning)(_templateObject, value, name, loc);
  });
};
exports.ValueInCapitalCase = ValueInCapitalCase;