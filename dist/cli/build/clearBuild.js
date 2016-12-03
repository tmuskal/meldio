'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.clearBuild = clearBuild;

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

function clearBuild(directory) {
  return new _Promise(function (resolve, reject) {
    (0, _rimraf2['default'])(directory, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}