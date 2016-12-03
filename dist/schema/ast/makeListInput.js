'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeListInput = makeListInput;

// import { LIST_TYPE, INPUT_VALUE_DEFINITION } from '../language/kinds';

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

var _makeNamedType = require('./makeNamedType');

function makeListInput(name, typeName) {
  return {
    kind: _languageKinds.INPUT_VALUE_DEFINITION,
    name: (0, _makeName.makeName)(name),
    type: {
      kind: 'ListType', // FIXME: bc flow 0.21 issue, should be LIST_TYPE
      type: (0, _makeNamedType.makeNamedType)(typeName)
    }
  };
}