'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ReplaceNodeConnectionDefs = ReplaceNodeConnectionDefs;

var _ast = require('../../../ast');

var _analyzer = require('../../../analyzer');

function ReplaceNodeConnectionDefs() {
  return {
    NodeConnectionDefinition: function NodeConnectionDefinition(nodeAST) {
      var type = nodeAST.type.name.value;
      var edgeType = nodeAST.edgeType ? nodeAST.edgeType.name.value : null;
      var name = (0, _analyzer.getConnectionName)(type, edgeType);

      // replace NodeConnectionDefinition ast node with NamedType node
      return (0, _ast.makeNamedType)(name);
    }
  };
}