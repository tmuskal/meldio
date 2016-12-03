'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.lintFile = lintFile;

var _eslint = require('eslint');

var _common = require('../common');

function lintFile(fileName, lintConfig) {
  var code;
  return _regeneratorRuntime.async(function lintFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _common.readFile)(fileName));

      case 2:
        code = context$1$0.sent;
        return context$1$0.abrupt('return', {
          lintResults: _eslint.linter.verify(code, lintConfig, fileName),
          code: code
        });

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}