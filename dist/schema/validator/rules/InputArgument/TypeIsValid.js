'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Input object "', '" defines a field "', '" with an\n               ~ unsupported type. Input object fields can only be scalars,\n               ~ input objects, lists of scalars or lists of input objects.\n               ~ ', ''], ['Input object "', '" defines a field "', '" with an\n               ~ unsupported type. Input object fields can only be scalars,\n               ~ input objects, lists of scalars or lists of input objects.\n               ~ ', '']);

var _utils = require('../../utils');

var TypeIsValid = function TypeIsValid(_ref) {
  var input = _ref.input;
  var argument = _ref.argument;
  var schema = _ref.schema;

  if (!input || !argument) {
    throw Error('context not passed to rule.');
  }
  var inputName = input.name;
  var name = argument.name;
  var loc = argument.loc;
  var type = argument.type;
  var isObject = argument.isObject;
  var isObjectList = argument.isObjectList;

  var target = schema[type];

  if ((isObject || isObjectList) && (!target || target.kind !== 'input')) {
    return (0, _utils.error)(_templateObject, inputName, name, loc);
  }
};
exports.TypeIsValid = TypeIsValid;