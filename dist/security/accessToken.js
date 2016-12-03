'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.issueAccessToken = issueAccessToken;
exports.verifyAccessToken = verifyAccessToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var SIGNATURE_ALGO = 'HS512';
var UNIT_TO_SECONDS = {
  hours: 3600,
  days: 86400,
  weeks: 604800, // 7 days
  months: 2592000 };

// 30 days

function issueAccessToken(viewerId, secret, duration, unit) {
  return _regeneratorRuntime.async(function issueAccessToken$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        (0, _jsutilsInvariant2['default'])(viewerId, 'viewerId must be passed to issueAccessToken.');
        (0, _jsutilsInvariant2['default'])(secret, 'secret must be passed to issueAccessToken.');
        (0, _jsutilsInvariant2['default'])(UNIT_TO_SECONDS[unit], 'unit must be passed to issueAccessToken.');

        return context$1$0.abrupt('return', new _Promise(function (resolve) {
          var options = {
            algorithm: SIGNATURE_ALGO,
            expiresIn: duration * UNIT_TO_SECONDS[unit],
            subject: viewerId
          };
          _jsonwebtoken2['default'].sign({}, Buffer(secret, 'base64'), options, resolve);
        }));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function verifyAccessToken(accessToken, secret) {
  return _regeneratorRuntime.async(function verifyAccessToken$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new _Promise(function (resolve, reject) {
          _jsonwebtoken2['default'].verify(accessToken, Buffer(secret, 'base64'), { algorithms: [SIGNATURE_ALGO] }, function (error, decoded) {
            if (error) {
              reject(error);
            } else {
              resolve(decoded.sub);
            }
          });
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}