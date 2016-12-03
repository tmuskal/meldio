'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field name "', '" in type "', '"\n               ~ cannot start with an underscore "_". ', ''], ['Field name "', '" in type "', '"\n               ~ cannot start with an underscore "_". ', '']);

var _utils = require('../../utils');

var NoLeadingUnderscore = function NoLeadingUnderscore(_ref) {
  var type = _ref.type;
  var field = _ref.field;

  if (!type || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var name = field.name;
  var loc = field.loc;

  if (name.startsWith('_')) {
    return (0, _utils.error)(_templateObject, name, typeName, loc);
  }
};
exports.NoLeadingUnderscore = NoLeadingUnderscore;