'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Input object name "', '" should be in\n                 ~ "SentenceCase". ', ''], ['Input object name "', '" should be in\n                 ~ "SentenceCase". ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var NameInSentenceCase = function NameInSentenceCase(_ref) {
  var input = _ref.input;

  if (!input) {
    throw Error('context not passed to rule.');
  }
  var name = input.name;
  var loc = input.loc;

  if (name !== (0, _jsutilsCasing.sentenceCase)(name)) {
    return (0, _utils.warning)(_templateObject, name, loc);
  }
};
exports.NameInSentenceCase = NameInSentenceCase;