'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Filter on ', ' defines "', '" key multiple times.\n                    ~ Filter condition keys must be unique. ', ''], ['Filter on ', ' defines "', '" key multiple times.\n                    ~ Filter condition keys must be unique. ', '']);

var _utils = require('../../utils');

var KeysMustBeUnique = function KeysMustBeUnique(_ref) {
  var filter = _ref.filter;

  if (!filter) {
    throw Error('context not passed to rule.');
  }
  var name = filter.name;
  var conditions = filter.conditions;
  var loc = filter.loc;

  var target = name.replace('Filter#', '');

  var count = conditions.reduce(function (acc, condition) {
    return _extends({}, acc, _defineProperty({}, condition.key, (acc[condition.key] || 0) + 1));
  }, {});

  return _Object$keys(count).filter(function (key) {
    return count[key] > 1;
  }).map(function (key) {
    return (0, _utils.error)(_templateObject, target, key, loc);
  });
};
exports.KeysMustBeUnique = KeysMustBeUnique;