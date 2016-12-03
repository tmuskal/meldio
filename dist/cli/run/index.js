'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

exports.run = run;

var _templateObject = _taggedTemplateLiteral(['\n      | ', '', '\n        ~ ', '\n      | ', '\n      |'], ['\n      | ', '', '\n        ~ ', '\n      | ', '\n      |']);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsValues = require('../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _path = require('path');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _expressGraphql = require('../../express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _resolversMongodb = require('../../resolvers/mongodb');

var resolvers = _interopRequireWildcard(_resolversMongodb);

var _build = require('../build');

var _schema = require('../../schema');

var _common = require('../common');

var _winchan = require('./winchan');

var _security = require('./security');

function run(options, preloadedConfig, preloadedEnv) {
  var CHECK, X, config, projectName, projectVersion, enabledAuth, schemaFile, permissionsFile, mutationsDirectory, hooksDirectory, buildDirectory, rootDirectory, protocol, host, port, envPath, env, buildResult, app, schemaPath, schemaText, ast, schema, results, hasValidationErrors, transformedAST, result, permissionsPath, permissions, _require, permissionsFn, db, mutations, rootValue, hooks, handlers, setupOAuthRoutes, server, abbName, abbVer, gray, fb, goog, ghub, pass, lines;

  return _regeneratorRuntime.async(function run$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        CHECK = _chalk2['default'].green.bold('✓');
        X = _chalk2['default'].red.bold('✘');

        if (!preloadedConfig) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.t0 = preloadedConfig;
        context$1$0.next = 9;
        break;

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _common.loadConfig)());

      case 8:
        context$1$0.t0 = context$1$0.sent;

      case 9:
        config = context$1$0.t0;
        projectName = config.name;
        projectVersion = config.version;
        enabledAuth = config.enabledAuth;
        schemaFile = config.schema;
        permissionsFile = config.permissions;
        mutationsDirectory = config.mutations;
        hooksDirectory = config.hooks;
        buildDirectory = config.build;
        rootDirectory = config.root || '';
        protocol = config.protocol || 'http';
        host = options.host || config.host;
        port = options.port || config.port;
        envPath = rootDirectory ? (0, _path.resolve)((0, _path.join)(rootDirectory, '.env')) : (0, _path.resolve)('.env');

        if (!preloadedEnv) {
          context$1$0.next = 27;
          break;
        }

        context$1$0.t1 = preloadedEnv;
        context$1$0.next = 30;
        break;

      case 27:
        context$1$0.next = 29;
        return _regeneratorRuntime.awrap((0, _common.loadEnv)(envPath));

      case 29:
        context$1$0.t1 = context$1$0.sent;

      case 30:
        env = context$1$0.t1;

        if (env.MASTER_SECRET) {
          context$1$0.next = 35;
          break;
        }

        context$1$0.next = 34;
        return _regeneratorRuntime.awrap((0, _common.newMasterSecret)());

      case 34:
        env.MASTER_SECRET = context$1$0.sent;

      case 35:
        if (options.skipBuild) {
          context$1$0.next = 41;
          break;
        }

        context$1$0.next = 38;
        return _regeneratorRuntime.awrap((0, _build.build)(options, config));

      case 38:
        buildResult = context$1$0.sent;

        if (buildResult) {
          context$1$0.next = 41;
          break;
        }

        return context$1$0.abrupt('return', null);

      case 41:
        console.log(_chalk2['default'].bgGreen(' starting... '));

        app = (0, _express2['default'])();

        app.use((0, _bodyParser.json)());
        app.use((0, _bodyParser.urlencoded)({ extended: true }));

        app.use('/static', _express2['default']['static']((0, _path.join)(__dirname, 'static')));

        schemaPath = (0, _path.resolve)(rootDirectory, schemaFile);
        context$1$0.next = 49;
        return _regeneratorRuntime.awrap((0, _common.readFile)(schemaPath));

      case 49:
        schemaText = context$1$0.sent;
        ast = (0, _schema.parse)(schemaText);
        schema = (0, _schema.analyzeAST)(ast);
        results = (0, _schema.validate)(schema);
        hasValidationErrors = Boolean(results.filter(function (r) {
          return r.kind === 'error';
        }).length);

        (0, _jsutilsInvariant2['default'])(!hasValidationErrors, 'Cannot have errors while running');
        transformedAST = (0, _schema.transformAST)(ast, schema);
        result = (0, _schema.generate)(transformedAST, schema, resolvers);
        permissionsPath = (0, _path.resolve)(rootDirectory, buildDirectory, permissionsFile);
        permissions = {};

        try {
          delete require.cache[require.resolve(permissionsPath)];
          _require = require(permissionsPath);
          permissionsFn = _require.permissions;

          permissions = permissionsFn();
        } catch (e) {
          // permissions file missing
          permissions = {};
        }

        db = undefined;
        context$1$0.prev = 61;
        context$1$0.next = 64;
        return _regeneratorRuntime.awrap(resolvers.connect(config, schema));

      case 64:
        db = context$1$0.sent;
        context$1$0.next = 71;
        break;

      case 67:
        context$1$0.prev = 67;
        context$1$0.t2 = context$1$0['catch'](61);

        console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), !context$1$0.t2.meldio ? ' MongoDB connection failed:' : '', context$1$0.t2.message, context$1$0.t2.details || ''));
        process.exit(1);

      case 71:
        mutations = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
          return type.kind === 'mutation';
        }).map(function (mutation) {
          return mutation.name;
        }).reduce(function (acc, mutation) {
          var file = (0, _path.resolve)(rootDirectory, buildDirectory, mutationsDirectory, mutation + '.js');
          delete require.cache[require.resolve(file)];
          var mutationModule = require(file);
          return _extends({}, acc, mutationModule);
        }, {});
        rootValue = {
          db: db,
          permissions: permissions,
          mutations: mutations,
          config: config,
          env: env
        };
        hooks = _Object$keys(_build.HOOKS).reduce(function (acc, hook) {
          var file = (0, _path.resolve)(rootDirectory, buildDirectory, hooksDirectory, hook + '.js');
          var hookModule = {};
          try {
            delete require.cache[require.resolve(file)];
            hookModule = require(file);
          } catch (e) {
            return acc;
          }
          var hookFn = hookModule[hook];
          var context = resolvers.makeHookContext(schema, rootValue, hook);
          return _extends({}, acc, _defineProperty({}, hook, hookFn.bind(context)));
        }, {});

        rootValue.hooks = hooks;

        app.use((0, _cors2['default'])());

        handlers = (0, _security.OAuthHandlers)(rootValue, resolvers);

        setupOAuthRoutes = function setupOAuthRoutes(provider) {
          if (enabledAuth.includes(provider)) {
            var _handlers = handlers(provider);

            var redirect = _handlers.redirect;
            var accessTokenAuth = _handlers.accessTokenAuth;
            var codeAuth = _handlers.codeAuth;

            app.get('/auth/' + provider, redirect);
            app.post('/auth/' + provider, accessTokenAuth);
            app.get('/auth/' + provider + '/callback', codeAuth);
          }
        };

        setupOAuthRoutes('facebook');
        setupOAuthRoutes('google');
        setupOAuthRoutes('github');

        if (enabledAuth.includes('password')) {
          app.post('/auth/password', (0, _security.PasswordHandler)(rootValue, resolvers));
        }

        app.post('/auth/logout', (0, _security.LogoutHandler)(rootValue, resolvers));
        app.get('/auth/relay', _winchan.relay);

        app.use('/graphql', (0, _security.AuthenticationHandler)(env.MASTER_SECRET), (0, _expressGraphql2['default'])(function (request) {
          return {
            schema: result,
            rootValue: _extends({}, rootValue, { viewerId: request.viewerId }),
            graphiql: true
          };
        }));

        context$1$0.next = 87;
        return _regeneratorRuntime.awrap(promiseToListen(app, port, host));

      case 87:
        server = context$1$0.sent;
        abbName = projectName.length > 15 ? projectName.substr(0, 12) + '...' : projectName;
        abbVer = projectVersion.substr(0, 8);
        gray = _chalk2['default'].gray;
        fb = enabledAuth.includes('facebook') ? CHECK : X;
        goog = enabledAuth.includes('google') ? CHECK : X;
        ghub = enabledAuth.includes('github') ? CHECK : X;
        pass = enabledAuth.includes('password') ? CHECK : X;
        lines = ['', gray('     app ' + _chalk2['default'].cyan.bold(abbName) + ' ver ' + _chalk2['default'].cyan.bold(abbVer)), gray('     ' + _chalk2['default'].underline(protocol + '://' + host + ':' + port + '/graphql')), gray('     auth: ' + fb + ' facebook   ' + goog + ' google'), gray('           ' + ghub + ' github     ' + pass + ' password'), gray('')];

        (0, _common.logo)(lines);

        return context$1$0.abrupt('return', server);

      case 98:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[61, 67]]);
}

var promiseToListen = function promiseToListen(app, port, host) {
  return _regeneratorRuntime.async(function promiseToListen$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', new _Promise(function (resolve, reject) {
          var server = app.listen(port, host, function (error) {
            if (error) {
              reject(error);
            } else {
              resolve(server);
            }
          });
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

// const twtr = enabledAuth.includes('twitter') ? CHECK : X;