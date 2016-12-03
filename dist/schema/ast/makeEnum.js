'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeEnum = makeEnum;

var _languageKinds = require('../language/kinds');

var _makeName = require('./makeName');

function makeEnum(name, options) {
  return {
    kind: _languageKinds.ENUM_TYPE_DEFINITION,
    name: (0, _makeName.makeName)(name),
    values: options.map(function (option) {
      return {
        kind: _languageKinds.ENUM_VALUE_DEFINITION,
        name: (0, _makeName.makeName)(option)
      };
    })
  };
}