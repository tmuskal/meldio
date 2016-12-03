'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" in type "', '" should be in\n                 ~ "camelCase". ', ''], ['Field "', '" in type "', '" should be in\n                 ~ "camelCase". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var NameInCamelCase = function NameInCamelCase(_ref) {
  var type = _ref.type;
  var field = _ref.field;

  if (!type || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var name = field.name;
  var loc = field.loc;

  if (name !== (0, _jsutilsCasing.camelCase)(name)) {
    return (0, _utils.warning)(_templateObject, name, typeName, loc);
  }
};
exports.NameInCamelCase = NameInCamelCase;