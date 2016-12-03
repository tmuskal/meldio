'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Argument = Argument;

var _utils = require('./utils');

function Argument(context) {
  var _ASTHelpers = (0, _utils.ASTHelpers)(context);

  var isRequiredField = _ASTHelpers.isRequiredField;
  var isScalarField = _ASTHelpers.isScalarField;
  var getScalarType = _ASTHelpers.getScalarType;
  var isNumericField = _ASTHelpers.isNumericField;
  var getNumericType = _ASTHelpers.getNumericType;
  var isObjectField = _ASTHelpers.isObjectField;
  var getObjectType = _ASTHelpers.getObjectType;
  var getListType = _ASTHelpers.getListType;
  var isListOfScalarField = _ASTHelpers.isListOfScalarField;
  var isListOfObjectField = _ASTHelpers.isListOfObjectField;

  return function (argumentAST) {
    return _extends({
      kind: 'argument',
      name: argumentAST.name.value
    }, !context.noLocation && argumentAST.loc ? {
      loc: {
        kind: 'location',
        start: argumentAST.loc.start,
        end: argumentAST.loc.end } } : {}, {
      isRequired: isRequiredField(argumentAST)
    }, isScalarField(argumentAST, context.schema) ? {
      isScalar: true,
      type: getScalarType(argumentAST) } : {}, isNumericField(argumentAST) ? {
      isNumeric: true,
      type: getNumericType(argumentAST) } : {}, isObjectField(argumentAST) ? {
      isObject: true,
      type: getObjectType(argumentAST) } : {}, isListOfScalarField(argumentAST) ? {
      isScalarList: true,
      type: getScalarType(getListType(argumentAST)) } : {}, isListOfObjectField(argumentAST) ? {
      isObjectList: true,
      type: getObjectType(getListType(argumentAST)) } : {});
  };
}