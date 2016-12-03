'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation "', '" defines an argument "', '" as a\n               ~ list of list, which is currently not supported. ', ''], ['Mutation "', '" defines an argument "', '" as a\n               ~ list of list, which is currently not supported. ', '']);

var _utilsJs = require('../../utils.js');

var NoListOfList = function NoListOfList(_ref) {
  var mutation = _ref.mutation;
  var argument = _ref.argument;

  if (!mutation || !argument) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = argument.name;
  var loc = argument.loc;
  var isObjectList = argument.isObjectList;
  var type = argument.type;

  if (isObjectList && type === undefined) {
    return (0, _utilsJs.error)(_templateObject, mutationName, name, loc);
  }
};
exports.NoListOfList = NoListOfList;