'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var TYPE_RESERVED_WORDS = [
// 'Node',                   // relay type, but analyzer will catch this
'PageInfo', // relay type
'Long', // 64 bit int scalar (future)
'Polygon', 'Point', // geo location type (future)
'Date'];exports.TYPE_RESERVED_WORDS = TYPE_RESERVED_WORDS;
// date / time type (future)

var FIELD_RESERVED_WORDS = ['_id', // MongoDB
'_type', // db storage (for non-Node objects)
'node', // Relay
'cursor', // Relay
'type', // filter expressions
'exists', // filter expressions
'and', // filter expressions (future)
'or', // filter expressions (future)
'not', // filter expressions (future)
'clear', // update expressions
'update', // Mutations API (NodeObject)
'delete'];exports.FIELD_RESERVED_WORDS = FIELD_RESERVED_WORDS;
// Mutations API (NodeObject)

var TYPE_RESERVED_SUFFIXES = ['Connection', 'Edge', 'Payload', 'Input'];

exports.TYPE_RESERVED_SUFFIXES = TYPE_RESERVED_SUFFIXES;
var AGGREGATION_FIELD_NAMES = ['count', 'sum', 'min', 'max', 'average'];

exports.AGGREGATION_FIELD_NAMES = AGGREGATION_FIELD_NAMES;
var ARGUMENT_RESERVED_WORDS = ['first', 'last', 'after', 'before', 'filter', 'order', 'filterBy', 'orderBy'];
exports.ARGUMENT_RESERVED_WORDS = ARGUMENT_RESERVED_WORDS;