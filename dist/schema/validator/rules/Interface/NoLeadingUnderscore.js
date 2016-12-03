'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Interface name "', '" cannot start with an\n               ~ underscore "_". ', ''], ['Interface name "', '" cannot start with an\n               ~ underscore "_". ', '']);

var _utils = require('../../utils');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var inter = _ref['interface'];

  if (!inter) {
    throw Error('context not passed to rule.');
  }
  var name = inter.name;
  var loc = inter.loc;

  if (name.startsWith('_')) {
    return (0, _utils.error)(_templateObject, name, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;