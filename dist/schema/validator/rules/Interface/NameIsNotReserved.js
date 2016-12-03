'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Interface name "', '" is reserved. The following names\n               ~ are reserved: ', '. ', ''], ['Interface name "', '" is reserved. The following names\n               ~ are reserved: ', '. ', '']);

var _utils = require('../../utils');

var NameIsNotReserved = function NameIsNotReserved(_ref) {
  var inter = _ref['interface'];
  var TYPE_RESERVED_WORDS = _ref.TYPE_RESERVED_WORDS;

  if (!inter) {
    throw Error('context not passed to rule.');
  }
  var name = inter.name;
  var loc = inter.loc;
  var isSystemDefined = inter.isSystemDefined;

  var reserved = TYPE_RESERVED_WORDS.join(', ');

  if (TYPE_RESERVED_WORDS.includes(name) && !isSystemDefined) {
    return (0, _utils.error)(_templateObject, name, reserved, loc);
  }
};
exports.NameIsNotReserved = NameIsNotReserved;