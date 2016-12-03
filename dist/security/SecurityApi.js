'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$freeze = require('babel-runtime/core-js/object/freeze')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.SecurityApi = SecurityApi;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsRandom = require('../jsutils/random');

var _password = require('./password');

var _schemaAnalyzer = require('../schema/analyzer');

var _mutations = require('../mutations');

var _validator = require('./validator');

// istanbul ignore next
var AddAuthProviderFailedError = function AddAuthProviderFailedError(context) {
  return {
    context: context,
    results: ['Failed to add authentication provider.']
  };
};

function SecurityApi(context) {
  var _this = this;

  (0, _jsutilsInvariant2['default'])(context && typeof context === 'object', 'Must pass context to SecurityApi.');
  var schema = context.schema;
  var auth = context.auth;
  var mutation = context.mutation;
  var passwordHashStrength = context.passwordHashStrength;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to SecurityApi context.');
  (0, _jsutilsInvariant2['default'])(auth, 'Must pass auth resolvers to SecurityApi context.');
  (0, _jsutilsInvariant2['default'])(mutation, 'Must pass mutation object to SecurityApi context.');
  (0, _jsutilsInvariant2['default'])(passwordHashStrength, 'Must pass passwordHashStrength to SecurityApi context.');

  var viewerTypeName = (0, _schemaAnalyzer.rootViewerDirectives)(schema).map(function (directive) {
    return directive.parentTypeName;
  })[0];

  if (!(this instanceof SecurityApi)) {
    return new SecurityApi(context);
  }
  var mkContext = function mkContext(func, parameter) {
    return {
      mutation: mutation,
      'function': func,
      parameter: parameter,
      viewerType: viewerTypeName,
      choices: ['facebook', 'google', 'github']
    };
  };

  this.getOAuthAccessToken = function callee$1$0(viewerId, provider) {
    var ctx, authProvider;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.getOAuthAccessToken');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateViewer)(ctx(), viewerTypeName), (0, _validator.validateViewerId)(ctx(), viewerId), (0, _validator.validateChoices)(ctx('provider'), provider)));

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(auth.getAuthProvider({ viewerId: viewerId, provider: provider }));

        case 4:
          authProvider = context$2$0.sent;

          if (!(!authProvider || !authProvider.accessToken)) {
            context$2$0.next = 7;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 7:
          return context$2$0.abrupt('return', authProvider.accessToken);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.removeOAuthProvider = function callee$1$0(viewerId, provider) {
    var ctx, deletedCount;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.removeOAuthProvider');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateViewer)(ctx(), viewerTypeName), (0, _validator.validateViewerId)(ctx(), viewerId), (0, _validator.validateChoices)(ctx('provider'), provider)));

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(auth.deleteAuthProviders({ viewerId: viewerId, provider: provider }));

        case 4:
          deletedCount = context$2$0.sent;
          return context$2$0.abrupt('return', deletedCount !== 0);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.createPasswordAuth = function callee$1$0(viewerId, loginId, password) {
    var ctx, hash, isAdded;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.createPasswordAuth');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateViewer)(ctx(), viewerTypeName), (0, _validator.validateViewerId)(ctx(), viewerId), (0, _validator.validateRequired)(ctx('loginId'), loginId), (0, _validator.validateString)(ctx('loginId'), loginId), (0, _validator.validateRequired)(ctx('password'), password), (0, _validator.validateString)(ctx('password'), password)));

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _password.hashPassword)(password, passwordHashStrength));

        case 4:
          hash = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(auth.addAuthProvider({
            viewerId: viewerId,
            provider: 'password',
            providerId: loginId,
            password: hash
          }));

        case 7:
          isAdded = context$2$0.sent;

          // istanbul ignore if
          if (!isAdded) {
            (0, _mutations.throwOnErrors)(AddAuthProviderFailedError(ctx()));
          }
          return context$2$0.abrupt('return', true);

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.changePasswordAuth = function callee$1$0(viewerId, newLoginId) {
    var ctx;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.changePasswordAuth');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateViewer)(ctx(), viewerTypeName), (0, _validator.validateViewerId)(ctx(), viewerId), (0, _validator.validateRequired)(ctx('newLoginId'), newLoginId), (0, _validator.validateString)(ctx('newLoginId'), newLoginId)));
          return context$2$0.abrupt('return', auth.updateAuthProvider({ viewerId: viewerId, provider: 'password' }, { providerId: newLoginId }));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.removePasswordAuth = function callee$1$0(viewerId) {
    var ctx, deletedCount;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.removePasswordAuth');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateViewer)(ctx(), viewerTypeName), (0, _validator.validateViewerId)(ctx(), viewerId)));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(auth.deleteAuthProviders({
            viewerId: viewerId,
            provider: 'password'
          }));

        case 4:
          deletedCount = context$2$0.sent;
          return context$2$0.abrupt('return', deletedCount !== 0);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.createPasswordResetToken = function callee$1$0(loginId, length) {
    var numeric = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var ctx, passwordToken, newHash, isUpdated;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.createPasswordResetToken');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateViewer)(ctx(), viewerTypeName), (0, _validator.validateRequired)(ctx('loginId'), loginId), (0, _validator.validateString)(ctx('loginId'), loginId), (0, _validator.validateRequired)(ctx('length'), length), (0, _validator.validateNumeric)(ctx('length'), length), (0, _validator.validateRequired)(ctx('numeric'), numeric), (0, _validator.validateBoolean)(ctx('numeric'), numeric)));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(this.createRandomToken(length, numeric));

        case 4:
          passwordToken = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap((0, _password.hashPassword)(passwordToken, passwordHashStrength));

        case 7:
          newHash = context$2$0.sent;
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(auth.updateAuthProvider({ provider: 'password', providerId: loginId }, { passwordToken: newHash }));

        case 10:
          isUpdated = context$2$0.sent;

          if (isUpdated) {
            context$2$0.next = 13;
            break;
          }

          return context$2$0.abrupt('return', null);

        case 13:
          return context$2$0.abrupt('return', passwordToken);

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.changePassword = function callee$1$0(loginId, passwordOrToken, newPassword) {
    var ctx, provider, passwordHash, passwordTokenHash, isPassword, isToken, newPasswordHash;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.changePassword');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateViewer)(ctx(), viewerTypeName), (0, _validator.validateRequired)(ctx('loginId'), loginId), (0, _validator.validateString)(ctx('loginId'), loginId), (0, _validator.validateRequired)(ctx('passwordOrToken'), passwordOrToken), (0, _validator.validateString)(ctx('passwordOrToken'), passwordOrToken), (0, _validator.validateRequired)(ctx('newPassword'), newPassword), (0, _validator.validateString)(ctx('newPassword'), newPassword)));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(auth.getAuthProvider({
            provider: 'password',
            providerId: loginId
          }));

        case 4:
          provider = context$2$0.sent;

          if (provider) {
            context$2$0.next = 7;
            break;
          }

          return context$2$0.abrupt('return', false);

        case 7:
          passwordHash = provider.password;
          passwordTokenHash = provider.passwordToken;

          if (passwordHash) {
            context$2$0.next = 11;
            break;
          }

          return context$2$0.abrupt('return', false);

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap((0, _password.isPasswordValid)(passwordOrToken, passwordHash));

        case 13:
          isPassword = context$2$0.sent;
          context$2$0.t0 = passwordTokenHash;

          if (!context$2$0.t0) {
            context$2$0.next = 19;
            break;
          }

          context$2$0.next = 18;
          return _regeneratorRuntime.awrap((0, _password.isPasswordValid)(passwordOrToken, passwordTokenHash));

        case 18:
          context$2$0.t0 = context$2$0.sent;

        case 19:
          isToken = context$2$0.t0;

          if (!(!isPassword && !isToken)) {
            context$2$0.next = 22;
            break;
          }

          return context$2$0.abrupt('return', false);

        case 22:
          context$2$0.next = 24;
          return _regeneratorRuntime.awrap((0, _password.hashPassword)(newPassword, passwordHashStrength));

        case 24:
          newPasswordHash = context$2$0.sent;
          return context$2$0.abrupt('return', auth.updateAuthProvider({ provider: 'password', providerId: loginId }, { password: newPasswordHash, passwordToken: null }));

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  this.createRandomToken = function callee$1$0(length) {
    var numeric = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var ctx;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          ctx = mkContext.bind(null, 'security.createRandomToken');

          (0, _mutations.throwOnErrors)((0, _mutations.mergeResults)((0, _validator.validateRequired)(ctx('length'), length), (0, _validator.validateNumeric)(ctx('length'), length), (0, _validator.validateRequired)(ctx('numeric'), numeric), (0, _validator.validateBoolean)(ctx('numeric'), numeric)));

          if (!numeric) {
            context$2$0.next = 4;
            break;
          }

          return context$2$0.abrupt('return', (0, _jsutilsRandom.randomBase10)(length));

        case 4:
          return context$2$0.abrupt('return', (0, _jsutilsRandom.randomBase62)(length));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  _Object$freeze(this);
}