'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.pagingBuilder = pagingBuilder;

var _jsutilsIsNullish = require('../../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _commonUtilsConnection = require('../../common/utils/connection');

function pagingBuilder(args, length) {
  var after = args.after;
  var before = args.before;
  var first = args.first;
  var last = args.last;

  if (!(0, _jsutilsIsNullish2['default'])(first)) {
    var _skipOffset = (0, _commonUtilsConnection.getOffsetWithDefault)(after, length, -1) + 1;
    return {
      skipOffset: _skipOffset,
      stages: [{ $skip: _skipOffset }, { $limit: first }]
    };
  } else if (!(0, _jsutilsIsNullish2['default'])(last)) {
    var beforeOffset = (0, _commonUtilsConnection.getOffsetWithDefault)(before, length, length);
    var _skipOffset2 = Math.max(0, beforeOffset - last);
    var limit = beforeOffset - _skipOffset2;
    return {
      skipOffset: _skipOffset2,
      stages: [{ $skip: _skipOffset2 }, { $limit: limit }]
    };
  }
  return {
    skipOffset: 0,
    stages: []
  };
}