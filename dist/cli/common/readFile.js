'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.readFile = readFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function readFile(fileName) {
  return new _Promise(function (resolve, reject) {
    _fs2['default'].readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}