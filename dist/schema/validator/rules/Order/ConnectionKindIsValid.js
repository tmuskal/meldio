'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Order on ', ' refereces type "', '" that is not\n               ~ scalar. ', ''], ['Order on ', ' refereces type "', '" that is not\n               ~ scalar. ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Order on ', ' refereces "', '" which is invalid for\n               ~ ObjectConnection. ', ''], ['Order on ', ' refereces "', '" which is invalid for\n               ~ ObjectConnection. ', '']),
    _templateObject3 = _taggedTemplateLiteral(['Order on ', ' refereces "', '" which is invalid for\n               ~ NodeConnection. ', ''], ['Order on ', ' refereces "', '" which is invalid for\n               ~ NodeConnection. ', '']);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var ConnectionKindIsValid = function ConnectionKindIsValid(_ref) {
  var order = _ref.order;
  var schema = _ref.schema;

  if (!order) {
    throw Error('context not passed to rule.');
  }
  var name = order.name;
  var loc = order.loc;
  var type = order.type;
  var isScalarConnection = order.isScalarConnection;
  var isObjectConnection = order.isObjectConnection;
  var isNodeConnection = order.isNodeConnection;

  var target = name.replace('Order#', '');

  var related = schema[type];

  if (isScalarConnection && !_analyzer.SCALAR_TYPES.includes(type) && (!related || related.kind !== 'enum')) {
    return (0, _utils.error)(_templateObject, target, type, loc);
  }

  if (!related) {
    return;
  } // will be caught by TypeMustBeDefined rule

  if (isObjectConnection && (related.kind !== 'type' || related.implementsNode) && (related.kind !== 'interface' || related.everyTypeImplementsNode) && (related.kind !== 'union' || related.everyTypeImplementsNode)) {
    return (0, _utils.error)(_templateObject2, target, type, loc);
  }

  if (isNodeConnection && (related.kind !== 'type' || !related.implementsNode) && (related.kind !== 'interface' || !related.everyTypeImplementsNode) && (related.kind !== 'union' || !related.everyTypeImplementsNode)) {
    return (0, _utils.error)(_templateObject3, target, type, loc);
  }
};
exports.ConnectionKindIsValid = ConnectionKindIsValid;