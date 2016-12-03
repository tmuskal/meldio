'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Union name "', '" cannot start with an\n               ~ underscore "_". ', ''], ['Union name "', '" cannot start with an\n               ~ underscore "_". ', '']);

var _utils = require('../../utils');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var union = _ref.union;

  if (!union) {
    throw Error('context not passed to rule.');
  }
  var name = union.name;
  var loc = union.loc;

  if (name.startsWith('_')) {
    return (0, _utils.error)(_templateObject, name, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;