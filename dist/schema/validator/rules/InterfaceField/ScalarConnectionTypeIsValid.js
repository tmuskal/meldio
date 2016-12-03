'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" on "', '" interface defines a\n               ~ ScalarConnection with an invalid type.  Type can be a scalar\n               ~ or an enum. ', ''], ['Field "', '" on "', '" interface defines a\n               ~ ScalarConnection with an invalid type.  Type can be a scalar\n               ~ or an enum. ', '']);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var ScalarConnectionTypeIsValid = function ScalarConnectionTypeIsValid(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;
  var schema = _ref.schema;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var isScalarConnection = field.isScalarConnection;
  var type = field.type;

  var related = schema[type];

  if (isScalarConnection && !_analyzer.SCALAR_TYPES.includes(type) && (!related || related.kind !== 'enum')) {
    return (0, _utils.error)(_templateObject, name, interfaceName, loc);
  }
};
exports.ScalarConnectionTypeIsValid = ScalarConnectionTypeIsValid;