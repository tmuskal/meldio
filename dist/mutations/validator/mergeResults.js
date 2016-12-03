"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeResults = mergeResults;

function mergeResults() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length) {
    return {
      context: args[0].context,
      results: args.map(function (a) {
        return a.results || [];
      }).reduce(function (acc, r) {
        return acc.concat(r);
      }, [])
    };
  }
  return {
    context: null,
    results: []
  };
}