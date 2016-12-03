'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.listFiles = listFiles;

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function listFiles(globPattern, ignorePattern) {
  return new _Promise(function (resolve, reject) {
    (0, _glob2['default'])(globPattern, { ignore: ignorePattern }, function (error, files) {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
}