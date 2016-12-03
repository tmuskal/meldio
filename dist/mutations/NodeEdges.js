'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$defineProperties = require('babel-runtime/core-js/object/define-properties')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NodeEdges = NodeEdges;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _NodeEdgeObject = require('./NodeEdgeObject');

var _validator = require('./validator');

var _annotations = require('./annotations');

function NodeEdges(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to NodeEdges.');
  var schema = context.schema;
  var crud = context.crud;
  var nodeId = context.nodeId;
  var field = context.field;
  var filter = context.filter;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to NodeEdges context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to NodeEdges context.');
  (0, _jsutilsInvariant2['default'])(nodeId, 'Must pass nodeId to NodeEdges context.');
  (0, _jsutilsInvariant2['default'])(field, 'Must pass field object to NodeEdges context.');
  (0, _jsutilsInvariant2['default'])(field.isNodeConnection, 'Must pass NodeConnection field object to NodeEdges context.');
  (0, _jsutilsInvariant2['default'])(filter, 'Must pass filter to NodeEdges context.');

  if (!(this instanceof NodeEdges)) {
    return new NodeEdges(context);
  }

  this.list = function callee$1$0() {
    var nodeEdgeObjectContext, edges;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          nodeEdgeObjectContext = _extends({}, context);

          delete nodeEdgeObjectContext.filter;

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(crud.NodeConnection.listEdges(nodeId, field.name, field.type, field.edgeType, filter));

        case 4:
          edges = context$2$0.sent;
          return context$2$0.abrupt('return', edges.map(function (data) {
            return new _NodeEdgeObject.NodeEdgeObject(_extends({}, nodeEdgeObjectContext, {
              relatedId: data.node.id,
              data: data
            }));
          }));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this['delete'] = function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          return context$2$0.abrupt('return', crud.NodeConnection.deleteEdges(nodeId, field.name, field.type, field.edgeType, filter));

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.update = function callee$1$0(update) {
    var annotatedPropsUpdate, ids;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          (0, _validator.throwOnErrors)((0, _validator.validateEdgeUpdate)(_extends({}, context, { 'function': 'update' }), update));
          (0, _jsutilsInvariant2['default'])(field.edgeType, 'Cannot update edge without props');

          annotatedPropsUpdate = (0, _annotations.addTypeAnnotationsToUpdateExp)(context, field.edgeType, update);

          delete annotatedPropsUpdate._type;

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(crud.NodeConnection.updateEdges(nodeId, field.name, field.type, field.edgeType, filter, annotatedPropsUpdate));

        case 6:
          ids = context$2$0.sent;
          return context$2$0.abrupt('return', new NodeEdges(_extends({}, context, { filter: ids })));

        case 8:
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
    filter: { get: function get() {
        return filter;
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