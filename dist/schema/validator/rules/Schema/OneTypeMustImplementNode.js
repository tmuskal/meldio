'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['At least one type must implement Node interface.'], ['At least one type must implement Node interface.']);

var _utilsJs = require('../../utils.js');

var OneTypeMustImplementNode = function OneTypeMustImplementNode(_ref) {
  var schema = _ref.schema;

  var aTypeImplementsNode = _Object$keys(schema).map(function (key) {
    return schema[key];
  }).some(function (def) {
    return def.kind === 'type' && def.implementsNode;
  });

  if (!aTypeImplementsNode) {
    return (0, _utilsJs.error)(_templateObject);
  }
};
exports.OneTypeMustImplementNode = OneTypeMustImplementNode;