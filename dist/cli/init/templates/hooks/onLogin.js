"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var onLogin = "/* eslint no-unused-vars: 0 */\n\n/**\n * Hook is executed when a user successfully authenticates either using an OAuth\n * provider or password.  This is an opportunity to prevent a login if\n * user account is locked out or reset counter of unsuccessful login attempts.\n * @param {object} obj with viewerId, provider, providerId, profile and\n *                     accessToken properties\n * @returns {boolean | string} true if user is okay to login and string with\n *                             explanation if login should be rejected.\n */\nexport async function onLogin({\n  viewerId,      // id of the viewer node (e.g. User node id)\n  provider,      // one of 'facebook', 'google', 'github' or 'password'\n  providerId,    // with OAuth: unique id assigned by the OAuth provider\n                 // with password: email or phone number\n  profile,       // with OAuth only: object with profile information\n  accessToken,   // with OAuth only: access token string\n}) {\n  return true;  // ok to proceed with the login\n}\n";
exports.onLogin = onLogin;