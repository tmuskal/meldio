'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.transpileFiles = transpileFiles;

var _templateObject = _taggedTemplateLiteral(['\n          | ', ' in ', '\n          |\n          |', '\n          |\n          |'], ['\n          | ', ' in ', '\n          |\n          |', '\n          |\n          |']);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _transpile = require('./transpile');

var _common = require('../common');

function transpileFiles(jsFiles, options, config) {
  var buildDirectory, rootDirectory, dryRun, progress, errors;
  return _regeneratorRuntime.async(function transpileFiles$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        buildDirectory = config.build;
        rootDirectory = config.root || '';
        dryRun = Boolean(options.dryRun);
        progress = new _progress2['default'](' transpiling [:bar] :percent :etas', {
          width: 20,
          total: jsFiles.length + 1,
          clear: true
        });

        progress.tick(1);

        errors = [];
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_Promise.all(jsFiles.map(function callee$1$0(fileName) {
          var code, targetFilePath;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                code = null;
                targetFilePath = rootDirectory && fileName.startsWith(rootDirectory) ? (0, _path.resolve)(rootDirectory, buildDirectory, '.' + fileName.substr(rootDirectory.length)) : (0, _path.resolve)(rootDirectory, buildDirectory, fileName);
                context$2$0.prev = 2;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap((0, _transpile.transpile)(fileName));

              case 5:
                code = context$2$0.sent;
                context$2$0.next = 11;
                break;

              case 8:
                context$2$0.prev = 8;
                context$2$0.t0 = context$2$0['catch'](2);

                errors.push((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed(context$2$0.t0.name), context$2$0.t0.message, context$2$0.t0.codeFrame));

              case 11:
                if (!(!dryRun && !(0, _jsutilsIsNullish2['default'])(code))) {
                  context$2$0.next = 16;
                  break;
                }

                context$2$0.next = 14;
                return _regeneratorRuntime.awrap((0, _common.mkdir)(targetFilePath));

              case 14:
                context$2$0.next = 16;
                return _regeneratorRuntime.awrap((0, _common.writeFile)(targetFilePath, code));

              case 16:
                progress.tick(1);

              case 17:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[2, 8]]);
        })));

      case 8:
        if (!errors.length) {
          context$1$0.next = 11;
          break;
        }

        errors.forEach(function (error) {
          return console.error(error);
        });
        return context$1$0.abrupt('return', false);

      case 11:
        return context$1$0.abrupt('return', true);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}