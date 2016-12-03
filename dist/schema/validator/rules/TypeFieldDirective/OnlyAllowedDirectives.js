'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" of "', '" type cannot have\n               ~ "@', '" directive, that is currently unsupported. ', ''], ['Field "', '" of "', '" type cannot have\n               ~ "@', '" directive, that is currently unsupported. ', '']);

var _utils = require('../../utils');

var OnlyAllowedDirectives = function OnlyAllowedDirectives(_ref) {
  var type = _ref.type;
  var field = _ref.field;
  var directive = _ref.directive;

  if (!type || !field || !directive) {
    throw Error('context not passed to rule.');
  }

  var typeName = type.name;
  var fieldName = field.name;
  var name = directive.name;
  var loc = directive.loc;

  if (!['rootPluralId', 'resolver'].includes(name)) {
    return (0, _utils.error)(_templateObject, fieldName, typeName, name, loc);
  }
};
exports.OnlyAllowedDirectives = OnlyAllowedDirectives;