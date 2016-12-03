'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.InputObjectTypeDefinition = InputObjectTypeDefinition;

var _mappers = require('../mappers');

function InputObjectTypeDefinition(context) {
  return {
    InputObjectTypeDefinition: function InputObjectTypeDefinition(node) {
      var inputObjectName = node.name.value;

      if (context.schema[inputObjectName]) {
        throw new Error('Name "' + inputObjectName + '" cannot be redefined.');
      }

      context.schema[inputObjectName] = _extends({
        kind: 'input',
        name: inputObjectName
      }, !context.noLocation && node.loc ? {
        loc: {
          kind: 'location',
          start: node.loc.start,
          end: node.loc.end } } : {}, {
        arguments: node.fields.map((0, _mappers.Argument)(context)) });
      return undefined; // node remains unchanged
    }
  };
}