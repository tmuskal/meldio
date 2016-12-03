'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.cli = cli;

var _templateObject = _taggedTemplateLiteral(['\n              |\n              | ', ': ', '\n              |\n              |'], ['\n              |\n              | ', ': ', '\n              |\n              |']);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _jsutilsStrip = require('../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _packageJson = require('../../package.json');

var _init = require('./init');

var _build = require('./build');

var _run = require('./run');

var _watch = require('./watch');

function cli(args) {
  _commander2['default'].version(_packageJson.version);

  var commands = {};

  commands.init = _commander2['default'].command('init [project]').description('creates a new project').action(function (project) {
    (0, _init.init)(project).then(function () {
      //
    })['catch'](function (error) {
      console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), error.message));
      process.exit(1);
    });
  });

  commands.build = _commander2['default'].command('build').description('build the project').option('-w, --no-warnings', 'suppress schema definition warnings').option('-d, --dry-run', 'build but do not write to directory').action(function (options) {
    (0, _build.build)(options).then(function () {
      return process.exit(0);
    })['catch'](function (error) {
      console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), error.message));
      process.exit(1);
    });
  });

  commands.run = _commander2['default'].command('run').description('start the dev server').option('--host <address>', 'bind to the specified address').option('--port <number>', 'bind to the specified port').option('--no-warnings', 'suppress schema definition warnings').action(function (options) {
    (0, _run.run)(options).then(function () {
      //
    })['catch'](function (error) {
      console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), error.message));
      process.exit(1);
    });
  });

  commands.watch = _commander2['default'].command('watch').description('start the dev server and watch for changes').option('--host <address>', 'bind to the specified address').option('--port <number>', 'bind to the specified port').option('--no-warnings', 'suppress schema definition warnings').action(function (options) {
    (0, _watch.watch)(options).then(function () {
      //
    })['catch'](function (error) {
      console.error(error);
      process.exit(1);
    });
  });

  commands.help = _commander2['default'].command('help [command]').description('display help for [command]').action(function (command) {
    if (commands[command]) {
      commands[command].outputHelp();
    } else {
      commands.help.outputHelp();
    }
  });

  _commander2['default'].parse(args);

  if (!_commander2['default'].args.length) {
    _commander2['default'].help();
  }
}