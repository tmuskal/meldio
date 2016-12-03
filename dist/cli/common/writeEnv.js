'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.writeEnv = writeEnv;

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _writeFile = require('./writeFile');

function writeEnv(path, content) {
  var text;
  return _regeneratorRuntime.async(function writeEnv$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        text = _Object$keys(content).filter(function (key) {
          return !(0, _jsutilsIsNullish2['default'])(content[key]);
        }).map(function (key) {
          return key + '=' + content[key];
        }).join('\n');
        return context$1$0.abrupt('return', (0, _writeFile.writeFile)(path, text));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}