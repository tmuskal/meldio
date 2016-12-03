'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive @resolver cannot be defined on id field of\n               | ', ' type. Types that implement Node interface cannot\n               | have @resolver directive defined on their id field. ', ''], ['Directive @resolver cannot be defined on id field of\n               | ', ' type. Types that implement Node interface cannot\n               | have @resolver directive defined on their id field. ', '']);

var _utils = require('../../utils');

var ResolverNotOnNodeId = function ResolverNotOnNodeId(_ref) {
  var type = _ref.type;
  var field = _ref.field;
  var directive = _ref.directive;

  if (!type || !field || !directive) {
    throw Error('context not passed to rule.');
  }

  var typeName = type.name;
  var implementsNode = type.implementsNode;
  var fieldName = field.name;
  var name = directive.name;
  var loc = directive.loc;

  if (name === 'resolver' && fieldName === 'id' && implementsNode) {
    return (0, _utils.error)(_templateObject, typeName, loc);
  }
};
exports.ResolverNotOnNodeId = ResolverNotOnNodeId;