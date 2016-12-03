'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeInterface = makeInterface;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

function makeInterface(name, fields) {
  return {
    kind: _languageKinds.INTERFACE_TYPE_DEFINITION,
    name: (0, _makeName.makeName)(name),
    fields: fields
  };
}