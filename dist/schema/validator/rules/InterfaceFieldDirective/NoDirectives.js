'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" of "', '" interface cannot\n             ~ have "@', '" directive, that is currently unsupported.\n             ~ ', ''], ['Field "', '" of "', '" interface cannot\n             ~ have "@', '" directive, that is currently unsupported.\n             ~ ', '']);

var _utils = require('../../utils');

var NoDirectives = function NoDirectives(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;
  var directive = _ref.directive;

  if (!inter || !field || !directive) {
    throw Error('context not passed to rule.');
  }

  var interfaceName = inter.name;
  var fieldName = field.name;
  var name = directive.name;
  var loc = directive.loc;

  return (0, _utils.error)(_templateObject, fieldName, interfaceName, name, loc);
};
exports.NoDirectives = NoDirectives;