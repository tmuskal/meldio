'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeListReqInput = makeListReqInput;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

var _makeNamedType = require('./makeNamedType');

function makeListReqInput(name, typeName) {
  return {
    kind: _languageKinds.INPUT_VALUE_DEFINITION,
    name: (0, _makeName.makeName)(name),
    type: {
      kind: 'ListType', // FIXME: bc flow 0.21 issue, should be LIST_TYPE
      type: {
        kind: 'NonNullType', // FIXME: bc flow 0.21 issue,  be NON_NULL_TYPE,
        type: (0, _makeNamedType.makeNamedType)(typeName)
      }
    }
  };
}

//  LIST_TYPE,
//  NON_NULL_TYPE,