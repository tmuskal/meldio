'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeType = makeType;

var _languageKinds = require('../language/kinds');

var _makeNamedType = require('./makeNamedType');

var _makeName = require('./makeName');

function makeType(name, interfaceNames, fields) {
  return {
    kind: _languageKinds.OBJECT_TYPE_DEFINITION,
    name: (0, _makeName.makeName)(name),
    interfaces: interfaceNames.map(function (interfaceName) {
      return (0, _makeNamedType.makeNamedType)(interfaceName);
    }),
    fields: fields
  };
}