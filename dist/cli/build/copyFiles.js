'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.copyFiles = copyFiles;

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _fsCp = require('fs-cp');

var _fsCp2 = _interopRequireDefault(_fsCp);

var _path = require('path');

function copyFiles(jsonFiles, options, config) {
  var buildDirectory, rootDirectory, progress;
  return _regeneratorRuntime.async(function copyFiles$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        buildDirectory = config.build;
        rootDirectory = config.root || '';
        progress = new _progress2['default'](' copying json files [:bar] :percent :etas', {
          width: 20,
          total: jsonFiles.length + 1,
          clear: true
        });

        progress.tick(1);

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_Promise.all(jsonFiles.map(function callee$1$0(fileName) {
          var filePath, targetFilePath;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                filePath = (0, _path.resolve)(fileName);
                targetFilePath = fileName.startsWith(rootDirectory) ? (0, _path.resolve)(rootDirectory, buildDirectory, '.' + fileName.substr(rootDirectory.length)) : (0, _path.resolve)(rootDirectory, buildDirectory, fileName);
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap((0, _fsCp2['default'])(filePath, targetFilePath));

              case 4:
                progress.tick(1);

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })));

      case 6:
        return context$1$0.abrupt('return', true);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}