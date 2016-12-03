'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.lintFiles = lintFiles;

var _templateObject = _taggedTemplateLiteral(['\n                        | ', ' in ', ': ', ' (', ')\n                        |\n                        |', '\n                        |\n                        |'], ['\n                        | ', ' in ', ': ', ' (', ')\n                        |\n                        |', '\n                        |\n                        |']);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _babelCodeFrame = require('babel-code-frame');

var _babelCodeFrame2 = _interopRequireDefault(_babelCodeFrame);

var _path = require('path');

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _common = require('../common');

var _lintFile = require('./lintFile');

function lintFiles(jsFiles) {
  var lintConfigPath, lintConfigText, lintConfig, progress, errors;
  return _regeneratorRuntime.async(function lintFiles$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        lintConfigPath = (0, _path.resolve)('.eslintrc');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _common.readFile)(lintConfigPath));

      case 3:
        lintConfigText = context$1$0.sent;
        lintConfig = JSON.parse(lintConfigText);
        progress = new _progress2['default'](' linting [:bar] :percent :etas', {
          width: 20,
          total: jsFiles.length + 1,
          clear: true
        });

        progress.tick(1);

        errors = [];
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_Promise.all(jsFiles.map(function callee$1$0(fileName) {
          var filePath, _ref, lintResults, code;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                filePath = (0, _path.resolve)(fileName);
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap((0, _lintFile.lintFile)(filePath, lintConfig));

              case 3:
                _ref = context$2$0.sent;
                lintResults = _ref.lintResults;
                code = _ref.code;

                if (lintResults && lintResults.length) {
                  errors.push.apply(errors, _toConsumableArray(lintResults.map(function (result) {
                    var tag = _chalk2['default'].bgRed(result.fatal ? 'fatal' : result.ruleId);
                    var loc = result.line + ':' + result.column;
                    var frame = (0, _babelCodeFrame2['default'])(code, result.line, result.column, {
                      highlightCode: true
                    });
                    return (0, _jsutilsStrip2['default'])(_templateObject, tag, fileName, result.message, loc, frame);
                  })));
                }
                progress.tick(1);

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })));

      case 10:
        if (!errors.length) {
          context$1$0.next = 13;
          break;
        }

        errors.forEach(function (error) {
          return console.error(error);
        });
        return context$1$0.abrupt('return', false);

      case 13:
        return context$1$0.abrupt('return', true);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

// load up linter rules