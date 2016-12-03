'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.AuthenticationHandler = AuthenticationHandler;

var _security = require('../../../security');

function AuthenticationHandler(secret) {
  return function (req, res, next) {
    // self-awareness
    if (req.viewerId) {
      return next();
    }

    var accessToken = undefined;
    if (req.query.access_token) {
      accessToken = req.query.access_token;
    } else if (req.get('Authorization')) {
      var authorizationHeader = req.get('Authorization').split(' ');
      if (authorizationHeader[0] !== 'Bearer' || !authorizationHeader[1]) {
        res.json({
          errors: [{
            code: 'INVALID_TOKEN',
            message: 'Authorization header is invalid.'
          }]
        });
        res.end();
        return;
      }
      accessToken = authorizationHeader[1];
    } else if (req.body && req.body.access_token) {
      accessToken = req.body.access_token;
    } else {
      req.viewerId = null;
      return next();
    }

    (0, _security.verifyAccessToken)(accessToken, secret).then(function (viewerId) {
      req.viewerId = viewerId;
      next();
    })['catch'](function () {
      res.json({
        errors: [{
          code: 'INVALID_TOKEN',
          message: 'Token is invalid or expired.'
        }]
      });
      res.end();
    });
  };
}