'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateEdgeNode = validateEdgeNode;

var _templateObject = _taggedTemplateLiteral(['Node or NodeObject passed to ', ' must be of type\n             ~ "', '".'], ['Node or NodeObject passed to ', ' must be of type\n             ~ "', '".']),
    _templateObject2 = _taggedTemplateLiteral(['Node or NodeObject passed to ', ' must be implementation of\n             ~ "', '" interface.'], ['Node or NodeObject passed to ', ' must be implementation of\n             ~ "', '" interface.']),
    _templateObject3 = _taggedTemplateLiteral(['Node or NodeObject passed to ', ' must be member of\n             ~ "', '" union.'], ['Node or NodeObject passed to ', ' must be member of\n             ~ "', '" union.']);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _Node = require('../Node');

var _NodeObject = require('../NodeObject');

var _validateEdgeNodeId = require('./validateEdgeNodeId');

// node can be Node, NodeObject or a string with id

function validateEdgeNode(context, node) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateEdgeNode.');
  (0, _jsutilsInvariant2['default'])(context['function'] && context.field && context.field.type && context.schema && context.schema[context.field.type] && (context.schema[context.field.type].kind === 'type' || context.schema[context.field.type].kind === 'interface' || context.schema[context.field.type].kind === 'union'), 'must pass correct context to validateEdgeNode.');

  var func = context['function'];
  var schema = context.schema;
  var typeName = context.field.type;

  var type = schema[typeName];

  var validateType = function validateType(givenTypeName) {
    return type.kind === 'type' && givenTypeName !== typeName ? [(0, _jsutilsStrip2['default'])(_templateObject, func, typeName)] : type.kind === 'interface' && !type.implementations.includes(givenTypeName) ? [(0, _jsutilsStrip2['default'])(_templateObject2, func, typeName)] : type.kind === 'union' && !type.typeNames.includes(givenTypeName) ? [(0, _jsutilsStrip2['default'])(_templateObject3, func, typeName)] : [];
  };

  var results = (0, _jsutilsIsNullish2['default'])(node) ? ['Must pass node to ' + func + '.'] : node instanceof _Node.Node || node instanceof _NodeObject.NodeObject ? validateType(node.type) : typeof node === 'string' ? (0, _validateEdgeNodeId.validateEdgeNodeId)(context, node).results : ['Must pass a node id or an instance of Node or NodeObject to ' + func + '.'];

  return { context: context, results: results };
}