'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.logo = logo;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ansi256Colors = require('ansi-256-colors');

var _ansi256Colors2 = _interopRequireDefault(_ansi256Colors);

var _packageJson = require('../../../package.json');

function logo(line, rainbow) {
  var add = !line || line.length !== 6 ? ['', '', '', '', '', ''] : line;
  var ver = _packageJson.version || '';

  if (rainbow) {
    var red = function red(str) {
      return '' + _ansi256Colors2['default'].fg.codes[196] + str + _ansi256Colors2['default'].reset;
    };
    var ora = function ora(str) {
      return '' + _ansi256Colors2['default'].fg.codes[208] + str + _ansi256Colors2['default'].reset;
    };
    var yel = function yel(str) {
      return '' + _ansi256Colors2['default'].fg.codes[11] + str + _ansi256Colors2['default'].reset;
    };
    var gre = function gre(str) {
      return '' + _ansi256Colors2['default'].fg.codes[46] + str + _ansi256Colors2['default'].reset;
    };
    var blu = function blu(str) {
      return '' + _ansi256Colors2['default'].fg.codes[12] + str + _ansi256Colors2['default'].reset;
    };
    var pur = function pur(str) {
      return '' + _ansi256Colors2['default'].fg.codes[54] + str + _ansi256Colors2['default'].reset;
    };

    console.log();
    console.log(red('  __  __ ______ _      _____ _____ ____  '), add[0]);
    console.log(ora(' |  \\/  |  ____| |    |  __ \\_   _/ __ \\ '), add[1]);
    console.log(yel(' | \\  / | |__  | |    | |  | || || |  | |'), add[2]);
    console.log(gre(' | |\\/| |  __| | |    | |  | || || |  | |'), add[3]);
    console.log(blu(' | |  | | |____| |____| |__| || || |__| |'), add[4]);
    console.log(pur(' |_|  |_|______|______|_____/_____\\____/' + ver), add[5]);
    console.log();
  } else {
    var color = _chalk2['default'].cyan;
    console.log();
    console.log(color('  __  __ ______ _      _____ _____ ____  '), add[0]);
    console.log(color(' |  \\/  |  ____| |    |  __ \\_   _/ __ \\ '), add[1]);
    console.log(color(' | \\  / | |__  | |    | |  | || || |  | |'), add[2]);
    console.log(color(' | |\\/| |  __| | |    | |  | || || |  | |'), add[3]);
    console.log(color(' | |  | | |____| |____| |__| || || |__| |'), add[4]);
    console.log(color(' |_|  |_|______|______|_____/_____\\____/' + ver), add[5]);
    console.log();
  }
}