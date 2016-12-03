'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.transpile = transpile;

var _babelCore = require('babel-core');

function transpile(fileName) {
  var options = {
    filename: fileName
  };
  return new _Promise(function (resolve, reject) {
    return (0, _babelCore.transformFile)(fileName, options, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result.code);
      }
    });
  });
}