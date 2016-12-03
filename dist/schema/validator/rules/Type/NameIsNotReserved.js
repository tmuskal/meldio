'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Type name "', '" is reserved. The following names\n               ~ are reserved: ', '. ', ''], ['Type name "', '" is reserved. The following names\n               ~ are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameIsNotReserved = function NameIsNotReserved(_ref) {
  var type = _ref.type;
  var TYPE_RESERVED_WORDS = _ref.TYPE_RESERVED_WORDS;

  if (!type) {
    throw Error('context not passed to rule.');
  }
  var name = type.name;
  var loc = type.loc;

  var reserved = TYPE_RESERVED_WORDS.join(', ');

  if (TYPE_RESERVED_WORDS.includes(name)) {
    return (0, _utils.error)(_templateObject, name, reserved, loc);
  }
};
exports.NameIsNotReserved = NameIsNotReserved;