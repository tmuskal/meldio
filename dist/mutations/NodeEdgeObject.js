'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$defineProperties = require('babel-runtime/core-js/object/define-properties')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.NodeEdgeObject = NodeEdgeObject;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsGlobalId = require('../jsutils/globalId');

var _validator = require('./validator');

var _NodeObject = require('./NodeObject');

var _NodeEdge = require('./NodeEdge');

var _annotations = require('./annotations');

function NodeEdgeObject(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to NodeEdgeObject.');
  var schema = context.schema;
  var crud = context.crud;
  var nodeId = context.nodeId;
  var field = context.field;
  var relatedId = context.relatedId;
  var data = context.data;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to NodeEdgeObject context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to NodeEdgeObject context.');
  (0, _jsutilsInvariant2['default'])(nodeId, 'Must pass nodeId to NodeEdgeObject context.');
  (0, _jsutilsInvariant2['default'])(field, 'Must pass field object to NodeEdgeObject context.');
  (0, _jsutilsInvariant2['default'])(field.isNodeConnection, 'Must pass NodeConnection field object to NodeEdgeObject context.');
  (0, _jsutilsInvariant2['default'])(relatedId, 'Must pass relatedId to NodeEdgeObject context.');
  (0, _jsutilsInvariant2['default'])(data, 'Must pass data to NodeEdge NodeEdgeObject.');

  if (!(this instanceof NodeEdgeObject)) {
    return new NodeEdgeObject(context);
  }

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
    var annotatedPropsUpdate, isUpdated, nodeEdgeContext;
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

          if (!isUpdated) {
            context$2$0.next = 11;
            break;
          }

          nodeEdgeContext = _extends({}, context);

          delete nodeEdgeContext.data;
          return context$2$0.abrupt('return', new _NodeEdge.NodeEdge(nodeEdgeContext));

        case 11:
          return context$2$0.abrupt('return', null);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var edgeFields = field.edgeType ? schema[field.edgeType].fields.map(function (f) {
    return _defineProperty({}, f.name, {
      get: function get() {
        return data[f.name] !== undefined ? data[f.name] : null;
      }
    });
  }).reduce(function (acc, edgeField) {
    return _extends({}, acc, edgeField);
  }, {}) : {};

  _Object$defineProperties(this, _extends({
    type: { get: function get() {
        return {
          edgeType: field.edgeType,
          nodeType: field.type,
          type: (0, _jsutilsGlobalId.typeFromGlobalId)(data.node.id)
        };
      } }
  }, edgeFields, {
    node: {
      get: function get() {
        var nodeObjectContext = _extends({}, context, {
          type: (0, _jsutilsGlobalId.typeFromGlobalId)(data.node.id),
          data: data.node
        });
        delete nodeObjectContext.field;
        delete nodeObjectContext.nodeId;
        delete nodeObjectContext.relatedId;
        return new _NodeObject.NodeObject(nodeObjectContext);
      }
    }
  }));
  _Object$freeze(this);
}