'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$defineProperties = require('babel-runtime/core-js/object/define-properties')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Nodes = Nodes;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _validator = require('./validator');

var _NodeObject = require('./NodeObject');

var _annotations = require('./annotations');

function Nodes(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to Nodes.');
  var schema = context.schema;
  var crud = context.crud;
  var type = context.type;
  var filter = context.filter;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to Nodes context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to Nodes context.');
  (0, _jsutilsInvariant2['default'])(schema[type] && schema[type].kind === 'type', 'Must pass a valid type name to Nodes context.');
  (0, _jsutilsInvariant2['default'])(schema[type].implementsNode, 'Must pass a type that implements Nodes to Node context.');
  (0, _jsutilsInvariant2['default'])(filter, 'Must pass filter to Nodes context.');

  // filter can be either array of globalIds or filtering expression.

  if (!(this instanceof Nodes)) {
    return new Nodes(context);
  }

  this.list = function callee$1$0() {
    var nodeObjectContext;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          nodeObjectContext = _extends({}, context);

          delete nodeObjectContext.filter;

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(crud.listNodes(type, filter));

        case 4:
          context$2$0.t0 = function (data) {
            return new _NodeObject.NodeObject(_extends({}, nodeObjectContext, { data: data }));
          };

          return context$2$0.abrupt('return', context$2$0.sent.map(context$2$0.t0));

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
          return context$2$0.abrupt('return', crud.deleteNodes(type, filter));

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.update = function callee$1$0(update) {
    var typeAnnotatedUpdate, ids;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          (0, _validator.throwOnErrors)((0, _validator.validateUpdate)(_extends({}, context, { 'function': 'update' }), update));

          typeAnnotatedUpdate = (0, _annotations.addTypeAnnotationsToUpdateExp)(context, type, update);
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(crud.updateNodes(type, filter, typeAnnotatedUpdate));

        case 4:
          ids = context$2$0.sent;
          return context$2$0.abrupt('return', new Nodes(_extends({}, context, { filter: ids })));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  _Object$defineProperties(this, {
    type: { get: function get() {
        return type;
      } },
    filter: { get: function get() {
        return filter;
      } }
  });
  _Object$freeze(this);
}