'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Union "', '" cannot have a "@', '" directive,\n             ~ that is currently unsupported. ', ''], ['Union "', '" cannot have a "@', '" directive,\n             ~ that is currently unsupported. ', '']);

var _utilsJs = require('../../utils.js');

var NoDirectives = function NoDirectives(_ref) {
  var union = _ref.union;
  var directive = _ref.directive;

  if (!union || !directive) {
    throw Error('context not passed to rule.');
  }
  var unionName = union.name;
  var name = directive.name;
  var loc = directive.loc;

  return (0, _utilsJs.error)(_templateObject, unionName, name, loc);
};
exports.NoDirectives = NoDirectives;