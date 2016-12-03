'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _security = require('../../../security');

var _winchan = require('../winchan');

var _wrap = require('./wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var OAuthHandlers = function OAuthHandlers(rootValue, resolvers) {
  return function (provider) {
    var config = rootValue.config;
    var env = rootValue.env;
    var hooks = rootValue.hooks;
    var db = rootValue.db;

    var _resolvers$Auth = resolvers.Auth({ db: db, config: config });

    var addAuthProvider = _resolvers$Auth.addAuthProvider;
    var getAuthProvider = _resolvers$Auth.getAuthProvider;

    var scopes = (config.scopes || {})[provider] || {};
    var baseUrl = config.protocol + '://' + config.host + ':' + config.port;
    var duration = config.sessionDuration;
    var unit = config.sessionDurationUnit;

    var _facebook$github$google$provider = _slicedToArray(({
      facebook: [env.FACEBOOK_CLIENT_ID, env.FACEBOOK_CLIENT_SECRET],
      github: [env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET],
      google: [env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET]
    })[provider], 2);

    var clientId = _facebook$github$google$provider[0];
    var clientSecret = _facebook$github$google$provider[1];
    var secret = env.MASTER_SECRET;

    var oauth = new _security.OAuth(provider, clientId, clientSecret, scopes, secret, baseUrl);

    function authWithAccessToken(accessToken) {
      var profile, providerId, authProvider, viewerId, loginHookResult, meldioJWT;
      return _regeneratorRuntime.async(function authWithAccessToken$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(oauth.fetchProfile(accessToken));

          case 2:
            profile = context$3$0.sent;
            providerId = String(profile.id);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(getAuthProvider({ provider: provider, providerId: providerId }));

          case 6:
            authProvider = context$3$0.sent;
            viewerId = undefined;

            if (authProvider) {
              context$3$0.next = 16;
              break;
            }

            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(hooks.newOAuthProvider({ provider: provider, profile: profile, accessToken: accessToken }));

          case 11:
            viewerId = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(addAuthProvider({
              viewerId: viewerId,
              provider: provider,
              providerId: String(providerId),
              profile: profile,
              accessToken: accessToken
            }));

          case 14:
            context$3$0.next = 17;
            break;

          case 16:
            viewerId = authProvider.viewerId;

          case 17:
            if (!hooks.onLogin) {
              context$3$0.next = 23;
              break;
            }

            context$3$0.next = 20;
            return _regeneratorRuntime.awrap(hooks.onLogin({
              viewerId: viewerId,
              provider: provider,
              providerId: providerId,
              profile: profile,
              accessToken: accessToken
            }));

          case 20:
            context$3$0.t0 = context$3$0.sent;
            context$3$0.next = 24;
            break;

          case 23:
            context$3$0.t0 = true;

          case 24:
            loginHookResult = context$3$0.t0;

            if (!(loginHookResult !== true)) {
              context$3$0.next = 27;
              break;
            }

            return context$3$0.abrupt('return', {
              error: {
                code: 'LOGIN_REFUSED',
                message: loginHookResult
              }
            });

          case 27:
            context$3$0.next = 29;
            return _regeneratorRuntime.awrap((0, _security.issueAccessToken)(viewerId, secret, duration, unit));

          case 29:
            meldioJWT = context$3$0.sent;
            return context$3$0.abrupt('return', { accessToken: meldioJWT });

          case 31:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    }

    var redirect = (0, _wrap2['default'])(function callee$2$0(req, res) {
      var url;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(oauth.getRedirectUrl());

          case 2:
            url = context$3$0.sent;

            res.redirect(url);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    var codeAuth = (0, _wrap2['default'])(function callee$2$0(req, res) {
      var code, state, token, authResult;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            code = req.query.code;
            state = req.query.state;

            if (!req.query.error) {
              context$3$0.next = 5;
              break;
            }

            (0, _winchan.closeWith)(res, {
              error: {
                code: req.query.error,
                reason: req.query.error_reason,
                message: req.query.error_description
              }
            });
            return context$3$0.abrupt('return');

          case 5:
            if (oauth.verifyState(state)) {
              context$3$0.next = 8;
              break;
            }

            (0, _winchan.closeWith)(res, {
              error: {
                code: 'INVALID_REQUEST',
                message: 'Invalid request.'
              }
            });
            return context$3$0.abrupt('return');

          case 8:
            context$3$0.prev = 8;
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(oauth.fetchAccessToken(code, state));

          case 11:
            token = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(authWithAccessToken(token.access_token));

          case 14:
            authResult = context$3$0.sent;

            (0, _winchan.closeWith)(res, authResult);
            context$3$0.next = 21;
            break;

          case 18:
            context$3$0.prev = 18;
            context$3$0.t0 = context$3$0['catch'](8);

            (0, _winchan.closeWith)(res, {
              error: {
                code: 'INVALID_REQUEST',
                message: 'Authentication failed.'
              }
            });

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[8, 18]]);
    });

    var accessTokenAuth = (0, _wrap2['default'])(function callee$2$0(req, res) {
      var token, authResult;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            token = req.body.access_token;

            if (token) {
              context$3$0.next = 5;
              break;
            }

            res.json({
              error: {
                code: 'INVALID_REQUEST',
                message: 'Access token is required'
              }
            });
            res.end();
            return context$3$0.abrupt('return');

          case 5:
            context$3$0.prev = 5;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(authWithAccessToken(token));

          case 8:
            authResult = context$3$0.sent;

            res.json(authResult);
            context$3$0.next = 15;
            break;

          case 12:
            context$3$0.prev = 12;
            context$3$0.t0 = context$3$0['catch'](5);

            res.json({
              error: {
                code: 'INVALID_REQUEST',
                message: 'Access token is invalid'
              }
            });

          case 15:
            context$3$0.prev = 15;

            res.end();
            return context$3$0.finish(15);

          case 18:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[5, 12, 15, 18]]);
    });

    return {
      redirect: redirect,
      codeAuth: codeAuth,
      accessTokenAuth: accessTokenAuth
    };
  };
};

exports.OAuthHandlers = OAuthHandlers;

// validate state