'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Input object name "', '" is reserved. The following names\n               ~ are reserved: ', '. ', ''], ['Input object name "', '" is reserved. The following names\n               ~ are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameIsNotReserved = function NameIsNotReserved(_ref) {
  var input = _ref.input;
  var TYPE_RESERVED_WORDS = _ref.TYPE_RESERVED_WORDS;

  if (!input) {
    throw Error('context not passed to rule.');
  }
  var name = input.name;
  var loc = input.loc;

  var reserved = TYPE_RESERVED_WORDS.join(', ');

  if (TYPE_RESERVED_WORDS.includes(name)) {
    return (0, _utils.error)(_templateObject, name, reserved, loc);
  }
};
exports.NameIsNotReserved = NameIsNotReserved;