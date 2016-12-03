'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive "@rootConnection" is defined on "', '"\n               ~ type which does not implement Node. @rootConnection directive\n               ~ can only be specified on types that implement Node. ', ''], ['Directive "@rootConnection" is defined on "', '"\n               ~ type which does not implement Node. @rootConnection directive\n               ~ can only be specified on types that implement Node. ', '']);

var _utils = require('../../utils');

var RootConnectionOnlyOnNode = function RootConnectionOnlyOnNode(_ref) {
  var type = _ref.type;
  var directive = _ref.directive;

  if (!type || !directive) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var implementsNode = type.implementsNode;
  var name = directive.name;
  var loc = directive.loc;

  if (name === 'rootConnection' && !implementsNode) {
    return (0, _utils.error)(_templateObject, typeName, loc);
  }
};
exports.RootConnectionOnlyOnNode = RootConnectionOnlyOnNode;