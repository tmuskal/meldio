'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" type defines a\n          ~ NodeConnection to "', '" and "', '" field with\n          ~ "', '" edge. However, some of the back references define a\n          ~ different edge type. Edge types must be consistent. ', ''], ['Field "', '" on "', '" type defines a\n          ~ NodeConnection to "', '" and "', '" field with\n          ~ "', '" edge. However, some of the back references define a\n          ~ different edge type. Edge types must be consistent. ', '']);

var _utils = require('../../utils');

var NodeConnectionEdgeTypeIsConsistent = function NodeConnectionEdgeTypeIsConsistent(_ref) {
  var t = _ref.type;
  var field = _ref.field;
  var schema = _ref.schema;

  if (!t || !field) {
    throw Error('context not passed to rule.');
  }
  var tName = t.name;
  var name = field.name;
  var loc = field.loc;
  var isNodeConnection = field.isNodeConnection;
  var type = field.type;
  var relatedField = field.relatedField;
  var edgeType = field.edgeType;

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
      return rf.isNodeConnection && rf.edgeType === edgeType;
    })) {
      return (0, _utils.error)(_templateObject, name, tName, type, relatedField, edgeType, loc);
    }
  }
};
exports.NodeConnectionEdgeTypeIsConsistent = NodeConnectionEdgeTypeIsConsistent;