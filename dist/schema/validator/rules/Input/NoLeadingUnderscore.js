'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Input object name "', '" cannot start with an\n               ~ underscore "_". ', ''], ['Input object name "', '" cannot start with an\n               ~ underscore "_". ', '']);

var _utils = require('../../utils');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var input = _ref.input;

  if (!input) {
    throw Error('context not passed to rule.');
  }
  var name = input.name;
  var loc = input.loc;

  if (name.startsWith('_')) {
    return (0, _utils.error)(_templateObject, name, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;