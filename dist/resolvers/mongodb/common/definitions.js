'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var EDGE_COLLECTION = '_Edge';
exports.EDGE_COLLECTION = EDGE_COLLECTION;
var AUTH_PROVIDER_COLLECTION = '_AuthProvider';

exports.AUTH_PROVIDER_COLLECTION = AUTH_PROVIDER_COLLECTION;
var MAJORITY_READ_OPTIONS = {
  readConcern: { level: 'majority' }
};

exports.MAJORITY_READ_OPTIONS = MAJORITY_READ_OPTIONS;
var LOCAL_READ_OPTIONS = {
  readConcern: { level: 'local' }
};

exports.LOCAL_READ_OPTIONS = LOCAL_READ_OPTIONS;
var DEFAULT_WRITE_OPTIONS = {
  writeConcern: { w: 'majority', j: true }
};
exports.DEFAULT_WRITE_OPTIONS = DEFAULT_WRITE_OPTIONS;