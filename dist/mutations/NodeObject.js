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
exports.NodeObject = NodeObject;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _validator = require('./validator');

var _NodeConnection = require('./NodeConnection');

var _Node = require('./Node');

var _annotations = require('./annotations');

function NodeObject(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to NodeObject.');

  var schema = context.schema;
  var crud = context.crud;
  var mutation = context.mutation;
  var type = context.type;
  var data = context.data;
  var id = data.id;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to NodeObject context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to NodeObject context.');
  (0, _jsutilsInvariant2['default'])(mutation, 'Must pass mutation object to NodeObject context.');
  (0, _jsutilsInvariant2['default'])(schema[type] && schema[type].kind === 'type', 'Must pass a valid type name to NodeObject context.');
  (0, _jsutilsInvariant2['default'])(schema[type].implementsNode, 'Must pass a type that implements Node to NodeObject context.');
  (0, _jsutilsInvariant2['default'])(data, 'Must pass data to NodeObject context.');
  (0, _jsutilsInvariant2['default'])(id, 'Must pass data with id to NodeObject context.');

  if (!(this instanceof NodeObject)) {
    return new NodeObject(context);
  }

  this['delete'] = function callee$1$0() {
    var isDeleted;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(crud.deleteNode(type, id));

        case 2:
          isDeleted = context$2$0.sent;
          return context$2$0.abrupt('return', isDeleted ? id : null);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.update = function callee$1$0(update) {
    var typeAnnotatedUpdate, isUpdated, nodeContext;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          (0, _validator.throwOnErrors)((0, _validator.validateUpdate)(_extends({}, context, { 'function': 'update' }), update));

          typeAnnotatedUpdate = (0, _annotations.addTypeAnnotationsToUpdateExp)(context, type, update);
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(crud.updateNode(type, id, typeAnnotatedUpdate));

        case 4:
          isUpdated = context$2$0.sent;

          if (!isUpdated) {
            context$2$0.next = 9;
            break;
          }

          nodeContext = _extends({}, context, { id: id });

          delete nodeContext.data;
          return context$2$0.abrupt('return', new _Node.Node(nodeContext));

        case 9:
          return context$2$0.abrupt('return', null);

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var fields = schema[type].fields.filter(function (field) {
    return !field.isNodeConnection && !field.isObjectConnection && !field.isScalarConnection;
  }).map(function (field) {
    return _defineProperty({}, field.name, {
      get: function get() {
        return data[field.name] !== undefined ? data[field.name] : null;
      }
    });
  }).reduce(function (acc, field) {
    return _extends({}, acc, field);
  }, {});

  var nodeConnections = schema[type].fields.filter(function (field) {
    return field.isNodeConnection;
  }).map(function (field) {
    return _defineProperty({}, field.name, {
      get: function get() {
        var nodeConnectionContext = _extends({}, context, { nodeId: id, field: field });
        delete nodeConnectionContext.data;
        return new _NodeConnection.NodeConnection(nodeConnectionContext);
      }
    });
  }).reduce(function (acc, conn) {
    return _extends({}, acc, conn);
  }, {});

  _Object$defineProperties(this, _extends({
    type: { get: function get() {
        return type;
      } }
  }, fields, nodeConnections));
  _Object$freeze(this);
}