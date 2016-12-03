'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation "', '" cannot have a "@', '" directive,\n             ~ that is currently unsupported. ', ''], ['Mutation "', '" cannot have a "@', '" directive,\n             ~ that is currently unsupported. ', '']);

var _utilsJs = require('../../utils.js');

var NoDirectives = function NoDirectives(_ref) {
  var mutation = _ref.mutation;
  var directive = _ref.directive;

  if (!mutation || !directive) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = directive.name;
  var loc = directive.loc;

  return (0, _utilsJs.error)(_templateObject, mutationName, name, loc);
};
exports.NoDirectives = NoDirectives;