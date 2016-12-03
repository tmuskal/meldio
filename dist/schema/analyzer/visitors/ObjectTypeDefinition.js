'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ObjectTypeDefinition = ObjectTypeDefinition;

var _mappers = require('../mappers');

function ObjectTypeDefinition(context) {
  return {
    ObjectTypeDefinition: function ObjectTypeDefinition(node) {
      var typeName = node.name.value;

      if (context.schema[typeName]) {
        throw new Error('Name "' + typeName + '" cannot be redefined.');
      }

      node.interfaces.forEach(function (namedTypeAST) {
        return context.implementations[namedTypeAST.name.value] = (context.implementations[namedTypeAST.name.value] || []).concat(typeName);
      });

      context.schema[typeName] = _extends({
        kind: 'type',
        name: typeName
      }, !context.noLocation && node.loc ? {
        loc: {
          kind: 'location',
          start: node.loc.start,
          end: node.loc.end } } : {}, {
        implementsInterfaces: node.interfaces.map(function (namedTypeAST) {
          return namedTypeAST.name.value;
        }),
        implementsNode: node.interfaces.map(function (namedTypeAST) {
          return namedTypeAST.name.value;
        }).includes('Node'),
        memberOfUnions: [], // will be pupulated in the susequent pass
        fields: node.fields.map((0, _mappers.Field)(context)),
        directives: node.directives.map((0, _mappers.Directive)(context))
      });
      return undefined; // node remains unchanged
    }
  };
}