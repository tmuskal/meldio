'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Union name "', '" should be in "SentenceCase".', ''], ['Union name "', '" should be in "SentenceCase".', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var NameInSentenceCase = function NameInSentenceCase(_ref) {
  var union = _ref.union;

  if (!union) {
    throw Error('context not passed to rule.');
  }
  var name = union.name;
  var loc = union.loc;

  if (name !== (0, _jsutilsCasing.sentenceCase)(name)) {
    return (0, _utils.warning)(_templateObject, name, loc);
  }
};
exports.NameInSentenceCase = NameInSentenceCase;