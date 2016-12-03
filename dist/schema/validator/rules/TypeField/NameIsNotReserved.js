'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field name "', '" in type "', '" is\n                 ~ reserved. The following field names are reserved:\n                 ~ ', '. ', ''], ['Field name "', '" in type "', '" is\n                 ~ reserved. The following field names are reserved:\n                 ~ ', '. ', '']);

var _utils = require('../../utils');

var NameIsNotReserved = function NameIsNotReserved(_ref) {
  var type = _ref.type;
  var field = _ref.field;
  var FIELD_RESERVED_WORDS = _ref.FIELD_RESERVED_WORDS;

  if (!type || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = type.name;
  var name = field.name;
  var loc = field.loc;

  var reserved = FIELD_RESERVED_WORDS.join(', ');

  if (FIELD_RESERVED_WORDS.includes(name)) {
    return (0, _utils.error)(_templateObject, name, typeName, reserved, loc);
  }
};
exports.NameIsNotReserved = NameIsNotReserved;