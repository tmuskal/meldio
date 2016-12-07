'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.transformAST = transformAST;

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _visitor = require('../visitor');

var _analyzer = require('../analyzer');

var _tasks = require('./tasks');

function transformAST(ast, schema) {
  var rootsOnType = arguments.length <= 2 || arguments[2] === undefined ? "_Query" : arguments[2];

  if ((0, _jsutilsIsNullish2['default'])(ast) || (0, _jsutilsIsNullish2['default'])(schema)) {
    throw new Error('must pass ast and schema metadata.');
  }

  // accumulator is mutated by visitors
  var accumulator = {
    mutations: [],
    edgeTypeFields: {},
    filterArguments: {}
  };
  var context = {
    schema: schema,
    connections: (0, _analyzer.allConnections)(schema),
    lists: (0, _analyzer.declaredLists)(schema),
    rootsOnType: rootsOnType
  };
  var visitedAst = (0, _tasks.makeVisitors)(accumulator, context).reduce(function (intermediateAst, visitor) {
    return (0, _visitor.visitAST)(intermediateAst, { leave: visitor });
  }, ast);

  return _extends({}, visitedAst, {
    definitions: visitedAst.definitions.concat((0, _tasks.makeDefinitions)(accumulator, context))
  });
}