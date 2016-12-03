'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' defines an argument "', '" with\n               ~ an unsupported type. Filter arguments can only be scalars,\n               ~ input objects, lists of scalars or lists of input objects.\n               ~ ', ''], ['Filter on ', ' defines an argument "', '" with\n               ~ an unsupported type. Filter arguments can only be scalars,\n               ~ input objects, lists of scalars or lists of input objects.\n               ~ ', '']);

var _utilsJs = require('../../utils.js');

var TypeIsValid = function TypeIsValid(_ref) {
  var filter = _ref.filter;
  var argument = _ref.argument;
  var schema = _ref.schema;

  if (!filter || !argument) {
    throw Error('context not passed to rule.');
  }
  var filterName = filter.name;

  var filterTarget = filterName.replace('Filter#', '');
  var name = argument.name;
  var loc = argument.loc;
  var type = argument.type;
  var isObject = argument.isObject;
  var isObjectList = argument.isObjectList;

  var target = schema[type];

  if ((isObject || isObjectList) && (!target || target.kind !== 'input')) {
    return (0, _utilsJs.error)(_templateObject, filterTarget, name, loc);
  }
};
exports.TypeIsValid = TypeIsValid;