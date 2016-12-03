"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDField = IDField;

function IDField() {
  return function (parent) {
    return parent._id || parent.id;
  };
}