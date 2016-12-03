'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.enableDestroy = enableDestroy;

function enableDestroy(server) {
  var sockets = {};
  var nextSocketId = 0;

  server.on('connection', function (socket) {
    var socketId = nextSocketId++;
    sockets[socketId] = socket;
    socket.on('close', function () {
      delete sockets[socketId];
    });
  });

  server.destroy = function (callback) {
    var destroy = function destroy(resolve, reject) {
      _Object$keys(sockets).forEach(function (id) {
        return sockets[id].destroy();
      });
      sockets = {};
      nextSocketId = 0;
      server.close(function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    };

    if (callback) {
      destroy(callback, callback);
    } else {
      return new _Promise(destroy);
    }
  };
}