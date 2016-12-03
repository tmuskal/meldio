'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makePluralIdField = makePluralIdField;

var _jsutilsCasing = require('../../jsutils/casing');

var _makeRequiredListField = require('./makeRequiredListField');

var _makeReqListReqInput = require('./makeReqListReqInput');

function makePluralIdField(fieldName, fieldTypeName, inputFieldName, inputFieldTypeName) {
  return (0, _makeRequiredListField.makeRequiredListField)(fieldTypeName ? fieldName : (0, _jsutilsCasing.camelCase)(fieldName), [(0, _makeReqListReqInput.makeReqListReqInput)(inputFieldName || 'id', inputFieldTypeName || 'ID')], fieldTypeName || fieldName);
}