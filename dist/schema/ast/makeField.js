'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeField = makeField;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

var _makeNamedType = require('./makeNamedType');

function makeField(name, arg, typeName) {
  return {
    kind: _languageKinds.FIELD_DEFINITION,
    name: (0, _makeName.makeName)(name),
    arguments: arg,
    type: (0, _makeNamedType.makeNamedType)(typeName)
  };
}