'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.throwOnErrors = throwOnErrors;

var _templateObject = _taggedTemplateLiteral(['Hook "', '" failed:\n             |', ''], ['Hook "', '" failed:\n             |', '']),
    _templateObject2 = _taggedTemplateLiteral(['Permission function "', '" failed:\n             |', ''], ['Permission function "', '" failed:\n             |', '']),
    _templateObject3 = _taggedTemplateLiteral(['Mutation "', '" with id "', '" failed:\n             |', ''], ['Mutation "', '" with id "', '" failed:\n             |', '']);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _graphqlError = require('graphql/error');

function throwOnErrors(_ref) {
  var context = _ref.context;
  var results = _ref.results;
  var _context$mutation = context.mutation;
  var name = _context$mutation.name;
  var clientMutationId = _context$mutation.clientMutationId;
  var isHook = _context$mutation.isHook;
  var isPermission = _context$mutation.isPermission;

  if (results && results.length) {
    throw new _graphqlError.GraphQLError(isHook ? (0, _jsutilsStrip2['default'])(_templateObject, name, results.map(function (r, ix) {
      return ix + 1 + '. ' + r;
    }).join('\n')) : isPermission ? (0, _jsutilsStrip2['default'])(_templateObject2, name, results.map(function (r, ix) {
      return ix + 1 + '. ' + r;
    }).join('\n')) : (0, _jsutilsStrip2['default'])(_templateObject3, name, clientMutationId, results.map(function (r, ix) {
      return ix + 1 + '. ' + r;
    }).join('\n')));
  }
}