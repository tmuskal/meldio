'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" interface defines a\n                 ~ NodeConnection to "', '" and "', '" field.\n                 ~ However, "', '" field is not defined on\n                 ~ "', '". ', ''], ['Field "', '" on "', '" interface defines a\n                 ~ NodeConnection to "', '" and "', '" field.\n                 ~ However, "', '" field is not defined on\n                 ~ "', '". ', '']);

var _utils = require('../../utils');

var NodeConnectionRelatedFieldExists = function NodeConnectionRelatedFieldExists(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;
  var schema = _ref.schema;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var isNodeConnection = field.isNodeConnection;
  var type = field.type;
  var relatedField = field.relatedField;

  var related = schema[type];

  if (isNodeConnection && relatedField && related) {
    var relatedFieldExists = related.kind === 'interface' || related.kind === 'type' ? related.fields.some(function (f) {
      return f.name === relatedField;
    }) : related.kind === 'union' ? related.typeNames.every(function (typeName) {
      return schema[typeName] && schema[typeName].kind === 'type' && schema[typeName].fields.some(function (f) {
        return f.name === relatedField;
      });
    }) : false;

    if (!relatedFieldExists) {
      return (0, _utils.error)(_templateObject, name, interfaceName, type, relatedField, relatedField, type, loc);
    }
  }
};
exports.NodeConnectionRelatedFieldExists = NodeConnectionRelatedFieldExists;