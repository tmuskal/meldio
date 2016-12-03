'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _wrap = require('./wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _security = require('../../../security');

var PasswordHandler = function PasswordHandler(rootValue, resolvers) {
  var db = rootValue.db;
  var hooks = rootValue.hooks;
  var config = rootValue.config;
  var env = rootValue.env;

  var _resolvers$Auth = resolvers.Auth({ db: db, config: config });

  var getAuthProvider = _resolvers$Auth.getAuthProvider;
  var secret = env.MASTER_SECRET;
  var duration = config.sessionDuration;
  var unit = config.sessionDurationUnit;

  return (0, _wrap2['default'])(function callee$1$0(req, res) {
    var loginId, password, provider, providerId, authProvider, viewerId, hash, isValid, loginHookResult, jwt, invalidPasswordResult;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          loginId = req.body.loginId;
          password = req.body.password;

          if (!(!loginId || typeof loginId !== 'string')) {
            context$2$0.next = 6;
            break;
          }

          res.json({
            error: {
              code: 'INVALID_REQUEST',
              message: 'loginId is required and must be a string'
            }
          });
          res.end();
          return context$2$0.abrupt('return');

        case 6:
          if (!(!password || typeof password !== 'string')) {
            context$2$0.next = 10;
            break;
          }

          res.json({
            error: {
              code: 'INVALID_REQUEST',
              message: 'password is required and must be a string'
            }
          });
          res.end();
          return context$2$0.abrupt('return');

        case 10:
          context$2$0.prev = 10;
          provider = 'password';
          providerId = loginId;
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(getAuthProvider({ provider: provider, providerId: providerId }));

        case 15:
          authProvider = context$2$0.sent;

          if (authProvider) {
            context$2$0.next = 20;
            break;
          }

          res.json({
            error: {
              code: 'INVALID_LOGINID',
              message: 'loginId provided is not found'
            }
          });
          res.end();
          return context$2$0.abrupt('return');

        case 20:
          viewerId = authProvider.viewerId;
          hash = authProvider.password;

          if (!(!viewerId || !hash)) {
            context$2$0.next = 26;
            break;
          }

          res.json({
            error: {
              code: 'INVALID_PROVIDER',
              message: 'Authentication provider for loginId is invalid.'
            }
          });
          res.end();
          return context$2$0.abrupt('return');

        case 26:
          context$2$0.next = 28;
          return _regeneratorRuntime.awrap((0, _security.isPasswordValid)(password, hash));

        case 28:
          isValid = context$2$0.sent;

          if (!isValid) {
            context$2$0.next = 48;
            break;
          }

          if (!hooks.onLogin) {
            context$2$0.next = 36;
            break;
          }

          context$2$0.next = 33;
          return _regeneratorRuntime.awrap(hooks.onLogin({
            viewerId: viewerId,
            provider: provider,
            providerId: providerId
          }));

        case 33:
          context$2$0.t0 = context$2$0.sent;
          context$2$0.next = 37;
          break;

        case 36:
          context$2$0.t0 = true;

        case 37:
          loginHookResult = context$2$0.t0;

          if (!(loginHookResult !== true)) {
            context$2$0.next = 42;
            break;
          }

          res.json({
            error: {
              code: 'LOGIN_REFUSED',
              message: loginHookResult
            }
          });
          res.end();
          return context$2$0.abrupt('return');

        case 42:
          context$2$0.next = 44;
          return _regeneratorRuntime.awrap((0, _security.issueAccessToken)(viewerId, secret, duration, unit));

        case 44:
          jwt = context$2$0.sent;

          res.json({ accessToken: jwt });
          context$2$0.next = 57;
          break;

        case 48:
          if (!hooks.onInvalidPassword) {
            context$2$0.next = 54;
            break;
          }

          context$2$0.next = 51;
          return _regeneratorRuntime.awrap(hooks.onInvalidPassword({ viewerId: viewerId, providerId: providerId }));

        case 51:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.next = 55;
          break;

        case 54:
          context$2$0.t1 = true;

        case 55:
          invalidPasswordResult = context$2$0.t1;

          res.json({
            error: {
              code: 'INVALID_PASSWORD',
              message: invalidPasswordResult !== true ? invalidPasswordResult : 'password provided is invalid'
            }
          });

        case 57:
          context$2$0.next = 62;
          break;

        case 59:
          context$2$0.prev = 59;
          context$2$0.t2 = context$2$0['catch'](10);

          res.json({
            error: {
              code: 'LOGIN_FAILED',
              message: 'Login failed'
            }
          });

        case 62:
          context$2$0.prev = 62;

          res.end();
          return context$2$0.finish(62);

        case 65:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[10, 59, 62, 65]]);
  });
};

exports.PasswordHandler = PasswordHandler;
// issueAccessToken(viewerId, secret, duration, unit)