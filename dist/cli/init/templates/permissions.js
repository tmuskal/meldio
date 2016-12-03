"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var permissions = "\nexport function permissions() {\n  return {\n    // Node permissions return 'Nodes' instance that specifies which nodes\n    // are accessible to the current viewer\n\n    async User() {\n      const { User } = this.model;\n      const viewer = this.viewer;\n\n      // users can only view their own profile\n      if (viewer) {\n        return User.filter({ id: { eq: viewer.id } });\n      }\n    },\n\n    // mutation permissions return true if viewer is allowed to execute mutation\n  };\n}\n";
exports.permissions = permissions;