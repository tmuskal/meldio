'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.EnumTypeDefinition = EnumTypeDefinition;

function EnumTypeDefinition(context) {
  return {
    EnumTypeDefinition: function EnumTypeDefinition(node) {
      if (context.schema[node.name.value]) {
        throw new Error('Name "' + node.name.value + '" cannot be redefined.');
      }
      context.schema[node.name.value] = _extends({
        kind: 'enum',
        name: node.name.value
      }, !context.noLocation && node.loc ? {
        loc: {
          kind: 'location',
          start: node.loc.start,
          end: node.loc.end } } : {}, {
        values: node.values.map(function (valDefAST) {
          return valDefAST.name.value;
        })
      });
      return undefined; // node remains unchanged
    }
  };
}