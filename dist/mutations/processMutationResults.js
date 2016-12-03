'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.processMutationResults = processMutationResults;

var _Node = require('./Node');

var _NodeEdge = require('./NodeEdge');

var _Nodes = require('./Nodes');

var _NodeEdges = require('./NodeEdges');

function processMutationResults(results) {
  var processedResults;
  return _regeneratorRuntime.async(function processMutationResults$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_Promise.all(_Object$keys(results).map(function callee$1$0(key) {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(results[key] instanceof _Node.Node || results[key] instanceof _NodeEdge.NodeEdge)) {
                  context$2$0.next = 9;
                  break;
                }

                context$2$0.t1 = {};
                context$2$0.t2 = key;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(results[key].get());

              case 5:
                context$2$0.t3 = context$2$0.sent;
                context$2$0.t0 = _defineProperty(context$2$0.t1, context$2$0.t2, context$2$0.t3);
                context$2$0.next = 20;
                break;

              case 9:
                if (!(results[key] instanceof _Nodes.Nodes || results[key] instanceof _NodeEdges.NodeEdges)) {
                  context$2$0.next = 18;
                  break;
                }

                context$2$0.t5 = {};
                context$2$0.t6 = key;
                context$2$0.next = 14;
                return _regeneratorRuntime.awrap(results[key].list());

              case 14:
                context$2$0.t7 = context$2$0.sent;
                context$2$0.t4 = _defineProperty(context$2$0.t5, context$2$0.t6, context$2$0.t7);
                context$2$0.next = 19;
                break;

              case 18:
                context$2$0.t4 = _defineProperty({}, key, results[key]);

              case 19:
                context$2$0.t0 = context$2$0.t4;

              case 20:
                return context$2$0.abrupt('return', context$2$0.t0);

              case 21:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })));

      case 2:
        processedResults = context$1$0.sent;
        return context$1$0.abrupt('return', processedResults.reduce(function (acc, result) {
          return _extends({}, acc, result);
        }, {}));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}