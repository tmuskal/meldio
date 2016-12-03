'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.randomBuffer = randomBuffer;
exports.randomBase64 = randomBase64;
exports.randomBase62 = randomBase62;
exports.randomBase10 = randomBase10;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function randomBuffer(lengthInBytes) {
  return new _Promise(function (resolve, reject) {
    return _crypto2['default'].randomBytes(lengthInBytes, function (error, buffer) {
      // istanbul ignore if
      if (error) {
        reject(error);
      } else {
        resolve(buffer);
      }
    });
  });
}

function randomBase64(lengthInBytes) {
  var buffer;
  return _regeneratorRuntime.async(function randomBase64$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(randomBuffer(lengthInBytes));

      case 2:
        buffer = context$1$0.sent;
        return context$1$0.abrupt('return', buffer.toString('base64'));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function bufferToPad(buffer, pad) {
  var result = [];

  // this basically throws away ~2 bits of randomness per each char of
  // length, but that's fine.
  for (var i = 0; i < buffer.length; i++) {
    result.push(pad[buffer[i] % pad.length]);
  }

  return result.join('');
}

function bufferToBase62(buffer) {
  var pad = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return bufferToPad(buffer, pad);
}

function bufferToBase10(buffer) {
  var pad = '0123456789';
  return bufferToPad(buffer, pad);
}

function randomBase62(lengthInChars) {
  var buffer;
  return _regeneratorRuntime.async(function randomBase62$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(randomBuffer(lengthInChars));

      case 2:
        buffer = context$1$0.sent;
        return context$1$0.abrupt('return', bufferToBase62(buffer));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function randomBase10(lengthInChars) {
  var buffer;
  return _regeneratorRuntime.async(function randomBase10$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(randomBuffer(lengthInChars));

      case 2:
        buffer = context$1$0.sent;
        return context$1$0.abrupt('return', bufferToBase10(buffer));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}