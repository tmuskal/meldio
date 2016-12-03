'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" type defines a\n               ~ ScalarConnection with an invalid type.  Type can be a scalar\n               ~ or an enum. ', ''], ['Field "', '" on "', '" type defines a\n               ~ ScalarConnection with an invalid type.  Type can be a scalar\n               ~ or an enum. ', '']);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var ScalarConnectionTypeIsValid = function ScalarConnectionTypeIsValid(_ref) {
  var t = _ref.type;
  var field = _ref.field;
  var schema = _ref.schema;

  if (!t || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = t.name;
  var name = field.name;
  var loc = field.loc;
  var isScalarConnection = field.isScalarConnection;
  var type = field.type;

  var related = schema[type];

  if (isScalarConnection && !_analyzer.SCALAR_TYPES.includes(type) && (!related || related.kind !== 'enum')) {
    return (0, _utils.error)(_templateObject, name, typeName, loc);
  }
};
exports.ScalarConnectionTypeIsValid = ScalarConnectionTypeIsValid;