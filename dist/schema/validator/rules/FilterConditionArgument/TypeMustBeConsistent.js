'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' defines an argument "', '" under\n               ~ "', '" key, however argument with the same name and different\n               ~ type is defined under the following key(s):\n               ~ ', '. ', ''], ['Filter on ', ' defines an argument "', '" under\n               ~ "', '" key, however argument with the same name and different\n               ~ type is defined under the following key(s):\n               ~ ', '. ', '']);

var _jsutilsFlatten = require('../../../../jsutils/flatten');

var _jsutilsFlatten2 = _interopRequireDefault(_jsutilsFlatten);

var _utilsJs = require('../../utils.js');

var TypeMustBeConsistent = function TypeMustBeConsistent(_ref) {
  var filter = _ref.filter;
  var condition = _ref.condition;
  var argument = _ref.argument;

  if (!filter || !condition || !argument) {
    throw Error('context not passed to rule.');
  }
  var filterName = filter.name;
  var conditions = filter.conditions;

  var filterTarget = filterName.replace('Filter#', '');
  var key = condition.key;
  var name = argument.name;
  var loc = argument.loc;
  var type = argument.type;
  var isScalarList = argument.isScalarList;
  var isObjectList = argument.isObjectList;

  var duplicateArgs = (0, _jsutilsFlatten2['default'])(conditions.map(function (cond) {
    return cond.arguments.map(function (arg) {
      return _extends({}, arg, { key: cond.key });
    }).filter(function (arg) {
      return arg.name === name && (arg.type !== type || arg.isScalarList !== isScalarList || arg.isObjectList !== isObjectList);
    });
  }));

  if (duplicateArgs.length) {
    return (0, _utilsJs.error)(_templateObject, filterTarget, name, key, duplicateArgs.map(function (a) {
      return '"' + a.key + '"';
    }).join(', '), loc);
  }
};
exports.TypeMustBeConsistent = TypeMustBeConsistent;