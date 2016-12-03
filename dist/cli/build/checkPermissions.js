'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkPermissions = checkPermissions;

var _templateObject = _taggedTemplateLiteral(['\n        | ', ' ', ' file is missing.\n        |\n        |'], ['\n        | ', ' ', ' file is missing.\n        |\n        |']),
    _templateObject2 = _taggedTemplateLiteral(['\n      | ', ' ', ' file is missing.\n      |\n      |'], ['\n      | ', ' ', ' file is missing.\n      |\n      |']),
    _templateObject3 = _taggedTemplateLiteral(['\n      | ', ' ', ' does not export\n        ~ "permissions" function.\n      |\n      |'], ['\n      | ', ' ', ' does not export\n        ~ "permissions" function.\n      |\n      |']),
    _templateObject4 = _taggedTemplateLiteral(['\n      | ', ' Permissions function in ', '\n        ~ threw an expection.\n      |\n      | Error message: ', '\n      |\n      |'], ['\n      | ', ' Permissions function in ', '\n        ~ threw an expection.\n      |\n      | Error message: ', '\n      |\n      |']),
    _templateObject5 = _taggedTemplateLiteral(['\n      | ', ' Permissions function in ', '\n        ~ should return an object.\n      |\n      |'], ['\n      | ', ' Permissions function in ', '\n        ~ should return an object.\n      |\n      |']),
    _templateObject6 = _taggedTemplateLiteral(['\n      | ', ' Permissions function in ', '\n        ~ is missing permissions for:\n      |\n      |', '\n      |\n      | When permissions are not explicitly defined, the server will disallow\n        ~ access.\n      |'], ['\n      | ', ' Permissions function in ', '\n        ~ is missing permissions for:\n      |\n      |', '\n      |\n      | When permissions are not explicitly defined, the server will disallow\n        ~ access.\n      |']);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _jsutilsValues = require('../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _path = require('path');

function checkPermissions(schema, options, config) {
  var buildDirectory, permissionsFile, enabledAuth, rootDirectory, numberOfNodeTypes, numberOfMutations, progress, file, filePath, permissionsModule, permissions, missingPermissions;
  return _regeneratorRuntime.async(function checkPermissions$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        buildDirectory = config.build;
        permissionsFile = config.permissions;
        enabledAuth = config.enabledAuth;
        rootDirectory = config.root || '';
        numberOfNodeTypes = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
          return type.kind === 'type' && type.implementsNode;
        }).length;
        numberOfMutations = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
          return type.kind === 'mutation';
        }).length;
        progress = new _progress2['default'](' checking permissions [:bar] :percent :etas', {
          width: 20,
          total: numberOfNodeTypes + numberOfMutations + 1,
          clear: true
        });
        file = (0, _path.join)(rootDirectory, buildDirectory, permissionsFile);
        filePath = (0, _path.resolve)(file);
        permissionsModule = null;
        context$1$0.prev = 10;

        delete require.cache[require.resolve(filePath)];
        permissionsModule = require(filePath);
        context$1$0.next = 22;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](10);

        if (!(enabledAuth.length === 0)) {
          context$1$0.next = 20;
          break;
        }

        console.log((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgYellow('Warning'), permissionsFile));

        return context$1$0.abrupt('return', true);

      case 20:
        console.error((0, _jsutilsStrip2['default'])(_templateObject2, _chalk2['default'].bgRed('Error'), permissionsFile));

        return context$1$0.abrupt('return', false);

      case 22:
        if (!(typeof permissionsModule.permissions !== 'function')) {
          context$1$0.next = 25;
          break;
        }

        console.error((0, _jsutilsStrip2['default'])(_templateObject3, _chalk2['default'].bgRed('Error'), permissionsFile));

        return context$1$0.abrupt('return', false);

      case 25:
        permissions = {};
        context$1$0.prev = 26;

        permissions = permissionsModule.permissions();
        context$1$0.next = 34;
        break;

      case 30:
        context$1$0.prev = 30;
        context$1$0.t1 = context$1$0['catch'](26);

        console.error((0, _jsutilsStrip2['default'])(_templateObject4, _chalk2['default'].bgRed('Error'), permissionsFile, context$1$0.t1.message));
        return context$1$0.abrupt('return', false);

      case 34:
        if (!(typeof permissions !== 'object' || Array.isArray(permissions))) {
          context$1$0.next = 37;
          break;
        }

        console.error((0, _jsutilsStrip2['default'])(_templateObject5, _chalk2['default'].bgRed('Error'), permissionsFile));
        return context$1$0.abrupt('return', false);

      case 37:
        progress.tick(1);

        missingPermissions = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
          return type.kind === 'type' && type.implementsNode || type.kind === 'mutation';
        }).reduce(function (acc, type) {
          if (typeof permissions[type.name] !== 'function') {
            progress.tick(1);
            return acc.concat({
              name: type.name,
              kind: type.kind
            });
          }

          progress.tick(1);
          return acc;
        }, []);

        if (missingPermissions.length) {
          console.log((0, _jsutilsStrip2['default'])(_templateObject6, _chalk2['default'].bgYellow('Warning'), permissionsFile, missingPermissions.map(function (p, i) {
            return '   ' + (i + 1) + '. ' + p.name + ' ' + p.kind;
          }).join('\n')));
        }

        return context$1$0.abrupt('return', true);

      case 41:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 15], [26, 30]]);
}