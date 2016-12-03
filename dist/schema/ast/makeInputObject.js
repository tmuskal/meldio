'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeInputObject = makeInputObject;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

function makeInputObject(name, fields) {
  return {
    kind: _languageKinds.INPUT_OBJECT_TYPE_DEFINITION,
    name: (0, _makeName.makeName)(name),
    fields: fields
  };
}