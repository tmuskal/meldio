'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" mutation defines an edge\n              ~ with "', '" type and "', '" edge type.\n              ~ However a connection field with these properties has not been\n              ~ defined elsewhere. ', ''], ['Field "', '" on "', '" mutation defines an edge\n              ~ with "', '" type and "', '" edge type.\n              ~ However a connection field with these properties has not been\n              ~ defined elsewhere. ', '']);

var _utilsJs = require('../../utils.js');

var EdgeConnectionIsDefined = function EdgeConnectionIsDefined(_ref) {
  var mutation = _ref.mutation;
  var field = _ref.field;
  var connections = _ref.connections;

  if (!mutation || !field) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = field.name;
  var loc = field.loc;
  var type = field.type;
  var edgeType = field.edgeType;
  var isEdge = field.isEdge;

  var isConnectionDefined = connections.some(function (conn) {
    return conn.type === type && (!edgeType || edgeType === conn.edgeType);
  });

  if (isEdge && !isConnectionDefined) {
    return (0, _utilsJs.error)(_templateObject, name, mutationName, type, edgeType, loc);
  }
};
exports.EdgeConnectionIsDefined = EdgeConnectionIsDefined;