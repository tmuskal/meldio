'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Directive = Directive;

var SCALAR_KINDS = {
  IntValue: 'Int',
  FloatValue: 'Float',
  StringValue: 'String',
  BooleanValue: 'Boolean',
  EnumValue: 'Enum'
};

function Directive(context) {
  return function (directiveAST) {
    return _extends({
      kind: 'directive',
      name: directiveAST.name.value
    }, !context.noLocation && directiveAST.loc ? {
      loc: {
        kind: 'location',
        start: directiveAST.loc.start,
        end: directiveAST.loc.end } } : {}, {
      arguments: (directiveAST.arguments || []).map(function (argument) {
        return _extends({
          kind: 'directive-argument',
          name: argument.name.value
        }, argument.value.kind === 'IntValue' || argument.value.kind === 'FloatValue' || argument.value.kind === 'EnumValue' || argument.value.kind === 'StringValue' || argument.value.kind === 'BooleanValue' ? {
          type: SCALAR_KINDS[argument.value.kind],
          value: argument.value.value
        } : {
          type: undefined,
          value: undefined
        });
      })
    });
  };
}