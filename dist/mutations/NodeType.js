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
exports.NodeType = NodeType;

var _templateObject = _taggedTemplateLiteral(['Failed to add node of "', '" type.'], ['Failed to add node of "', '" type.']);

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsStrip = require('../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsGlobalId = require('../jsutils/globalId');

var _Node = require('./Node');

var _Nodes = require('./Nodes');

var _validator = require('./validator');

var _annotations = require('./annotations');

var AddNodeFailedError = function AddNodeFailedError(context) {
  return {
    context: context,
    results: [(0, _jsutilsStrip2['default'])(_templateObject, context.type)]
  };
};

function NodeType(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to NodeType.');
  var schema = context.schema;
  var crud = context.crud;
  var mutation = context.mutation;
  var type = context.type;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to NodeType context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to NodeType context.');
  (0, _jsutilsInvariant2['default'])(mutation, 'Must pass mutation object to NodeType context.');
  (0, _jsutilsInvariant2['default'])(schema[type] && schema[type].kind === 'type', 'Must pass a valid type to NodeType context.');
  (0, _jsutilsInvariant2['default'])(schema[type].implementsNode, 'Must pass a type that implements Node to NodeType context.');

  if (!(this instanceof NodeType)) {
    return new NodeType(context);
  }

  this.node = function (id) {
    (0, _validator.throwOnErrors)((0, _validator.validateId)(_extends({}, context, { 'function': 'node' }), id));

    return new _Node.Node(_extends({}, context, { id: id }));
  };

  this.filter = function (filter) {
    (0, _validator.throwOnErrors)((0, _validator.validateFilter)(_extends({}, context, { 'function': 'filter' }), filter));

    return new _Nodes.Nodes(_extends({}, context, { filter: filter }));
  };

  this.addNode = function callee$1$0(node) {
    var id, nodeWithId, typeAnnotatedNode, isAdded;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          id = node && node.id ? node.id : (0, _jsutilsGlobalId.newGlobalId)(type);
          nodeWithId = (0, _jsutilsIsNullish2['default'])(node) || typeof node !== 'object' || Array.isArray(node) ? undefined : node.id ? node : _extends({ id: id }, node);

          (0, _validator.throwOnErrors)((0, _validator.validateNode)(_extends({}, context, { 'function': 'addNode' }), nodeWithId));

          typeAnnotatedNode = (0, _annotations.addTypeAnnotations)(context, type, nodeWithId);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(crud.addNode(type, typeAnnotatedNode));

        case 6:
          isAdded = context$2$0.sent;

          if (!isAdded) {
            context$2$0.next = 10;
            break;
          }

          if (!node || !node.id) {
            mutation.globalIds.push(id);
          }
          return context$2$0.abrupt('return', new _Node.Node(_extends({}, context, { id: id })));

        case 10:
          (0, _validator.throwOnErrors)(AddNodeFailedError(context));

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  _Object$defineProperties(this, { type: { get: function get() {
        return type;
      } } });
  _Object$freeze(this);
}