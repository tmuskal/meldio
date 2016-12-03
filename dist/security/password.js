'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.hashPassword = hashPassword;
exports.isPasswordValid = isPasswordValid;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function makeSalt(strength) {
  return _regeneratorRuntime.async(function makeSalt$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new _Promise(function (resolve, reject) {
          _bcrypt2['default'].genSalt(strength, function (err, salt) {
            // istanbul ignore if
            if (err) {
              reject(err);
            } else {
              resolve(salt);
            }
          });
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function makeHash(password, salt) {
  return _regeneratorRuntime.async(function makeHash$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new _Promise(function (resolve, reject) {
          _bcrypt2['default'].hash(password, salt, function (err, hash) {
            // istanbul ignore if
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function hashPassword(password, strength) {
  var salt;
  return _regeneratorRuntime.async(function hashPassword$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(makeSalt(strength));

      case 2:
        salt = context$1$0.sent;
        return context$1$0.abrupt('return', makeHash(password, salt));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function isPasswordValid(clearText, hash) {
  return _regeneratorRuntime.async(function isPasswordValid$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new _Promise(function (resolve, reject) {
          _bcrypt2['default'].compare(clearText, hash, function (err, res) {
            // istanbul ignore if
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}