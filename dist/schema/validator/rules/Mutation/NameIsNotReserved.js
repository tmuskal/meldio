'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation name "', '" is reserved.\n               | The following names are reserved: ', '. ', ''], ['Mutation name "', '" is reserved.\n               | The following names are reserved: ', '. ', '']);

var _utilsJs = require('../../utils.js');

var NameIsNotReserved = function NameIsNotReserved(_ref) {
  var mutation = _ref.mutation;
  var TYPE_RESERVED_WORDS = _ref.TYPE_RESERVED_WORDS;

  if (!mutation) {
    throw Error('context not passed to rule.');
  }
  var name = mutation.name;
  var loc = mutation.loc;

  var reserved = TYPE_RESERVED_WORDS.join(', ');

  if (TYPE_RESERVED_WORDS.includes(name)) {
    return (0, _utilsJs.error)(_templateObject, name, reserved, loc);
  }
};
exports.NameIsNotReserved = NameIsNotReserved;