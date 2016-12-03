'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MutationDefinition = MutationDefinition;

var _mappers = require('../mappers');

function MutationDefinition(context) {
  return {
    MutationDefinition: function MutationDefinition(node) {
      var mutationName = node.name.value;

      if (context.schema[mutationName]) {
        throw new Error('Name "' + mutationName + '" cannot be redefined.');
      }

      context.schema[mutationName] = _extends({
        kind: 'mutation',
        name: mutationName
      }, !context.noLocation && node.loc ? {
        loc: {
          kind: 'location',
          start: node.loc.start,
          end: node.loc.end } } : {}, {
        arguments: node.arguments.map((0, _mappers.Argument)(context)),
        fields: node.fields.map((0, _mappers.Field)(context)),
        directives: node.directives.map((0, _mappers.Directive)(context))
      });
      return undefined; // node remains unchanged
    }
  };
}