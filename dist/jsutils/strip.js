'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = strip;

function strip(template) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  var margin = /^[ \t\v]*\|/gm;
  var marginCont = /\n[ \t\v]*~/gm;

  return template[0].replace(margin, '').replace(marginCont, '').concat(template.slice(1).map(function (ts, index) {
    return String(values[index]).concat(ts.replace(margin, '').replace(marginCont, ''));
  }).join(''));
}

module.exports = exports['default'];