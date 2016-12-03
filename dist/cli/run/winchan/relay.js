"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relay = relay;

function relay(req, res) {
  res.send("\n    <!DOCTYPE html>\n    <html>\n      <script>\n        function doPost(msg, origin) {\n          window.parent.postMessage(msg, origin);\n        }\n      </script>\n    </html>\n  ");
  res.end();
}