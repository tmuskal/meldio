'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.UnionTypeDefinition = UnionTypeDefinition;

var _mappers = require('../mappers');

function UnionTypeDefinition(context) {
  return {
    UnionTypeDefinition: function UnionTypeDefinition(node) {

      if (context.schema[node.name.value]) {
        throw new Error('Name "' + node.name.value + '" cannot be redefined.');
      }

      node.types.forEach(function (namedTypeAST) {
        return context.unionMembership[namedTypeAST.name.value] = (context.unionMembership[namedTypeAST.name.value] || []).concat(node.name.value);
      });

      context.schema[node.name.value] = _extends({
        kind: 'union',
        name: node.name.value
      }, !context.noLocation && node.loc ? {
        loc: {
          kind: 'location',
          start: node.loc.start,
          end: node.loc.end } } : {}, {
        typeNames: node.types.map(function (namedTypeAST) {
          return namedTypeAST.name.value;
        }),
        everyTypeImplementsNode: node.types.map(function (namedTypeAST) {
          return namedTypeAST.name.value;
        }).every(function (typeName) {
          return context.schema[typeName] && context.schema[typeName].kind === 'type' && context.schema[typeName].implementsNode;
        }),
        noTypeImplementsNode: node.types.map(function (namedTypeAST) {
          return namedTypeAST.name.value;
        }).every(function (typeName) {
          return context.schema[typeName] && context.schema[typeName].kind === 'type' && !context.schema[typeName].implementsNode;
        }),
        directives: node.directives.map((0, _mappers.Directive)(context))
      });
    }
  };
}