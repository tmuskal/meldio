'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Interface "', '" defines a field "', '" as a\n               ~ list of list, which is currently not supported. ', ''], ['Interface "', '" defines a field "', '" as a\n               ~ list of list, which is currently not supported. ', '']);

var _utils = require('../../utils');

var NoListOfList = function NoListOfList(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var isObjectList = field.isObjectList;
  var type = field.type;

  if (isObjectList && type === undefined) {
    return (0, _utils.error)(_templateObject, interfaceName, name, loc);
  }
};
exports.NoListOfList = NoListOfList;