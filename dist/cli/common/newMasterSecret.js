'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.newMasterSecret = newMasterSecret;

var _jsutilsRandom = require('../../jsutils/random');

var SHA512keyLengthInBytes = 64;

function newMasterSecret() {
  return _regeneratorRuntime.async(function newMasterSecret$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', (0, _jsutilsRandom.randomBase64)(SHA512keyLengthInBytes));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}