'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['At most one type can have @rootViewer directive.'], ['At most one type can have @rootViewer directive.']);

var _utilsJs = require('../../utils.js');

var OneTypeMayHaveRootViewer = function OneTypeMayHaveRootViewer(_ref) {
  var schema = _ref.schema;

  var typesWithRootViewer = _Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (def) {
    return def.kind === 'type' && def.directives.some(function (d) {
      return d.name === 'rootViewer';
    });
  });

  if (typesWithRootViewer.length > 1) {
    return (0, _utilsJs.error)(_templateObject);
  }
};
exports.OneTypeMayHaveRootViewer = OneTypeMayHaveRootViewer;