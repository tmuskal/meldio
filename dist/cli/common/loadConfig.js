'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.loadConfig = loadConfig;

var _path = require('path');

var _readFile = require('./readFile');

function loadConfig() {
  var packagePath, packageText, packageObj;
  return _regeneratorRuntime.async(function loadConfig$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        packagePath = (0, _path.resolve)('package.json');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _readFile.readFile)(packagePath));

      case 3:
        packageText = context$1$0.sent;
        packageObj = JSON.parse(packageText) || {};
        return context$1$0.abrupt('return', _extends({
          name: packageObj.name,
          version: packageObj.version
        }, packageObj.config && packageObj.config.meldio ? packageObj.config.meldio : {}));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}