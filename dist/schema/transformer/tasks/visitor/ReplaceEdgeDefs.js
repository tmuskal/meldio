'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ReplaceEdgeDefs = ReplaceEdgeDefs;

var _ast = require('../../../ast');

var _analyzer = require('../../../analyzer');

function ReplaceEdgeDefs() {
  return {
    EdgeDefinition: function EdgeDefinition(nodeAST) {
      var type = nodeAST.type.name.value;
      var edgeType = nodeAST.edgeType ? nodeAST.edgeType.name.value : null;
      var name = (0, _analyzer.getEdgeName)(type, edgeType);

      // replace EdgeDefinition ast node with NamedType node
      return (0, _ast.makeNamedType)(name);
    }
  };
}