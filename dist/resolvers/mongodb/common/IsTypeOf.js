'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.IsTypeOf = IsTypeOf;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

function IsTypeOf(_ref) {
  var name = _ref.name;

  return function (obj) {
    if (obj._type) {
      return obj._type === name;
    } else if (obj._id) {
      return (0, _jsutilsGlobalId.typeFromGlobalId)(obj._id) === name;
    } else if (obj.id) {
      return (0, _jsutilsGlobalId.typeFromGlobalId)(obj.id) === name;
    }
    return false;
  };
}