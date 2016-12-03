"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeWith = closeWith;

function closeWith(res, data) {
  res.send("\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>Login</title>\n      </head>\n      <body>\n        <script src=\"/static/winchan.js\"></script>\n        <script>\n          WinChan.onOpen(function(origin, args, cb) {\n            cb(" + JSON.stringify(data) + ");\n          });\n        </script>\n      </body>\n    </html>\n  ");
  res.end();
}