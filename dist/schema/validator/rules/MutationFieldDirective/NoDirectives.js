'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" of mutation "', '" cannot have\n             ~ a "@', '" directive, that is currently\n             ~ unsupported. ', ''], ['Field "', '" of mutation "', '" cannot have\n             ~ a "@', '" directive, that is currently\n             ~ unsupported. ', '']);

var _utilsJs = require('../../utils.js');

var NoDirectives = function NoDirectives(_ref) {
  var directive = _ref.directive;
  var field = _ref.field;
  var mutation = _ref.mutation;

  if (!mutation || !field || !directive) {
    throw Error('context not passed to rule.');
  }

  return (0, _utilsJs.error)(_templateObject, field.name, mutation.name, directive.name, directive.loc);
};
exports.NoDirectives = NoDirectives;