'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Input object "', '" defines a field "', '" as a list\n          ~ of list, which is currently not supported. ', ''], ['Input object "', '" defines a field "', '" as a list\n          ~ of list, which is currently not supported. ', '']);

var _utils = require('../../utils');

var NoListOfList = function NoListOfList(_ref) {
  var input = _ref.input;
  var argument = _ref.argument;

  if (!input || !argument) {
    throw Error('context not passed to rule.');
  }
  var inputName = input.name;
  var name = argument.name;
  var loc = argument.loc;
  var isObjectList = argument.isObjectList;
  var type = argument.type;

  if (isObjectList && type === undefined) {
    return (0, _utils.error)(_templateObject, inputName, name, loc);
  }
};
exports.NoListOfList = NoListOfList;