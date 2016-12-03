'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.analyzeSchema = analyzeSchema;

var _templateObject = _taggedTemplateLiteral(['\n      |\n      | ', ' in ', ': ', ' ', '\n      |\n      |', '\n      |\n      |'], ['\n      |\n      | ', ' in ', ': ', ' ', '\n      |\n      |', '\n      |\n      |']),
    _templateObject2 = _taggedTemplateLiteral(['Authentication is enabled, but schema does not define\n                       ~ root viewer field. Add @rootViewer(field: "viewer")\n                       ~ directive to the type that represents application\n                       ~ user.'], ['Authentication is enabled, but schema does not define\n                       ~ root viewer field. Add @rootViewer(field: "viewer")\n                       ~ directive to the type that represents application\n                       ~ user.']),
    _templateObject3 = _taggedTemplateLiteral(['\n          | ', ' in ', ':\n            ~ ', ' ', '\n          |\n          |', '\n          |\n          |'], ['\n          | ', ' in ', ':\n            ~ ', ' ', '\n          |\n          |', '\n          |\n          |']);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _babelCodeFrame = require('babel-code-frame');

var _babelCodeFrame2 = _interopRequireDefault(_babelCodeFrame);

var _path = require('path');

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _schema = require('../../schema');

var _schemaAnalyzer = require('../../schema/analyzer');

var _common = require('../common');

function analyzeSchema(schemaFile, options, config) {
  var buildDirectory, enabledAuth, rootDirectory, warnings, dryRun, progress, schemaPath, schemaText, ast, opts, loc, frame, schema, results, viewerTypeName, hasValidationErrors, transformedAST, schemaOut;
  return _regeneratorRuntime.async(function analyzeSchema$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        buildDirectory = config.build;
        enabledAuth = config.enabledAuth;
        rootDirectory = config.root || '';
        warnings = Boolean(options.warnings);
        dryRun = Boolean(options.dryRun);
        progress = new _progress2['default'](' analyzing schema [:bar] :percent :etas', {
          width: 20,
          total: 7,
          clear: true
        });

        progress.tick(1);

        schemaPath = (0, _path.resolve)(rootDirectory, schemaFile);
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap((0, _common.readFile)(schemaPath));

      case 10:
        schemaText = context$1$0.sent;

        progress.tick(1);

        ast = null;
        context$1$0.prev = 13;

        ast = (0, _schema.parse)(schemaText);
        context$1$0.next = 24;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](13);
        opts = { highlightCode: false };
        loc = '(' + context$1$0.t0.line + ':' + context$1$0.t0.column + ')';
        frame = (0, _babelCodeFrame2['default'])(schemaText, context$1$0.t0.line, context$1$0.t0.column, opts);

        console.error((0, _jsutilsStrip2['default'])(_templateObject, _chalk2['default'].bgRed(context$1$0.t0.name), schemaFile, context$1$0.t0.description, loc, frame));

        return context$1$0.abrupt('return', null);

      case 24:
        progress.tick(1);
        schema = (0, _schema.analyzeAST)(ast);

        progress.tick(1);
        results = (0, _schema.validate)(schema);

        progress.tick(1);

        // ensure that rootViewer is specified if auth is enabled:
        viewerTypeName = (0, _schemaAnalyzer.rootViewerDirectives)(schema).map(function (directive) {
          return directive.parentTypeName;
        })[0];

        if (enabledAuth.length && !viewerTypeName) {
          results.push({
            kind: 'error',
            description: (0, _jsutilsStrip2['default'])(_templateObject2)
          });
        }

        hasValidationErrors = Boolean(results.filter(function (r) {
          return r.kind === 'error';
        }).length);

        if (hasValidationErrors) {
          context$1$0.next = 44;
          break;
        }

        transformedAST = (0, _schema.transformAST)(ast, schema);

        progress.tick(1);

        if (dryRun) {
          context$1$0.next = 41;
          break;
        }

        schemaOut = (0, _path.resolve)(rootDirectory, buildDirectory, 'schema-debug.graphql');
        context$1$0.next = 39;
        return _regeneratorRuntime.awrap((0, _common.mkdir)(schemaOut));

      case 39:
        context$1$0.next = 41;
        return _regeneratorRuntime.awrap((0, _common.writeFile)(schemaOut, (0, _schema.print)(transformedAST)));

      case 41:
        progress.tick(1);
        context$1$0.next = 45;
        break;

      case 44:
        progress.tick(2);

      case 45:
        if (!results.length) {
          context$1$0.next = 49;
          break;
        }

        results.forEach(function (result) {
          var frame = '';
          var loc = '';
          if (result.loc && result.loc.start) {
            var src = new _schema.Source(schemaText, schemaFile);
            var startPosition = (0, _schema.getLocation)(src, result.loc.start);

            loc = '(' + startPosition.line + ':' + startPosition.column + ')';
            frame = (0, _babelCodeFrame2['default'])(schemaText, startPosition.line, startPosition.column, { highlightCode: false });
          }
          if (result.kind === 'warning' && warnings) {
            console.log((0, _jsutilsStrip2['default'])(_templateObject3, _chalk2['default'].bgYellow('Warning'), schemaFile, result.description, loc, frame));
          }
          if (result.kind === 'error') {
            console.error((0, _jsutilsStrip2['default'])(_templateObject3, _chalk2['default'].bgRed('Error'), schemaFile, result.description, loc, frame));
          }
        });

        if (!hasValidationErrors) {
          context$1$0.next = 49;
          break;
        }

        return context$1$0.abrupt('return', null);

      case 49:
        return context$1$0.abrupt('return', schema);

      case 50:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[13, 17]]);
}