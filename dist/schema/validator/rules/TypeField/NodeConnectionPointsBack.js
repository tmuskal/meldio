'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" type defines a\n                 ~ NodeConnection to "', '" and "', '" field.\n                 ~ However, some of the back references are not pointing back to\n                 ~ "', '" and "', '". ', ''], ['Field "', '" on "', '" type defines a\n                 ~ NodeConnection to "', '" and "', '" field.\n                 ~ However, some of the back references are not pointing back to\n                 ~ "', '" and "', '". ', '']);

var _utils = require('../../utils');

var NodeConnectionPointsBack = function NodeConnectionPointsBack(_ref) {
  var t = _ref.type;
  var field = _ref.field;
  var schema = _ref.schema;

  if (!t || !field) {
    throw Error('context not passed to rule.');
  }
  var tName = t.name;
  var implementsInterfaces = t.implementsInterfaces;
  var memberOfUnions = t.memberOfUnions;
  var name = field.name;
  var loc = field.loc;
  var isNodeConnection = field.isNodeConnection;
  var type = field.type;
  var relatedField = field.relatedField;

  var related = schema[type];

  if (isNodeConnection && relatedField && related) {
    var relatedFields = related.kind === 'interface' || related.kind === 'type' ? related.fields.filter(function (f) {
      return f.name === relatedField;
    }) : related.kind === 'union' ? related.typeNames.map(function (typeName) {
      return schema[typeName] && schema[typeName].kind === 'type' ? schema[typeName].fields.filter(function (f) {
        return f.name === relatedField;
      }) : [];
    }).reduce(function (acc, fields) {
      return acc.concat(fields);
    }, []) : [];

    if (relatedFields.length && !relatedFields.every(function (rf) {
      return rf.isNodeConnection && rf.relatedField === name && (rf.type === tName || implementsInterfaces.includes(rf.type) || memberOfUnions.includes(rf.type));
    })) {
      return (0, _utils.error)(_templateObject, name, tName, type, relatedField, tName, name, loc);
    }
  }
};
exports.NodeConnectionPointsBack = NodeConnectionPointsBack;