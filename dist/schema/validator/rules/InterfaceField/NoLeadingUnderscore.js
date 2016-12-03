'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field name "', '" of interface "', '"\n               ~ cannot start with an underscore "_". ', ''], ['Field name "', '" of interface "', '"\n               ~ cannot start with an underscore "_". ', '']);

var _utils = require('../../utils');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;

  if (name.startsWith('_')) {
    return (0, _utils.error)(_templateObject, name, interfaceName, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;