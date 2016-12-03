'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeName = makeName;

var _languageKinds = require('../language/kinds');

function makeName(name) {
  return {
    kind: _languageKinds.NAME,
    value: name
  };
}