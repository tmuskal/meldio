'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Union "', '" member types must either all implement Node\n               | interface or none can implement Node interface.\n               | You cannot mix the two together. ', ''], ['Union "', '" member types must either all implement Node\n               | interface or none can implement Node interface.\n               | You cannot mix the two together. ', '']);

var _utils = require('../../utils');

var NoMixedUnions = function NoMixedUnions(_ref) {
  var union = _ref.union;

  if (!union) {
    throw Error('context not passed to rule.');
  }
  var name = union.name;
  var loc = union.loc;
  var everyTypeImplementsNode = union.everyTypeImplementsNode;
  var noTypeImplementsNode = union.noTypeImplementsNode;

  if (!everyTypeImplementsNode && !noTypeImplementsNode) {
    return (0, _utils.error)(_templateObject, name, loc);
  }
};
exports.NoMixedUnions = NoMixedUnions;