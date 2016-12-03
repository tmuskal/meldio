"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregationField = AggregationField;

function AggregationField(parent, args, info) {
  var fieldASTs = info.fieldASTs;
  var fieldName = info.fieldName;

  var alias = fieldASTs[0].alias ? fieldASTs[0].alias.value : null;
  var lookupKey = alias || fieldName;
  return parent[lookupKey];
}