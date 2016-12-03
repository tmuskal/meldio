#!/usr/bin/env node


/* eslint spaced-comment: 0 */

'use strict';

// Babel polyfill can be included only once and babel-node already includes
// polyfill by default, so the require above throws when this code is executed
// through babel-node

var _cli = require('./cli');

try {
  require('babel/polyfill');
} catch (e) {}

(0, _cli.cli)(process.argv, process.env);