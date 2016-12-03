'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$defineProperties = require('babel-runtime/core-js/object/define-properties')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NodeConnection = NodeConnection;

var _templateObject = _taggedTemplateLiteral(['Failed to add "', '" connection edge from\n                 ~ node "', '" to node "', '".'], ['Failed to add "', '" connection edge from\n                 ~ node "', '" to node "', '".']);

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsStrip = require('../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsGlobalId = require('../jsutils/globalId');

var _NodeEdge = require('./NodeEdge');

var _NodeEdges = require('./NodeEdges');

var _validator = require('./validator');

var _annotations = require('./annotations');

var AddEdgeFailedError = function AddEdgeFailedError(context) {
  return {
    context: context,
    results: [(0, _jsutilsStrip2['default'])(_templateObject, context.field.name, context.nodeId, context.relatedId)]
  };
};

function NodeConnection(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to NodeConnection.');
  var schema = context.schema;
  var crud = context.crud;
  var mutation = context.mutation;
  var nodeId = context.nodeId;
  var field = context.field;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to NodeConnection context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to NodeConnection context.');
  (0, _jsutilsInvariant2['default'])(mutation, 'Must pass mutation object to NodeConnection context.');
  (0, _jsutilsInvariant2['default'])(nodeId, 'Must pass nodeId to NodeConnection context.');
  (0, _jsutilsInvariant2['default'])(field, 'Must pass field object to NodeConnection context.');
  (0, _jsutilsInvariant2['default'])(field.isNodeConnection, 'Must pass NodeConnection field object to NodeConnection context.');

  if (!(this instanceof NodeConnection)) {
    return new NodeConnection(context);
  }

  this.edge = function (relatedId) {
    (0, _validator.throwOnErrors)((0, _validator.validateEdgeNodeId)(_extends({}, context, { 'function': 'edge' }), relatedId));

    return new _NodeEdge.NodeEdge(_extends({}, context, { relatedId: relatedId }));
  };

  this.filter = function (filter) {
    (0, _validator.throwOnErrors)((0, _validator.validateEdgeFilter)(_extends({}, context, { 'function': 'filter' }), filter));

    return new _NodeEdges.NodeEdges(_extends({}, context, { filter: filter }));
  };

  this.nodeIds = function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          return context$2$0.abrupt('return', crud.NodeConnection.listRelatedNodeIds(nodeId, field.name));

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.addEdge = function callee$1$0(node, props) {
    var addEdgeContext, relatedId, id, nodeField, relatedField, annotatedProps, isAdded;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          addEdgeContext = _extends({}, context, { 'function': 'addEdge' });

          (0, _validator.throwOnErrors)((0, _validator.mergeResults)((0, _validator.validateEdgeNode)(addEdgeContext, node), (0, _validator.validateEdgeProps)(addEdgeContext, props)));

          // node can be Node, NodeObject or a string with id
          relatedId = node.id || node;
          id = (0, _jsutilsGlobalId.newGlobalId)(crud.EDGE_COLLECTION);
          nodeField = field.name;
          relatedField = field.relatedField;
          annotatedProps = field.edgeType ? (0, _annotations.addTypeAnnotations)(context, field.edgeType, props) : undefined;

          if (annotatedProps) {
            delete annotatedProps._type;
          }

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(crud.NodeConnection.addEdge(id, nodeId, nodeField, relatedId, relatedField, annotatedProps));

        case 10:
          isAdded = context$2$0.sent;

          if (!isAdded) {
            context$2$0.next = 14;
            break;
          }

          mutation.globalIds.push(id);
          return context$2$0.abrupt('return', new _NodeEdge.NodeEdge(_extends({}, context, { nodeId: nodeId, relatedId: relatedId })));

        case 14:
          (0, _validator.throwOnErrors)(AddEdgeFailedError(_extends({}, context, { nodeId: nodeId, relatedId: relatedId })));

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  _Object$defineProperties(this, {
    nodeId: { get: function get() {
        return nodeId;
      } },
    nodeField: { get: function get() {
        return field.name;
      } },
    relatedField: { get: function get() {
        return field.relatedField;
      } },
    nodeType: { get: function get() {
        return field.type;
      } },
    edgeType: { get: function get() {
        return field.edgeType;
      } }
  });
  _Object$freeze(this);
}