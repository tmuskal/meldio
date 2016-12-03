'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Connection name ', ' is ambiguous.\n            ~ It refers to a connection on\n            ~ ', '', '\n            ~ and a connection on\n            ~ ', '', '.'], ['Connection name ', ' is ambiguous.\n            ~ It refers to a connection on\n            ~ ', '', '\n            ~ and a connection on\n            ~ ', '', '.']);

var _utilsJs = require('../../utils.js');

var NoAmbiguousConnectionNames = function NoAmbiguousConnectionNames(_ref) {
  var connections = _ref.connections;

  var connectionMap = {};
  var errors = [];

  connections.forEach(function (conn) {
    if (connectionMap[conn.name]) {
      var _connectionMap$conn$name = _slicedToArray(connectionMap[conn.name], 2);

      var type = _connectionMap$conn$name[0];
      var edgeType = _connectionMap$conn$name[1];

      if (type !== conn.type || type.edgeType !== conn.edgeType) {
        errors.push((0, _utilsJs.error)(_templateObject, conn.name, conn.type, conn.edgeType ? ' with ' + conn.edgeType + ' edge' : '', type, edgeType ? ' with ' + edgeType + ' edge' : ''));
      }
    } else {
      connectionMap[conn.name] = [conn.type, conn.edgeType];
    }
  });

  return errors;
};
exports.NoAmbiguousConnectionNames = NoAmbiguousConnectionNames;