'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive @rootPluralId cannot be defined on "', '" type\n               ~ because "', '" does not implement Node. ', ''], ['Directive @rootPluralId cannot be defined on "', '" type\n               ~ because "', '" does not implement Node. ', '']);

var _utils = require('../../utils');

var RootPluralIdOnlyOnNode = function RootPluralIdOnlyOnNode(_ref) {
  var type = _ref.type;
  var field = _ref.field;
  var directive = _ref.directive;

  if (!type || !field || !directive) {
    throw Error('context not passed to rule.');
  }

  var typeName = type.name;
  var implementsNode = type.implementsNode;
  var name = directive.name;
  var loc = directive.loc;

  if (name === 'rootPluralId' && !implementsNode) {
    return (0, _utils.error)(_templateObject, typeName, typeName, loc);
  }
};
exports.RootPluralIdOnlyOnNode = RootPluralIdOnlyOnNode;