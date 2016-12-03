'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.mkdir = mkdir;

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function mkdir(fileName, isDirectory) {
  var directory = isDirectory ? fileName : _path2['default'].parse(fileName).dir;

  return new _Promise(function (resolve, reject) {
    return (0, _mkdirp2['default'])(directory, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(directory);
      }
    });
  });
}