'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' refereces type "', '" that is not\n               ~ scalar. ', ''], ['Filter on ', ' refereces type "', '" that is not\n               ~ scalar. ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Filter on ', ' refereces "', '" which is invalid for\n               ~ ObjectConnection. ', ''], ['Filter on ', ' refereces "', '" which is invalid for\n               ~ ObjectConnection. ', '']),
    _templateObject3 = _taggedTemplateLiteral(['Filter on ', ' refereces "', '" which is invalid for\n               ~ NodeConnection. ', ''], ['Filter on ', ' refereces "', '" which is invalid for\n               ~ NodeConnection. ', '']);

var _analyzer = require('../../../analyzer');

var _utils = require('../../utils');

var ConnectionKindIsValid = function ConnectionKindIsValid(_ref) {
  var filter = _ref.filter;
  var schema = _ref.schema;

  if (!filter) {
    throw Error('context not passed to rule.');
  }
  var name = filter.name;
  var loc = filter.loc;
  var type = filter.type;
  var isScalarConnection = filter.isScalarConnection;
  var isObjectConnection = filter.isObjectConnection;
  var isNodeConnection = filter.isNodeConnection;

  var target = name.replace('Filter#', '');

  var related = schema[type];

  if (isScalarConnection && !_analyzer.SCALAR_TYPES.includes(type) && (!related || related.kind !== 'enum')) {
    return (0, _utils.error)(_templateObject, target, type, loc);
  }

  if (!related) {
    return;
  } // will be caught by TypeMustBeDefined rule

  if (isObjectConnection && (related.kind !== 'type' || related.implementsNode) && (related.kind !== 'interface' || related.everyTypeImplementsNode) && (related.kind !== 'union' || related.everyTypeImplementsNode)) {
    return (0, _utils.error)(_templateObject2, target, type, loc);
  }

  if (isNodeConnection && (related.kind !== 'type' || !related.implementsNode) && (related.kind !== 'interface' || !related.everyTypeImplementsNode) && (related.kind !== 'union' || !related.everyTypeImplementsNode)) {
    return (0, _utils.error)(_templateObject3, target, type, loc);
  }
};
exports.ConnectionKindIsValid = ConnectionKindIsValid;