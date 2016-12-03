'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.build = build;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _jsutilsValues = require('../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _clearBuild = require('./clearBuild');

var _analyzeSchema = require('./analyzeSchema');

var _listFiles = require('./listFiles');

var _lintFiles = require('./lintFiles');

var _transpileFiles = require('./transpileFiles');

var _copyFiles = require('./copyFiles');

var _checkMutations = require('./checkMutations');

var _checkPermissions = require('./checkPermissions');

var _checkHooks = require('./checkHooks');

var _common = require('../common');

function build(options, preloadedConfig) {
  var config, buildDirectory, schemaFile, rootDirectory, dryRun, CLEARSCREEN, schema, jsGlob, jsonGlob, ignoreGlob, jsFiles, jsonFiles, numberOfMutations;
  return _regeneratorRuntime.async(function build$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!preloadedConfig) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.t0 = preloadedConfig;
        context$1$0.next = 7;
        break;

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _common.loadConfig)());

      case 6:
        context$1$0.t0 = context$1$0.sent;

      case 7:
        config = context$1$0.t0;
        buildDirectory = config.build;
        schemaFile = config.schema;
        rootDirectory = config.root || '';
        dryRun = Boolean(options.dryRun);
        CLEARSCREEN = '\u001b[2J';

        process.stdout.write(CLEARSCREEN);

        if (dryRun) {
          context$1$0.next = 20;
          break;
        }

        console.log(_chalk2['default'].bgGreen(' building... '));
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap((0, _clearBuild.clearBuild)((0, _path.join)(rootDirectory, buildDirectory)));

      case 18:
        context$1$0.next = 21;
        break;

      case 20:
        console.log(_chalk2['default'].bgGreen(' build dry run... '));

      case 21:

        // analyzing schema
        console.log('\n ' + _chalk2['default'].magenta('analyzing schema... '));
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap((0, _analyzeSchema.analyzeSchema)(schemaFile, options, config));

      case 24:
        schema = context$1$0.sent;

        if (!schema) {
          context$1$0.next = 29;
          break;
        }

        console.log(_chalk2['default'].green(' successfully analyzed ' + _Object$keys(schema).length + ' schema elements.'));
        context$1$0.next = 30;
        break;

      case 29:
        return context$1$0.abrupt('return', false);

      case 30:
        jsGlob = (0, _path.join)(rootDirectory, '**/*.js');
        jsonGlob = (0, _path.join)(rootDirectory, '**/*.json');
        ignoreGlob = (0, _path.join)(rootDirectory, '**/node_modules/**');
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap((0, _listFiles.listFiles)(jsGlob, ignoreGlob));

      case 35:
        jsFiles = context$1$0.sent;
        context$1$0.next = 38;
        return _regeneratorRuntime.awrap((0, _listFiles.listFiles)(jsonGlob, ignoreGlob));

      case 38:
        context$1$0.t1 = function (fileName) {
          return fileName !== 'package.json';
        };

        jsonFiles = context$1$0.sent.filter(context$1$0.t1);

        // lint .js files using eslint
        console.log('\n ' + _chalk2['default'].magenta('linting... '));
        context$1$0.next = 43;
        return _regeneratorRuntime.awrap((0, _lintFiles.lintFiles)(jsFiles));

      case 43:
        if (!context$1$0.sent) {
          context$1$0.next = 47;
          break;
        }

        console.log(_chalk2['default'].green(' successfully linted ' + jsFiles.length + ' files.'));
        context$1$0.next = 48;
        break;

      case 47:
        return context$1$0.abrupt('return', false);

      case 48:

        // transpile .js files using babel
        console.log('\n ' + _chalk2['default'].magenta('transpiling... '));
        context$1$0.next = 51;
        return _regeneratorRuntime.awrap((0, _transpileFiles.transpileFiles)(jsFiles, options, config));

      case 51:
        if (!context$1$0.sent) {
          context$1$0.next = 55;
          break;
        }

        console.log(_chalk2['default'].green(' successfully transpiled ' + jsFiles.length + ' files.'));
        context$1$0.next = 56;
        break;

      case 55:
        return context$1$0.abrupt('return', false);

      case 56:
        if (!(jsonFiles.length && !dryRun)) {
          context$1$0.next = 65;
          break;
        }

        console.log('\n ' + _chalk2['default'].magentda('copying json files... '));

        context$1$0.next = 60;
        return _regeneratorRuntime.awrap((0, _copyFiles.copyFiles)(jsonFiles, options, config));

      case 60:
        if (!context$1$0.sent) {
          context$1$0.next = 64;
          break;
        }

        console.log(_chalk2['default'].green(' successfully copied ' + jsonFiles.length + ' json files.'));
        context$1$0.next = 65;
        break;

      case 64:
        return context$1$0.abrupt('return', false);

      case 65:
        numberOfMutations = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
          return type.kind === 'mutation';
        }).length;

        if (!numberOfMutations) {
          context$1$0.next = 75;
          break;
        }

        console.log('\n ' + _chalk2['default'].magenta('checking mutations... '));

        context$1$0.next = 70;
        return _regeneratorRuntime.awrap((0, _checkMutations.checkMutations)(schema, options, config));

      case 70:
        if (!context$1$0.sent) {
          context$1$0.next = 74;
          break;
        }

        console.log(_chalk2['default'].green(' all ' + numberOfMutations + ' mutations are present and accounted for.'));
        context$1$0.next = 75;
        break;

      case 74:
        return context$1$0.abrupt('return', false);

      case 75:

        // check hooks
        console.log('\n ' + _chalk2['default'].magenta('checking hooks... '));

        context$1$0.next = 78;
        return _regeneratorRuntime.awrap((0, _checkHooks.checkHooks)(options, config));

      case 78:
        if (!context$1$0.sent) {
          context$1$0.next = 82;
          break;
        }

        console.log(_chalk2['default'].green(' done with hooks checkup.'));
        context$1$0.next = 83;
        break;

      case 82:
        return context$1$0.abrupt('return', false);

      case 83:

        // check permissions
        console.log('\n ' + _chalk2['default'].magenta('checking permissions... '));

        context$1$0.next = 86;
        return _regeneratorRuntime.awrap((0, _checkPermissions.checkPermissions)(schema, options, config));

      case 86:
        if (!context$1$0.sent) {
          context$1$0.next = 90;
          break;
        }

        console.log(_chalk2['default'].green(' done with permissions checkup.'));
        context$1$0.next = 91;
        break;

      case 90:
        return context$1$0.abrupt('return', false);

      case 91:

        console.log();

        return context$1$0.abrupt('return', true);

      case 93:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

// pick up all js files for transpilation and linting

// copy json files into build directory, if any

// check if all mutations are accounted for