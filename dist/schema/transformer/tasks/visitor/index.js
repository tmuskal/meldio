'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeVisitors = makeVisitors;

var _AddArgsToListsAndConnections = require('./AddArgsToListsAndConnections');

var _RemoveAllDirectives = require('./RemoveAllDirectives');

var _RemoveOrderDefs = require('./RemoveOrderDefs');

var _RemoveMutationDefs = require('./RemoveMutationDefs');

var _RemoveFilterDefs = require('./RemoveFilterDefs');

var _ReplaceEdgeDefs = require('./ReplaceEdgeDefs');

var _ReplaceNodeConnectionDefs = require('./ReplaceNodeConnectionDefs');

var _ReplaceObjectConnectionDefs = require('./ReplaceObjectConnectionDefs');

var _ReplaceScalarConnectionDefs = require('./ReplaceScalarConnectionDefs');

function makeVisitors(accumulator, context) {
  var passes = [];
  // first pass:
  passes.push(_extends({}, (0, _RemoveFilterDefs.RemoveFilterDefs)(accumulator, context), (0, _RemoveOrderDefs.RemoveOrderDefs)(accumulator, context)));
  passes.push(_extends({}, (0, _AddArgsToListsAndConnections.AddArgsToListsAndConnections)(accumulator, context), (0, _RemoveAllDirectives.RemoveAllDirectives)(accumulator, context), (0, _RemoveMutationDefs.RemoveMutationDefs)(accumulator, context), (0, _ReplaceEdgeDefs.ReplaceEdgeDefs)(accumulator, context), (0, _ReplaceNodeConnectionDefs.ReplaceNodeConnectionDefs)(accumulator, context), (0, _ReplaceObjectConnectionDefs.ReplaceObjectConnectionDefs)(accumulator, context), (0, _ReplaceScalarConnectionDefs.ReplaceScalarConnectionDefs)(accumulator, context)));
  return passes;
}