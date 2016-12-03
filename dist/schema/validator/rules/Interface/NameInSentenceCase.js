'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Interface name "', '" should be in "SentenceCase".', ''], ['Interface name "', '" should be in "SentenceCase".', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var NameInSentenceCase = function NameInSentenceCase(_ref) {
  var inter = _ref['interface'];

  if (!inter) {
    throw Error('context not passed to rule.');
  }
  var name = inter.name;
  var loc = inter.loc;

  if (name !== (0, _jsutilsCasing.sentenceCase)(name)) {
    return (0, _utils.warning)(_templateObject, name, loc);
  }
};
exports.NameInSentenceCase = NameInSentenceCase;