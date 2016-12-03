'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' references "', '", but no\n               ~ such type is defined. Filter must reference a valid type.\n               ~ ', ''], ['Filter on ', ' references "', '", but no\n               ~ such type is defined. Filter must reference a valid type.\n               ~ ', '']);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var TypeMustBeDefined = function TypeMustBeDefined(_ref) {
  var filter = _ref.filter;
  var schema = _ref.schema;

  if (!filter) {
    throw Error('context not passed to rule.');
  }
  var name = filter.name;
  var loc = filter.loc;
  var type = filter.type;

  var target = name.replace('Filter#', '');

  var isDefined = _analyzer.SCALAR_TYPES.includes(type) || schema[type] && ['enum', 'interface', 'union', 'type'].includes(schema[type].kind);

  if (!isDefined) {
    return (0, _utils.error)(_templateObject, target, type, loc);
  }
};
exports.TypeMustBeDefined = TypeMustBeDefined;