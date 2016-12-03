'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeInput = makeInput;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

var _makeNamedType = require('./makeNamedType');

function makeInput(name, typeName) {
  return {
    kind: _languageKinds.INPUT_VALUE_DEFINITION,
    name: (0, _makeName.makeName)(name),
    type: (0, _makeNamedType.makeNamedType)(typeName)
  };
}