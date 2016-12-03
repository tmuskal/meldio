'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Type "', '" must include id field of type ID!. ', ''], ['Type "', '" must include id field of type ID!. ', '']);

var _utils = require('../../utils');

var NodeMustDefineId = function NodeMustDefineId(_ref) {
  var type = _ref.type;

  if (!type) {
    throw Error('context not passed to rule.');
  }
  var name = type.name;
  var loc = type.loc;
  var implementsNode = type.implementsNode;
  var fields = type.fields;

  var idField = fields.filter(function (field) {
    return field.name === 'id';
  });
  if (implementsNode && (!idField.length || idField[0].type !== 'ID' || !idField[0].isRequired)) {
    return (0, _utils.error)(_templateObject, name, loc);
  }
};
exports.NodeMustDefineId = NodeMustDefineId;