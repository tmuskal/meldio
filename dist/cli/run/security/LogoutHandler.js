'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _wrap = require('./wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _securityAccessToken = require('../../../security/accessToken');

var LogoutHandler = function LogoutHandler(rootValue) {
  var hooks = rootValue.hooks;
  var secret = rootValue.env.MASTER_SECRET;

  return (0, _wrap2['default'])(function callee$1$0(req, res) {
    var accessToken, viewerId, logoutHookResult;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          accessToken = req.body.access_token;

          if (accessToken) {
            context$2$0.next = 5;
            break;
          }

          res.json({
            error: {
              code: 'INVALID_REQUEST',
              message: 'Access token is required'
            }
          });
          res.end();
          return context$2$0.abrupt('return');

        case 5:
          context$2$0.prev = 5;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap((0, _securityAccessToken.verifyAccessToken)(accessToken, secret));

        case 8:
          viewerId = context$2$0.sent;

          if (!hooks.onLogout) {
            context$2$0.next = 15;
            break;
          }

          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(hooks.onLogout({ viewerId: viewerId }));

        case 12:
          context$2$0.t0 = context$2$0.sent;
          context$2$0.next = 16;
          break;

        case 15:
          context$2$0.t0 = true;

        case 16:
          logoutHookResult = context$2$0.t0;

          if (logoutHookResult !== true) {
            res.json({
              error: {
                code: 'LOGOUT_REFUSED',
                message: logoutHookResult
              }
            });
          } else {
            res.json({ logout: true });
          }
          context$2$0.next = 23;
          break;

        case 20:
          context$2$0.prev = 20;
          context$2$0.t1 = context$2$0['catch'](5);

          res.json({
            error: {
              code: 'INVALID_TOKEN',
              message: 'Token is invalid or expired.'
            }
          });

        case 23:
          context$2$0.prev = 23;

          res.end();
          return context$2$0.finish(23);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[5, 20, 23, 26]]);
  });
};
exports.LogoutHandler = LogoutHandler;