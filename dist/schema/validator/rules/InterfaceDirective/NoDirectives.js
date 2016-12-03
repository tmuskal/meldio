'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Interface "', '" cannot have a "@', '" directive,\n             ~ that is currently unsupported. ', ''], ['Interface "', '" cannot have a "@', '" directive,\n             ~ that is currently unsupported. ', '']);

var _utilsJs = require('../../utils.js');

var NoDirectives = function NoDirectives(_ref) {
  var inter = _ref['interface'];
  var directive = _ref.directive;

  if (!inter || !directive) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = directive.name;
  var loc = directive.loc;

  return (0, _utilsJs.error)(_templateObject, interfaceName, name, loc);
};
exports.NoDirectives = NoDirectives;