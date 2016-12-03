'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.watch = watch;

var _templateObject = _taggedTemplateLiteral(['\n          | ', ' Failed loading package.json file:\n          |\n          | ', '', '\n          |\n          |'], ['\n          | ', ' Failed loading package.json file:\n          |\n          | ', '', '\n          |\n          |']),
    _templateObject2 = _taggedTemplateLiteral(['\n          | ', ' Failed loading .env file:\n          |\n          | ', '', '\n          |\n          |'], ['\n          | ', ' Failed loading .env file:\n          |\n          | ', '', '\n          |\n          |']),
    _templateObject3 = _taggedTemplateLiteral([' all ', ' mutations are present and\n                 ~ accounted for.'], [' all ', ' mutations are present and\n                 ~ accounted for.']);

var _path = require('path');

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsValues = require('../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _build = require('../build');

var _run = require('../run');

var _common = require('../common');

var _enableDestroy = require('./enableDestroy');

function watch(options) {
  var RING_BELL, CLEARLINE, CLEARSCREEN, config, rootDirectory, _config, mutationsDirectory, permissionsFile, schemaFile, buildDirectory, envPath, env, server, watchPaths, watchOptions, watcher, onSignal, timeout, isBuilding, needsBuild, buildSet, onReady, onChange, onDelete, debouncedBuild, guardedBuild, buildFiles;

  return _regeneratorRuntime.async(function watch$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        buildFiles = function buildFiles(filePaths) {
          var success, schema, jsFiles, jsonFiles, numberOfMutations, hasHooks;
          return _regeneratorRuntime.async(function buildFiles$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                process.stdout.write(CLEARSCREEN);
                success = true;
                schema = null;

                if (!filePaths.some(function (filePath) {
                  return filePath.includes(schemaFile) || filePath.includes(mutationsDirectory) || filePath.includes(permissionsFile);
                })) {
                  context$2$0.next = 9;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('analyzing schema... '));
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap((0, _build.analyzeSchema)(schemaFile, options, config));

              case 7:
                schema = context$2$0.sent;

                if (schema) {
                  console.log(_chalk2['default'].green(' schema looks good.'));
                } else {
                  success = false;
                }

              case 9:
                if (!filePaths.includes('package.json')) {
                  context$2$0.next = 22;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('reloading configuration... '));
                context$2$0.prev = 11;
                context$2$0.next = 14;
                return _regeneratorRuntime.awrap((0, _common.loadConfig)());

              case 14:
                config = context$2$0.sent;

                console.log(_chalk2['default'].green(' successfully reloaded configuration file.'));
                context$2$0.next = 22;
                break;

              case 18:
                context$2$0.prev = 18;
                context$2$0.t0 = context$2$0['catch'](11);

                console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), context$2$0.t0.code ? context$2$0.t0.code + ': ' : '', context$2$0.t0.message));
                success = false;

              case 22:
                if (!filePaths.some(function (filePath) {
                  return filePath.includes('.env');
                })) {
                  context$2$0.next = 35;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('reloading environment... '));
                context$2$0.prev = 24;
                context$2$0.next = 27;
                return _regeneratorRuntime.awrap((0, _common.loadEnv)(envPath));

              case 27:
                env = context$2$0.sent;

                console.log(_chalk2['default'].green(' successfully reloaded environment file.'));
                context$2$0.next = 35;
                break;

              case 31:
                context$2$0.prev = 31;
                context$2$0.t1 = context$2$0['catch'](24);

                console.error((0, _jsutilsStrip2['default'])(_templateObject2, _chalk2['default'].bgRed('Error'), context$2$0.t1.code ? context$2$0.t1.code + ': ' : '', context$2$0.t1.message));
                success = false;

              case 35:
                jsFiles = filePaths.filter(function (filePath) {
                  return filePath.endsWith('.js');
                });
                jsonFiles = filePaths.filter(function (filePath) {
                  return filePath.endsWith('.json') && filePath !== 'package.json';
                });

                if (!jsFiles.length) {
                  context$2$0.next = 55;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('linting... '));
                context$2$0.next = 41;
                return _regeneratorRuntime.awrap((0, _build.lintFiles)(jsFiles));

              case 41:
                if (!context$2$0.sent) {
                  context$2$0.next = 45;
                  break;
                }

                console.log(_chalk2['default'].green(' successfully linted ' + jsFiles.length + ' files.'));
                context$2$0.next = 46;
                break;

              case 45:
                success = false;

              case 46:
                if (!success) {
                  context$2$0.next = 55;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('transpiling... '));
                context$2$0.next = 50;
                return _regeneratorRuntime.awrap((0, _build.transpileFiles)(jsFiles, options, config));

              case 50:
                if (!context$2$0.sent) {
                  context$2$0.next = 54;
                  break;
                }

                console.log(_chalk2['default'].green(' successfully transpiled ' + jsFiles.length + ' files.'));
                context$2$0.next = 55;
                break;

              case 54:
                success = false;

              case 55:
                if (!jsonFiles.length) {
                  context$2$0.next = 64;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('copying json files... '));

                context$2$0.next = 59;
                return _regeneratorRuntime.awrap((0, _build.copyFiles)(jsonFiles, options, config));

              case 59:
                if (!context$2$0.sent) {
                  context$2$0.next = 63;
                  break;
                }

                console.log(_chalk2['default'].green(' successfully copied ' + jsonFiles.length + ' json files.'));
                context$2$0.next = 64;
                break;

              case 63:
                success = false;

              case 64:
                if (!(success && schema)) {
                  context$2$0.next = 75;
                  break;
                }

                numberOfMutations = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
                  return type.kind === 'mutation';
                }).length;

                if (!numberOfMutations) {
                  context$2$0.next = 75;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('checking mutations... '));

                context$2$0.next = 70;
                return _regeneratorRuntime.awrap((0, _build.checkMutations)(schema, options, config));

              case 70:
                if (!context$2$0.sent) {
                  context$2$0.next = 74;
                  break;
                }

                console.log(_chalk2['default'].green((0, _jsutilsStrip2['default'])(_templateObject3, numberOfMutations)));
                context$2$0.next = 75;
                break;

              case 74:
                success = false;

              case 75:
                hasHooks = filePaths.some(function (path) {
                  return _Object$keys(_build.HOOKS).some(function (hook) {
                    return path.endsWith(hook + '.js');
                  });
                });

                if (!(success && hasHooks)) {
                  context$2$0.next = 85;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('checking hooks... '));

                context$2$0.next = 80;
                return _regeneratorRuntime.awrap((0, _build.checkHooks)(options, config));

              case 80:
                if (!context$2$0.sent) {
                  context$2$0.next = 84;
                  break;
                }

                console.log(_chalk2['default'].green(' done with hooks checkup.'));
                context$2$0.next = 85;
                break;

              case 84:
                success = false;

              case 85:
                if (!(success && schema)) {
                  context$2$0.next = 94;
                  break;
                }

                console.log('\n ' + _chalk2['default'].magenta('checking permissions... '));

                context$2$0.next = 89;
                return _regeneratorRuntime.awrap((0, _build.checkPermissions)(schema, options, config));

              case 89:
                if (!context$2$0.sent) {
                  context$2$0.next = 93;
                  break;
                }

                console.log(_chalk2['default'].green(' done with permissions checkup.'));
                context$2$0.next = 94;
                break;

              case 93:
                success = false;

              case 94:
                if (!success) {
                  context$2$0.next = 108;
                  break;
                }

                if (!server) {
                  context$2$0.next = 100;
                  break;
                }

                console.log('\n' + _chalk2['default'].magenta(' stopping the server... '));
                context$2$0.next = 99;
                return _regeneratorRuntime.awrap(server.destroy());

              case 99:
                console.log(_chalk2['default'].green(' stopped the server '));

              case 100:
                console.log();
                context$2$0.next = 103;
                return _regeneratorRuntime.awrap((0, _run.run)(_extends({}, options, { skipBuild: true }), config, env));

              case 103:
                server = context$2$0.sent;

                (0, _enableDestroy.enableDestroy)(server);
                console.log('\n' + _chalk2['default'].bgGreen(' watching... '));
                context$2$0.next = 109;
                break;

              case 108:
                process.stdout.write('\n' + RING_BELL + _chalk2['default'].bgGreen(' watching... '));

              case 109:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this, [[11, 18], [24, 31]]);
        };

        guardedBuild = function guardedBuild() {
          if (isBuilding || !needsBuild) {
            return;
          }
          isBuilding = true;
          var filepaths = _Object$keys(buildSet);
          buildSet = {};
          needsBuild = false;
          buildFiles(filepaths).then(function () {
            isBuilding = false;
            process.nextTick(guardedBuild);
          });
        };

        debouncedBuild = function debouncedBuild() {
          needsBuild = true;
          clearTimeout(timeout);
          timeout = setTimeout(guardedBuild, 250);
        };

        onDelete = function onDelete(filepath) {
          delete buildSet[filepath];
          debouncedBuild();
        };

        onChange = function onChange(filepath, stat) {
          if (stat && !stat.isDirectory()) {
            buildSet[filepath] = true;
            debouncedBuild();
          }
        };

        onReady = function onReady() {
          console.log(_chalk2['default'].bgGreen(' watching... '));
        };

        RING_BELL = '\x07';
        CLEARLINE = '\r\x1B[K';
        CLEARSCREEN = '\u001b[2J';
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap((0, _common.loadConfig)());

      case 11:
        config = context$1$0.sent;
        rootDirectory = config.root || '';
        _config = config;
        mutationsDirectory = _config.mutations;
        permissionsFile = _config.permissions;
        schemaFile = _config.schema;
        buildDirectory = _config.build;
        envPath = rootDirectory ? (0, _path.resolve)((0, _path.join)(rootDirectory, '.env')) : (0, _path.resolve)('.env');
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap((0, _common.loadEnv)(envPath));

      case 21:
        env = context$1$0.sent;
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap((0, _run.run)(options, config, env));

      case 24:
        server = context$1$0.sent;

        if (server) {
          (0, _enableDestroy.enableDestroy)(server);
        }

        watchPaths = ['**/*.js', '**/*.json', schemaFile, '.env'].map(function (path) {
          return (0, _path.join)(rootDirectory || '.', path);
        }).concat('package.json');
        watchOptions = {
          ignored: [(0, _path.join)('**', buildDirectory, '**'), (0, _path.join)('**', 'node_modules', '**')],
          alwaysStat: true,
          ignoreInitial: true
        };
        watcher = _chokidar2['default'].watch(watchPaths, watchOptions);

        watcher.on('ready', onReady).on('add', onChange).on('unlink', onDelete).on('change', onChange);

        onSignal = function onSignal() {
          watcher.close();
          if (server) {
            server.destroy(function (error) {
              if (error) {
                console.error(CLEARLINE + _chalk2['default'].bgRed(' error stopping the server '));
                process.exit(1);
              } else {
                console.log(CLEARLINE + _chalk2['default'].bgYellow(' stopped the server and watcher. '));
                process.exit(0);
              }
            });
          } else {
            console.log(CLEARLINE + _chalk2['default'].bgYellow(' stopped the watcher. '));
            process.exit(0);
          }
        };

        process.on('SIGINT', onSignal);
        // process.on('SIGQUIT', onSignal);
        // process.on('SIGTERM', onSignal);

        timeout = undefined;
        isBuilding = undefined;
        needsBuild = undefined;
        buildSet = {};

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

// check hooks

// check permissions