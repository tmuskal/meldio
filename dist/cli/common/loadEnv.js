'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.loadEnv = loadEnv;

var _readFile = require('./readFile');

function loadEnv(filePath) {
  var envText;
  return _regeneratorRuntime.async(function loadEnv$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        envText = undefined;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _readFile.readFile)(filePath));

      case 4:
        envText = context$1$0.sent;
        context$1$0.next = 12;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        if (!(context$1$0.t0.code === 'ENOENT')) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', {});

      case 11:
        throw context$1$0.t0;

      case 12:
        return context$1$0.abrupt('return', envText.split('\n').map(function (line) {
          return splitOnEq(line);
        }).filter(function (_ref2) {
          var _ref22 = _slicedToArray(_ref2, 2);

          var variable = _ref22[0];
          var value = _ref22[1];
          return variable && value;
        }).map(function (_ref3) {
          var _ref32 = _slicedToArray(_ref3, 2);

          var variable = _ref32[0];
          var value = _ref32[1];
          return _defineProperty({}, variable, value);
        }).reduce(function (acc, val) {
          return _extends({}, acc, val);
        }, {}));

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
}

var splitOnEq = function splitOnEq(str) {
  var pos = str.indexOf('=');
  var hasEq = pos !== -1;

  var name = hasEq ? str.substring(0, pos) : str;
  var value = hasEq ? str.substring(pos + 1) : '';

  return [name, value];
};

// if file is not found, simply return an empty env object: