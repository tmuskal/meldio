'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Union name "', '" is reserved. The following names\n              ~  are reserved: ', '. ', ''], ['Union name "', '" is reserved. The following names\n              ~  are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameIsNotReserved = function NameIsNotReserved(_ref) {
  var union = _ref.union;
  var TYPE_RESERVED_WORDS = _ref.TYPE_RESERVED_WORDS;

  if (!union) {
    throw Error('context not passed to rule.');
  }
  var name = union.name;
  var loc = union.loc;

  var reserved = TYPE_RESERVED_WORDS.join(', ');

  if (TYPE_RESERVED_WORDS.includes(name)) {
    return (0, _utils.error)(_templateObject, name, reserved, loc);
  }
};
exports.NameIsNotReserved = NameIsNotReserved;