'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Field "', '" of interface "', '" cannot have\n               ~ arguments, that is currently unsupported. ', ''], ['Field "', '" of interface "', '" cannot have\n               ~ arguments, that is currently unsupported. ', '']);

var _utils = require('../../utils');

var NoArguments = function NoArguments(_ref) {
  var inter = _ref['interface'];
  var field = _ref.field;

  if (!inter || !field) {
    throw Error('context not passed to rule.');
  }
  var interfaceName = inter.name;
  var name = field.name;
  var loc = field.loc;
  var hasArguments = field.hasArguments;

  if (hasArguments) {
    return (0, _utils.error)(_templateObject, name, interfaceName, loc);
  }
};
exports.NoArguments = NoArguments;