'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation name "', '" cannot start with an\n               ~ underscore "_". ', ''], ['Mutation name "', '" cannot start with an\n               ~ underscore "_". ', '']);

var _utilsJs = require('../../utils.js');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var mutation = _ref.mutation;

  if (!mutation) {
    throw Error('context not passed to rule.');
  }
  var name = mutation.name;
  var loc = mutation.loc;

  if (name.startsWith('_')) {
    return (0, _utilsJs.error)(_templateObject, name, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;