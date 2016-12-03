'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Type "', '" cannot have "@', '" directive,\n               ~ that is currently unsupported. ', ''], ['Type "', '" cannot have "@', '" directive,\n               ~ that is currently unsupported. ', '']);

var _utils = require('../../utils');

var OnlyAllowedDirectives = function OnlyAllowedDirectives(_ref) {
  var type = _ref.type;
  var directive = _ref.directive;

  if (!type || !directive) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var name = directive.name;
  var loc = directive.loc;

  if (name !== 'rootConnection' && name !== 'rootViewer') {
    return (0, _utils.error)(_templateObject, typeName, name, loc);
  }
};
exports.OnlyAllowedDirectives = OnlyAllowedDirectives;