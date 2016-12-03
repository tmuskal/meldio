'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$defineProperties = require('babel-runtime/core-js/object/define-properties')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NodeEdge = NodeEdge;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _NodeEdgeObject = require('./NodeEdgeObject');

var _validator = require('./validator');

var _annotations = require('./annotations');

function NodeEdge(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to NodeEdge.');
  var schema = context.schema;
  var crud = context.crud;
  var nodeId = context.nodeId;
  var field = context.field;
  var relatedId = context.relatedId;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to NodeEdge context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to NodeEdge context.');
  (0, _jsutilsInvariant2['default'])(nodeId, 'Must pass nodeId to NodeEdge context.');
  (0, _jsutilsInvariant2['default'])(field, 'Must pass field object to NodeEdge context.');
  (0, _jsutilsInvariant2['default'])(field.isNodeConnection, 'Must pass NodeConnection field object to NodeEdge context.');
  (0, _jsutilsInvariant2['default'])(relatedId, 'Must pass relatedId to NodeEdge context.');

  if (!(this instanceof NodeEdge)) {
    return new NodeEdge(context);
  }

  this.exists = function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          return context$2$0.abrupt('return', crud.NodeConnection.existsEdge(nodeId, field.name, relatedId, field.relatedField));

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.get = function callee$1$0() {
    var data;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(crud.NodeConnection.getEdge(nodeId, field.name, relatedId, field.relatedField));

        case 2:
          data = context$2$0.sent;

          if (!data) {
            context$2$0.next = 5;
            break;
          }

          return context$2$0.abrupt('return', new _NodeEdgeObject.NodeEdgeObject(_extends({}, context, { data: data })));

        case 5:
          return context$2$0.abrupt('return', null);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this['delete'] = function callee$1$0() {
    var isDeleted;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(crud.NodeConnection.deleteEdge(nodeId, field.name, relatedId, field.relatedField));

        case 2:
          isDeleted = context$2$0.sent;
          return context$2$0.abrupt('return', isDeleted ? relatedId : null);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.update = function callee$1$0(update) {
    var annotatedPropsUpdate, isUpdated;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          (0, _validator.throwOnErrors)((0, _validator.validateEdgeUpdate)(_extends({}, context, { 'function': 'update' }), update));
          (0, _jsutilsInvariant2['default'])(field.edgeType, 'Cannot update edge without props');

          annotatedPropsUpdate = (0, _annotations.addTypeAnnotationsToUpdateExp)(context, field.edgeType, update);

          delete annotatedPropsUpdate._type;

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(crud.NodeConnection.updateEdge(nodeId, field.name, relatedId, field.relatedField, field.type, field.edgeType, annotatedPropsUpdate));

        case 6:
          isUpdated = context$2$0.sent;
          return context$2$0.abrupt('return', isUpdated ? this : null);

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
    relatedId: { get: function get() {
        return relatedId;
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