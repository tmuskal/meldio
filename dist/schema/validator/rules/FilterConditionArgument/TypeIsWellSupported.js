'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' defines an argument "', '" with\n               ~ a type that is not well supported by Relay at this time.\n               ~ Filter arguments should be Int, Float, String, Boolean, ID\n               ~ or Enum. ', ''], ['Filter on ', ' defines an argument "', '" with\n               ~ a type that is not well supported by Relay at this time.\n               ~ Filter arguments should be Int, Float, String, Boolean, ID\n               ~ or Enum. ', '']);

var _utilsJs = require('../../utils.js');

var _analyzer = require('../../../analyzer');

var TypeIsWellSupported = function TypeIsWellSupported(_ref) {
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
  var isScalarList = argument.isScalarList;
  var isObjectList = argument.isObjectList;

  var target = schema[type];
  var isEnum = target && target.kind === 'enum';
  var isScalar = _analyzer.SCALAR_TYPES.includes(type);

  if (!isEnum && !isScalar || isScalarList || isObjectList) {
    return (0, _utilsJs.warning)(_templateObject, filterTarget, name, loc);
  }
};
exports.TypeIsWellSupported = TypeIsWellSupported;