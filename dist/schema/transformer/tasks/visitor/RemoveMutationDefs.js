'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.RemoveMutationDefs = RemoveMutationDefs;

function RemoveMutationDefs(accumulator) {
  return {
    MutationDefinition: function MutationDefinition(nodeAST) {

      var name = nodeAST.name.value;
      var argumentASTs = nodeAST.arguments;
      var fieldASTs = nodeAST.fields;

      // save the AST elements in the accumulator before removing the node
      accumulator.mutations.push({ name: name, argumentASTs: argumentASTs, fieldASTs: fieldASTs });

      return null; // deletes MutationDefinition ast node
    }
  };
}