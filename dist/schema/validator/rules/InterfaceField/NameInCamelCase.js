'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" of interface "', '" should be in\n                 ~ "camelCase". ', ''], ['Field "', '" of interface "', '" should be in\n                 ~ "camelCase". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var NameInCamelCase = function NameInCamelCase(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;

  if (name !== (0, _jsutilsCasing.camelCase)(name)) {
    return (0, _utils.warning)(_templateObject, name, interfaceName, loc);
  }
};
exports.NameInCamelCase = NameInCamelCase;