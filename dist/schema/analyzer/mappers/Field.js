'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Field = Field;

var _Directive = require('./Directive');

var _utils = require('./utils');

function Field(context) {
  var directivesMapper = (0, _Directive.Directive)(context);

  var _ASTHelpers = (0, _utils.ASTHelpers)(context);

  var isRequiredField = _ASTHelpers.isRequiredField;
  var isScalarField = _ASTHelpers.isScalarField;
  var getScalarType = _ASTHelpers.getScalarType;
  var isNumericField = _ASTHelpers.isNumericField;
  var getNumericType = _ASTHelpers.getNumericType;
  var isObjectField = _ASTHelpers.isObjectField;
  var getObjectType = _ASTHelpers.getObjectType;
  var isNodeConnectionField = _ASTHelpers.isNodeConnectionField;
  var isObjectConnectionField = _ASTHelpers.isObjectConnectionField;
  var isScalarConnectionField = _ASTHelpers.isScalarConnectionField;
  var getConnectionType = _ASTHelpers.getConnectionType;
  var getConnectionRelatedField = _ASTHelpers.getConnectionRelatedField;
  var getConnectionEdgeType = _ASTHelpers.getConnectionEdgeType;
  var isEdgeField = _ASTHelpers.isEdgeField;
  var getEdgeFieldType = _ASTHelpers.getEdgeFieldType;
  var getEdgeFieldEdgeType = _ASTHelpers.getEdgeFieldEdgeType;
  var getListType = _ASTHelpers.getListType;
  var isListOfScalarField = _ASTHelpers.isListOfScalarField;
  var isListOfObjectField = _ASTHelpers.isListOfObjectField;

  return function (field) {
    return _extends({
      kind: 'field',
      name: field.name.value
    }, !context.noLocation && field.loc ? {
      loc: {
        kind: 'location',
        start: field.loc.start,
        end: field.loc.end } } : {}, {
      isRequired: isRequiredField(field)
    }, isScalarField(field, context.schema) ? {
      isScalar: true,
      type: getScalarType(field) } : {}, isNumericField(field) ? {
      isNumeric: true,
      type: getNumericType(field) } : {}, isObjectField(field) ? {
      isObject: true,
      type: getObjectType(field) } : {}, isNodeConnectionField(field) ? {
      isNodeConnection: true,
      type: getObjectType(getConnectionType(field)),
      relatedField: getConnectionRelatedField(field),
      edgeType: getConnectionEdgeType(field) } : {}, isObjectConnectionField(field) ? {
      isObjectConnection: true,
      type: getObjectType(getConnectionType(field)),
      edgeType: getConnectionEdgeType(field) } : {}, isScalarConnectionField(field) ? {
      isScalarConnection: true,
      type: getScalarType(getConnectionType(field)),
      edgeType: getConnectionEdgeType(field) } : {}, isEdgeField(field) ? {
      isEdge: true,
      type: getEdgeFieldType(field),
      edgeType: getEdgeFieldEdgeType(field) } : {}, isListOfScalarField(field) ? {
      isScalarList: true,
      type: getScalarType(getListType(field)) } : {}, isListOfObjectField(field) ? {
      isObjectList: true,
      type: getObjectType(getListType(field)) } : {}, {
      hasArguments: Boolean(field.arguments && field.arguments.length),
      args: field.arguments.map(function (arg) {
        return { name: arg.name.value, type: getObjectType(arg) };
      }),
      directives: (field.directives || []).map(directivesMapper)
    });
  };
}