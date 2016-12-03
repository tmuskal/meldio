'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Enum name "', '" cannot start with an\n               ~ underscore "_". ', ''], ['Enum name "', '" cannot start with an\n               ~ underscore "_". ', '']);

var _utils = require('../../utils');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var enumeration = _ref['enum'];

  if (!enumeration) {
    throw Error('context not passed to rule.');
  }
  var name = enumeration.name;
  var loc = enumeration.loc;

  if (name.startsWith('_')) {
    return (0, _utils.error)(_templateObject, name, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;