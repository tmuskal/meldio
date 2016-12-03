'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ResolveType = ResolveType;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

function ResolveType(_ref) {
  var typeMap = _ref.typeMap;

  return function (obj) {
    if (obj._type) {
      return typeMap[obj._type];
    } else if (obj._id) {
      return typeMap[(0, _jsutilsGlobalId.typeFromGlobalId)(obj._id)];
    } else if (obj.id) {
      return typeMap[(0, _jsutilsGlobalId.typeFromGlobalId)(obj.id)];
    }
    return null;
  };
}