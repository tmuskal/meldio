'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Order on ', ' references "', '", but no\n               ~ such type is defined. Order must reference a valid type.\n               ~ ', ''], ['Order on ', ' references "', '", but no\n               ~ such type is defined. Order must reference a valid type.\n               ~ ', '']);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var TypeMustBeDefined = function TypeMustBeDefined(_ref) {
  var order = _ref.order;
  var schema = _ref.schema;

  if (!order) {
    throw Error('context not passed to rule.');
  }
  var name = order.name;
  var loc = order.loc;
  var type = order.type;

  var target = name.replace('Order#', '');

  var isDefined = _analyzer.SCALAR_TYPES.includes(type) || schema[type] && ['enum', 'interface', 'union', 'type'].includes(schema[type].kind);

  if (!isDefined) {
    return (0, _utils.error)(_templateObject, target, type, loc);
  }
};
exports.TypeMustBeDefined = TypeMustBeDefined;