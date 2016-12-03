'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkHooks = checkHooks;

var _templateObject = _taggedTemplateLiteral(['\n        | ', ' ', '\n        |\n        |'], ['\n        | ', ' ', '\n        |\n        |']);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _path = require('path');

var HOOKS = {
  newOAuthProvider: { isReqired: false },
  onInvalidPassword: { isReqired: false },
  onLogin: { isReqired: false },
  onLogout: { isReqired: false }
};

exports.HOOKS = HOOKS;

function checkHooks(options, config) {
  var buildDirectory, hooksDirectory, rootDirectory, progress, errors;
  return _regeneratorRuntime.async(function checkHooks$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        buildDirectory = config.build;
        hooksDirectory = config.hooks;
        rootDirectory = config.root || '';
        progress = new _progress2['default'](' checking hooks [:bar] :percent :etas', {
          width: 20,
          total: 1 + _Object$keys(HOOKS).length,
          clear: true
        });

        progress.tick(1);

        errors = _Object$keys(HOOKS).reduce(function (acc, hook) {
          var file = (0, _path.join)(rootDirectory, buildDirectory, hooksDirectory, hook + '.js');
          var filePath = (0, _path.resolve)(file);

          var thisModule = null;
          try {
            delete require.cache[require.resolve(filePath)];
            thisModule = require(filePath);
          } catch (e) {
            progress.tick(1);
            return HOOKS[hook].isReqired ? acc.concat('Hook "' + file + '" is not found.') : acc;
          }

          if (thisModule && typeof thisModule[hook] !== 'function') {
            progress.tick(1);
            return acc.concat('Hook "' + file + '" does not export "' + hook + '" function.');
          }

          progress.tick(1);
          return acc;
        }, []);

        if (!errors.length) {
          context$1$0.next = 9;
          break;
        }

        errors.forEach(function (error) {
          return console.log((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), error));
        });

        return context$1$0.abrupt('return', false);

      case 9:
        return context$1$0.abrupt('return', true);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}