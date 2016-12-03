'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation name "', '" should be in "camelCase". ', ''], ['Mutation name "', '" should be in "camelCase". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utilsJs = require('../../utils.js');

var NameInCamelCase = function NameInCamelCase(_ref) {
  var mutation = _ref.mutation;

  if (!mutation) {
    throw Error('context not passed to rule.');
  }
  var name = mutation.name;
  var loc = mutation.loc;

  if (name !== (0, _jsutilsCasing.camelCase)(name)) {
    return (0, _utilsJs.warning)(_templateObject, name, loc);
  }
};
exports.NameInCamelCase = NameInCamelCase;