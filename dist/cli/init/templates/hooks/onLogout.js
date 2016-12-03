"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var onLogout = "/* eslint no-unused-vars: 0 */\n\n/**\n * Hook is executed when a user attempts to logout of the application.\n * This is an opportunity to do any required housekeeping (e.g. set last seen\n * timestamp). However, logout should seldom be rejected.\n * @param {object} obj with viewerId property\n * @returns {boolean | string} true if user is okay to logout and string with\n *                             explanation if logout should be stopped.\n */\nexport async function onLogout({\n  viewerId,      // id of the viewer node (e.g. User node id)\n}) {\n  return true;  // ok to proceed with the logout\n}\n";
exports.onLogout = onLogout;