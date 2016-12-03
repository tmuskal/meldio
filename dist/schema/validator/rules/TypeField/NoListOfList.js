'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Type "', '" defines a field "', '" as a\n               ~ list of list, which is currently not supported. ', ''], ['Type "', '" defines a field "', '" as a\n               ~ list of list, which is currently not supported. ', '']);

var _utils = require('../../utils');

var NoListOfList = function NoListOfList(_ref) {
  var t = _ref.type;
  var field = _ref.field;

  if (!t || !field) {
    throw Error('context not passed to rule.');
  }
  var typeName = t.name;
  var name = field.name;
  var loc = field.loc;
  var isObjectList = field.isObjectList;
  var type = field.type;

  if (isObjectList && type === undefined) {
    return (0, _utils.error)(_templateObject, typeName, name, loc);
  }
};
exports.NoListOfList = NoListOfList;