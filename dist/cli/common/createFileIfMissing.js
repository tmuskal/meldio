'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createFileIfMissing = createFileIfMissing;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _writeFile = require('./writeFile');

function createFileIfMissing(filePath, content) {
  return _regeneratorRuntime.async(function createFileIfMissing$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(stat(filePath));

      case 3:
        context$1$0.next = 9;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);

        if (!(context$1$0.t0.code === 'ENOENT')) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return', (0, _writeFile.writeFile)(filePath, content));

      case 9:
        return context$1$0.abrupt('return', null);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5]]);
}

var stat = function stat(filePath) {
  return new _Promise(function (resolve, reject) {
    return _fs2['default'].stat(filePath, function (error, stats) {
      if (error) {
        reject(error);
      } else {
        resolve(stats);
      }
    });
  });
};