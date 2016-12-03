'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive "@rootViewer" is defined on "', '"\n               ~ type which does not implement Node. @rootViewer directive\n               ~ can only be specified on types that implement Node. ', ''], ['Directive "@rootViewer" is defined on "', '"\n               ~ type which does not implement Node. @rootViewer directive\n               ~ can only be specified on types that implement Node. ', '']);

var _utils = require('../../utils');

var RootViewerOnlyOnNode = function RootViewerOnlyOnNode(_ref) {
  var type = _ref.type;
  var directive = _ref.directive;

  if (!type || !directive) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var implementsNode = type.implementsNode;
  var name = directive.name;
  var loc = directive.loc;

  if (name === 'rootViewer' && !implementsNode) {
    return (0, _utils.error)(_templateObject, typeName, loc);
  }
};
exports.RootViewerOnlyOnNode = RootViewerOnlyOnNode;