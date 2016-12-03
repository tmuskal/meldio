'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.InterfaceTypeDefinition = InterfaceTypeDefinition;

var _mappers = require('../mappers');

function InterfaceTypeDefinition(context) {
  return {
    InterfaceTypeDefinition: function InterfaceTypeDefinition(node) {
      var interfaceName = node.name.value;

      if (context.schema[interfaceName]) {
        throw new Error('Name "' + interfaceName + '" cannot be redefined.');
      }

      context.schema[interfaceName] = _extends({
        kind: 'interface',
        name: interfaceName
      }, !context.noLocation && node.loc ? {
        loc: {
          kind: 'location',
          start: node.loc.start,
          end: node.loc.end } } : {}, {
        implementations: context.implementations[interfaceName] || [],
        everyTypeImplementsNode: (context.implementations[interfaceName] || []).length ? (context.implementations[interfaceName] || []).every(function (typeName) {
          return context.schema[typeName] && context.schema[typeName].kind === 'type' && context.schema[typeName].implementsNode;
        }) : false,
        noTypeImplementsNode: (context.implementations[interfaceName] || []).every(function (typeName) {
          return context.schema[typeName] && context.schema[typeName].kind === 'type' && !context.schema[typeName].implementsNode;
        }),
        fields: node.fields.map((0, _mappers.Field)(context)),
        directives: node.directives.map((0, _mappers.Directive)(context))
      });
    }
  };
}