
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.offsetToCursor = offsetToCursor;
exports.cursorToOffset = cursorToOffset;
exports.getOffsetWithDefault = getOffsetWithDefault;

var _jsutilsBase64 = require('../../../jsutils/base64');

var PREFIX = 'connection:';

/**
 * Creates the cursor string from an offset.
 */

function offsetToCursor(offset) {
  return (0, _jsutilsBase64.base64)(PREFIX + offset);
}

/**
 * Rederives the offset from the cursor string.
 */

function cursorToOffset(cursor) {
  return parseInt((0, _jsutilsBase64.unbase64)(cursor).substring(PREFIX.length), 10);
}

/**
 * Given an optional cursor and a default offset, returns the offset
 * to use; if the cursor contains a valid offset, that will be used,
 * otherwise it will be the default.
 */

function getOffsetWithDefault(cursor, length, defaultOffset) {
  if (!cursor) {
    return defaultOffset;
  }
  var offset = cursorToOffset(cursor);
  return isNaN(offset) || offset < 0 || offset >= length ? defaultOffset : offset;
}