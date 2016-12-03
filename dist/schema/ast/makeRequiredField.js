'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeRequiredField = makeRequiredField;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

var _makeNamedType = require('./makeNamedType');

function makeRequiredField(name, arg, typeName) {
  return {
    kind: _languageKinds.FIELD_DEFINITION,
    name: (0, _makeName.makeName)(name),
    arguments: arg,
    type: {
      kind: 'NonNullType', // FIXME: bc flow 0.21 issue, should be NON_NULL_TYPE
      type: (0, _makeNamedType.makeNamedType)(typeName)
    }
  };
}

//  NON_NULL_TYPE,