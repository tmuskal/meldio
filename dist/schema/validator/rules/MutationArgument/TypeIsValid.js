'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation "', '" defines an argument "', '" with\n               ~ an unsupported type. Mutation arguments can only be scalars,\n               ~ input objects, lists of scalars or lists of input objects.\n               ~ ', ''], ['Mutation "', '" defines an argument "', '" with\n               ~ an unsupported type. Mutation arguments can only be scalars,\n               ~ input objects, lists of scalars or lists of input objects.\n               ~ ', '']);

var _utilsJs = require('../../utils.js');

var TypeIsValid = function TypeIsValid(_ref) {
  var mutation = _ref.mutation;
  var argument = _ref.argument;
  var schema = _ref.schema;

  if (!mutation || !argument) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = argument.name;
  var loc = argument.loc;
  var type = argument.type;
  var isObject = argument.isObject;
  var isObjectList = argument.isObjectList;

  var target = schema[type];

  if ((isObject || isObjectList) && (!target || target.kind !== 'input')) {
    return (0, _utilsJs.error)(_templateObject, mutationName, name, loc);
  }
};
exports.TypeIsValid = TypeIsValid;