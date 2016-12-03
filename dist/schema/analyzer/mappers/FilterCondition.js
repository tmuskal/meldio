'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.FilterCondition = FilterCondition;

var _Argument = require('./Argument');

function FilterCondition(context) {

  return function (condition) {
    return _extends({
      kind: 'filter-condition'
    }, !context.noLocation && condition.loc ? {
      loc: {
        kind: 'location',
        start: condition.loc.start,
        end: condition.loc.end } } : {}, {
      key: condition.key.name.value,
      arguments: condition.arguments.map((0, _Argument.Argument)(context)),
      conditionAST: condition.condition
    });
  };
}