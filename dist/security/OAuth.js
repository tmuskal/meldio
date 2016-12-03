'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _jwa = require('jwa');

var _jwa2 = _interopRequireDefault(_jwa);

var _formData = require('form-data');

var _formData2 = _interopRequireDefault(_formData);

var _fbjsLibFetchWithRetries = require('fbjs/lib/fetchWithRetries');

var _fbjsLibFetchWithRetries2 = _interopRequireDefault(_fbjsLibFetchWithRetries);

var _jsutilsRandom = require('../jsutils/random');

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var VALID_PROVIDERS = ['facebook', 'google', 'github'];
var retryInit = {
  fetchTimeout: 5000, /* ms */
  retryDelays: [1000, 3000, 5000] };

/* ms */

var OAuth = (function () {
  function OAuth(provider, clientId, clientSecret, scopes, masterSecret, url) {
    _classCallCheck(this, OAuth);

    (0, _jsutilsInvariant2['default'])(VALID_PROVIDERS.includes(provider), 'OAuth constructor must be invoked with a valid provider.');

    this._fetchWithRetries = _fbjsLibFetchWithRetries2['default'];

    Object.defineProperty(this, 'provider', {
      get: function get() {
        return provider;
      }
    });

    Object.defineProperty(this, 'clientId', {
      get: function get() {
        return clientId;
      }
    });

    Object.defineProperty(this, 'clientSecret', {
      get: function get() {
        return clientSecret;
      }
    });

    Object.defineProperty(this, 'scope', {
      get: function get() {
        return scopes.join(({
          facebook: ',',
          github: ',',
          google: ' '
        })[provider]);
      }
    });

    Object.defineProperty(this, 'masterSecretBuffer', {
      get: function get() {
        return Buffer(masterSecret, 'base64');
      }
    });

    Object.defineProperty(this, 'nonceAlg', {
      get: function get() {
        return (0, _jwa2['default'])('HS256');
      }
    });

    Object.defineProperty(this, 'redirectUri', {
      get: function get() {
        return url + '/auth/' + provider + '/callback';
      }
    });
  }

  _createClass(OAuth, [{
    key: 'injectFetchWithRetries',
    value: function injectFetchWithRetries(fetch) {
      this._fetchWithRetries = fetch;
    }
  }, {
    key: 'newState',
    value: function newState() {
      var nonce, signature;
      return _regeneratorRuntime.async(function newState$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap((0, _jsutilsRandom.randomBase62)(32));

          case 2:
            nonce = context$2$0.sent;
            signature = this.nonceAlg.sign(nonce, this.masterSecretBuffer);
            return context$2$0.abrupt('return', nonce + '.' + signature);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'verifyState',
    value: function verifyState(state) {
      var _split, _split2, nonce, signature;

      return _regeneratorRuntime.async(function verifyState$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _split = (state || '').split('.', 2);
            _split2 = _slicedToArray(_split, 2);
            nonce = _split2[0];
            signature = _split2[1];
            return context$2$0.abrupt('return', this.nonceAlg.verify(nonce || '', signature || '', this.masterSecretBuffer));

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getRedirectUrl',
    value: function getRedirectUrl() {
      var url, state, queryString;
      return _regeneratorRuntime.async(function getRedirectUrl$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            url = ({
              facebook: 'https://www.facebook.com/dialog/oauth',
              github: 'https://github.com/login/oauth/authorize',
              google: 'https://accounts.google.com/o/oauth2/v2/auth'
            })[this.provider];
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.newState());

          case 3:
            state = context$2$0.sent;
            queryString = _qs2['default'].stringify(_extends({
              'client_id': this.clientId, // eslint-disable-line quote-props
              'redirect_uri': this.redirectUri, // eslint-disable-line quote-props
              state: state,
              scope: this.scope
            }, this.provider === 'google' ? { 'response_type': 'code' } : // eslint-disable-line quote-props
            {}));
            return context$2$0.abrupt('return', url + '?' + queryString);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fetchAccessToken',
    value: function fetchAccessToken(code, state) {
      var url, init, formData, response;
      return _regeneratorRuntime.async(function fetchAccessToken$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            url = ({
              facebook: 'https://graph.facebook.com/v2.5/oauth/access_token?' + _qs2['default'].stringify({
                code: code,
                'client_id': this.clientId, // eslint-disable-line quote-props
                'client_secret': this.clientSecret, // eslint-disable-line quote-props
                'redirect_uri': this.redirectUri }),
              google: 'https://accounts.google.com/o/oauth2/token',
              github: 'https://github.com/login/oauth/access_token'
            })[this.provider];
            init = _extends({
              method: ({
                facebook: 'GET',
                google: 'POST',
                github: 'POST'
              })[this.provider]
            }, retryInit, {
              headers: { Accept: 'application/json' }
            });

            if (this.provider === 'google' || this.provider === 'github') {
              formData = new _formData2['default']();

              formData.append('code', code);
              formData.append('client_id', this.clientId);
              formData.append('client_secret', this.clientSecret);
              formData.append('redirect_uri', this.redirectUri);
              if (this.provider === 'github') {
                formData.append('state', state);
              } else if (this.provider === 'google') {
                formData.append('grant_type', 'authorization_code');
              }
              init.body = formData;
              init.headers = _extends({
                Accept: 'application/json'
              }, formData.getHeaders());
            }
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this._fetchWithRetries(url, init));

          case 5:
            response = context$2$0.sent;
            return context$2$0.abrupt('return', response.json());

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fetchProfile',
    value: function fetchProfile(accessToken) {
      var init, url, response, urls, _ref, _ref2, profile, picture, _ref3, _ref32, emails;

      return _regeneratorRuntime.async(function fetchProfile$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            init = _extends({
              method: 'GET',
              headers: { Accept: 'application/json' }
            }, retryInit);

            if (!(this.provider === 'google')) {
              context$2$0.next = 9;
              break;
            }

            url = 'https://www.googleapis.com/oauth2/v2/userinfo?' + _qs2['default'].stringify({
              'access_token': accessToken // eslint-disable-line quote-props
            });
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this._fetchWithRetries(url, init));

          case 5:
            response = context$2$0.sent;
            return context$2$0.abrupt('return', response.json());

          case 9:
            if (!(this.provider === 'facebook')) {
              context$2$0.next = 20;
              break;
            }

            urls = ['https://graph.facebook.com/v2.5/me?' + _qs2['default'].stringify({
              fields: 'id,email,first_name,last_name',
              'access_token': accessToken // eslint-disable-line quote-props
            }), 'https://graph.facebook.com/v2.5/me/picture?' + _qs2['default'].stringify({
              redirect: 0,
              type: 'large',
              'access_token': accessToken // eslint-disable-line quote-props
            })];
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(_Promise.all(urls.map(function (url) {
              return _this._fetchWithRetries(url, init).then(function (r) {
                return r.json();
              });
            })));

          case 13:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 2);
            profile = _ref2[0];
            picture = _ref2[1];
            return context$2$0.abrupt('return', _extends({}, profile, {
              picture: picture
            }));

          case 20:
            if (!(this.provider === 'github')) {
              context$2$0.next = 29;
              break;
            }

            urls = ['https://api.github.com/user', 'https://api.github.com/user/emails'].map(function (u) {
              return u + '?' + _qs2['default'].stringify({
                'access_token': accessToken // eslint-disable-line quote-props
              });
            });
            context$2$0.next = 24;
            return _regeneratorRuntime.awrap(_Promise.all(urls.map(function (url) {
              return _this._fetchWithRetries(url, init).then(function (r) {
                return r.json();
              });
            })));

          case 24:
            _ref3 = context$2$0.sent;
            _ref32 = _slicedToArray(_ref3, 2);
            profile = _ref32[0];
            emails = _ref32[1];
            return context$2$0.abrupt('return', _extends({}, profile, {
              emails: emails
            }));

          case 29:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return OAuth;
})();

exports.OAuth = OAuth;
// eslint-disable-line quote-props

// by default, facebook api returns a very small picture, so here we make
// an explicit request for a large picture

// by default, github api returns only publicly listed email, so here we
// make an explicit request for all emails listed on the account