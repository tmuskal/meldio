'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeNamedType = makeNamedType;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

function makeNamedType(typeName) {
  return {
    kind: _languageKinds.NAMED_TYPE,
    name: (0, _makeName.makeName)(typeName)
  };
}