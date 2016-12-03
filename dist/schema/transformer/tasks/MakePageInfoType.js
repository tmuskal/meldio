'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MakePageInfoType = MakePageInfoType;

var _astMakeType = require('../../ast/makeType');

var _astMakeField = require('../../ast/makeField');

var _astMakeRequiredField = require('../../ast/makeRequiredField');

function MakePageInfoType() {
  var fields = [(0, _astMakeRequiredField.makeRequiredField)('hasPreviousPage', [], 'Boolean'), (0, _astMakeRequiredField.makeRequiredField)('hasNextPage', [], 'Boolean'), (0, _astMakeField.makeField)('startCursor', [], 'String'), (0, _astMakeField.makeField)('endCursor', [], 'String')];
  var interfaces = [];
  return [(0, _astMakeType.makeType)('PageInfo', interfaces, fields)];
}