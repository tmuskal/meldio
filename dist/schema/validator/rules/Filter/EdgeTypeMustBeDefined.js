'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' references "', '" edge type, but\n               ~ type is either undefined or invalid. Edge type must be defined\n               ~ and can not implement Node interface. ', ''], ['Filter on ', ' references "', '" edge type, but\n               ~ type is either undefined or invalid. Edge type must be defined\n               ~ and can not implement Node interface. ', '']);

var _utils = require('../../utils');

var EdgeTypeMustBeDefined = function EdgeTypeMustBeDefined(_ref) {
  var filter = _ref.filter;
  var schema = _ref.schema;

  if (!filter) {
    throw Error('context not passed to rule.');
  }
  var name = filter.name;
  var loc = filter.loc;
  var edgeType = filter.edgeType;

  var target = name.replace('Filter#', '');

  var isValid = !edgeType || schema[edgeType] && schema[edgeType].kind === 'type' && !schema[edgeType].implementsNode;

  if (!isValid) {
    return (0, _utils.error)(_templateObject, target, edgeType, loc);
  }
};
exports.EdgeTypeMustBeDefined = EdgeTypeMustBeDefined;