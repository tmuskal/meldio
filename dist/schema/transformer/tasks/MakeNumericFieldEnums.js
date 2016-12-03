'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakeNumericFieldEnums = MakeNumericFieldEnums;

var _ast = require('../../ast');

function MakeNumericFieldEnums(accumulator, context) {
  var schema = context.schema;
  var connections = context.connections;

  var numericEnums = {};

  connections.filter(function (connection) {
    return schema[connection.type] && schema[connection.type].fields && schema[connection.type].fields.some(function (f) {
      return f.isNumeric;
    });
  }).forEach(function (connection) {
    // flowism:
    if (!schema[connection.type].fields) {
      return;
    }

    if (!numericEnums[connection.type]) {
      numericEnums[connection.type] = (0, _ast.makeEnum)('_' + connection.type + '_NumericFields', schema[connection.type].fields.filter(function (f) {
        return f.isNumeric;
      }).map(function (f) {
        return f.name;
      }));
    }
  });

  connections.filter(function (connection) {
    return schema[connection.edgeType] && schema[connection.edgeType].fields && schema[connection.edgeType].fields.some(function (f) {
      return f.isNumeric;
    });
  }).forEach(function (connection) {
    // flowism:
    if (!schema[connection.edgeType].fields) {
      return;
    }

    if (!numericEnums[connection.edgeType]) {
      numericEnums[connection.edgeType] = (0, _ast.makeEnum)('_' + connection.edgeType + '_NumericFields', schema[connection.edgeType].fields.filter(function (f) {
        return f.isNumeric;
      }).map(function (f) {
        return f.name;
      }));
    }
  });

  return _Object$keys(numericEnums).map(function (key) {
    return numericEnums[key];
  });
}