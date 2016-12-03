"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var newOAuthProvider = "/* eslint no-unused-vars: 0 */\n\n/**\n * Hook is executed when user is authenticated through OAuth 2.0 flow\n * with one of the supported OAuth providers for the first time. This is\n * an opportunity to look up if a User record exists and if not, add an\n * appropriate node. The implementation below assumes the following shape\n * of User record:\n *\n *     type User implements Node @rootViewer(field: \"viewer\") {\n *       id: ID!\n *       firstName: String\n *       lastName: String\n *       emails: [String]!\n *       profilePictureUrl: String\n *       # other fields...\n *    }\n *\n * @param {object} obj with provider, profile, and accessToken properties\n * @returns {string} id of the existing or newly created User node (viewerId).\n */\nexport async function newOAuthProvider({\n  provider,     // one of 'facebook', 'google' or 'github'\n  profile,      // object with profile information returned by the provider\n  accessToken   // access token string returned by the provider\n}) {\n  const { User } = this.model;\n\n  const emails = provider === 'github' ?\n    profile.emails\n      .filter(email => email.verified)\n      .map(email => email.email) :\n    [ profile.email ];\n\n  const users = await User\n    .filter({ emails: { some: { eq: emails } }})\n    .list();\n\n  if (!users.length) {\n    const userInfo = ({\n      facebook: p => ({\n        firstName: p.first_name,\n        lastName: p.last_name,\n        emails,\n        profilePictureUrl: p.picture && p.picture.data && p.picture.data.url ?\n          p.picture.data.url :\n          null,\n      }),\n      google: p => ({\n        firstName: p.given_name,\n        lastName: p.family_name,\n        emails,\n        profilePictureUrl: p.picture,\n      }),\n      github: p => ({\n        firstName: p.name.split(' ')[0] || '',\n        lastName: p.name.split(' ')[1] || '',\n        emails,\n        profilePictureUrl: p.avatar_url,\n      }),\n    }[provider])( profile );\n\n    const user = await User.addNode(userInfo);\n    return user.id;\n  }\n\n  return users[0].id;\n}\n\n";
exports.newOAuthProvider = newOAuthProvider;