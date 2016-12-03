"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var onInvalidPassword = "/* eslint no-unused-vars: 0 */\n\n/**\n * Hook is executed when a user attempts to login with an invalid password.\n * This is an opportunity to increment counter of unsuccessful attempts and\n * potentially lock out the account and notify the user if there has been too\n * many attempts.\n * @param {object} obj with viewerId and providerId properties\n * @returns {boolean | string} true if user should be given the standard invalid\n *                             password prompt and string if a special notice\n *                             should be returned (e.g. lockout notice)\n */\nexport async function onInvalidPassword({\n  viewerId,     // id of the viewer node (e.g. User node id)\n  providerId,   // unique login id (e.g. email or phone number)\n}) {\n  return true;  // standard notice is okay\n}\n";
exports.onInvalidPassword = onInvalidPassword;