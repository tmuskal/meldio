'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkMutations = checkMutations;

var _templateObject = _taggedTemplateLiteral(['\n      | ', ' Mutations are defined in ', ', but\n        ~ implementations are missing:\n      |\n      |', '\n      |\n      |'], ['\n      | ', ' Mutations are defined in ', ', but\n        ~ implementations are missing:\n      |\n      |', '\n      |\n      |']);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _jsutilsValues = require('../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _path = require('path');

function checkMutations(schema, options, config) {
  var buildDirectory, mutationsDirectory, schemaFile, rootDirectory, numberOfMutations, progress, missingMutations;
  return _regeneratorRuntime.async(function checkMutations$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        buildDirectory = config.build;
        mutationsDirectory = config.mutations;
        schemaFile = config.schema;
        rootDirectory = config.root || '';
        numberOfMutations = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
          return type.kind === 'mutation';
        }).length;
        progress = new _progress2['default'](' checking mutations [:bar] :percent :etas', {
          width: 20,
          total: numberOfMutations + 1,
          clear: true
        });

        progress.tick(1);

        missingMutations = (0, _jsutilsValues2['default'])(schema).filter(function (type) {
          return type.kind === 'mutation';
        }).map(function (mutation) {
          return mutation.name;
        }).reduce(function (acc, mutation) {
          var file = (0, _path.join)(rootDirectory, buildDirectory, mutationsDirectory, mutation + '.js');
          var filePath = (0, _path.resolve)(file);

          var thisModule = null;
          try {
            delete require.cache[require.resolve(filePath)];
            thisModule = require(filePath);
          } catch (e) {
            progress.tick(1);
            return acc.concat({
              mutation: mutation,
              reason: 'File "' + file + '" not found.'
            });
          }

          if (typeof thisModule[mutation] !== 'function') {
            progress.tick(1);
            return acc.concat({
              mutation: mutation,
              reason: 'File "' + file + '" does not export ' + mutation + ' function.'
            });
          }

          progress.tick(1);
          return acc;
        }, []);

        if (!missingMutations.length) {
          context$1$0.next = 11;
          break;
        }

        console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed('Error'), schemaFile, missingMutations.map(function (m, i) {
          return ' ' + (i + 1) + '. ' + m.mutation + ': ' + m.reason;
        }).join('\n')));

        return context$1$0.abrupt('return', false);

      case 11:
        return context$1$0.abrupt('return', true);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}