'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.RemoveFilterDefs = RemoveFilterDefs;

var _jsutilsValues = require('../../../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _jsutilsKeyMap = require('../../../../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _language = require('../../../language');

function RemoveFilterDefs(accumulator) {
  return {
    FilterDefinition: function FilterDefinition(nodeAST) {
      var _ref;

      var name = 'Filter#' + (0, _language.print)(nodeAST.type);

      var argASTs = (_ref = []).concat.apply(_ref, _toConsumableArray(nodeAST.conditions.map(function (cond) {
        return cond.arguments;
      })));

      var uniqueArgs = (0, _jsutilsValues2['default'])((0, _jsutilsKeyMap2['default'])(argASTs, function (ast) {
        return ast.name.value;
      }));

      // save the AST elements in the accumulator before removing the node
      accumulator.filterArguments[name] = uniqueArgs;

      return null; // deletes FilterDefinition ast node
    }
  };
}