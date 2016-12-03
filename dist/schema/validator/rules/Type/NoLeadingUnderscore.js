'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Type name "', '" cannot start with an\n               ~ underscore "_". ', ''], ['Type name "', '" cannot start with an\n               ~ underscore "_". ', '']);

var _utils = require('../../utils');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var type = _ref.type;

  if (!type) {
    throw Error('context not passed to rule.');
  }
  var name = type.name;
  var loc = type.loc;

  if (name.startsWith('_')) {
    return (0, _utils.error)(_templateObject, name, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;