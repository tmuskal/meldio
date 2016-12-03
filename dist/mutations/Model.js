'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$defineProperties = require('babel-runtime/core-js/object/define-properties')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Model = Model;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _NodeType = require('./NodeType');

function Model(context) {
  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to Model.');
  var schema = context.schema;
  var crud = context.crud;
  var mutation = context.mutation;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to Model context.');
  (0, _jsutilsInvariant2['default'])(crud, 'Must pass crud resolvers to Model context.');
  (0, _jsutilsInvariant2['default'])(mutation, 'Must pass mutation object to Model context.');

  if (!(this instanceof Model)) {
    return new Model(context);
  }

  var nodeTypeGetters = _Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (type) {
    return type.kind === 'type' && type.implementsNode;
  }).map(function (type) {
    return _defineProperty({}, type.name, {
      get: function get() {
        return new _NodeType.NodeType(_extends({}, context, { type: type.name }));
      }
    });
  }).reduce(function (acc, getter) {
    return _extends({}, acc, getter);
  }, {});

  _Object$defineProperties(this, nodeTypeGetters);
  _Object$freeze(this);
}