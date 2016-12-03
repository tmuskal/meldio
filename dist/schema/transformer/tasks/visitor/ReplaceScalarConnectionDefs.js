'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ReplaceScalarConnectionDefs = ReplaceScalarConnectionDefs;

var _ast = require('../../../ast');

var _analyzer = require('../../../analyzer');

function ReplaceScalarConnectionDefs() {
  return {
    ScalarConnectionDefinition: function ScalarConnectionDefinition(nodeAST) {
      var type = nodeAST.type.name.value;
      var edgeType = nodeAST.edgeType ? nodeAST.edgeType.name.value : null;
      var name = (0, _analyzer.getConnectionName)(type, edgeType);

      // replace ScalarConnectionDefinition ast node with NamedType node
      return (0, _ast.makeNamedType)(name);
    }
  };
}