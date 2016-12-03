'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Updates = Updates;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _Filters2 = require('./Filters');

function Updates(context) {
  var schema = context.schema;

  var _Filters = (0, _Filters2.Filters)({ schema: schema });

  var objectFilter = _Filters.objectFilter;
  var scalarFilter = _Filters.scalarFilter;

  function merge(updates) {
    return updates.reduce(function (acc, update) {
      var result = _extends({}, acc);
      _Object$keys(update).forEach(function (operation) {
        result[operation] = _extends({}, result[operation] || {}, update[operation]);
      });
      return result;
    }, {});
  }

  function updateNode(update, typeName, parentPath) {
    // istanbul ignore if
    if (!typeName || !schema[typeName] || !update) {
      return {};
    }
    var type = schema[typeName];
    var updates = type.fields.filter(function (field) {
      return field.name !== 'id' && !(0, _jsutilsIsNullish2['default'])(update[field.name]);
    }).map(function (field) {
      return updateField(update[field.name], field, parentPath);
    });
    return merge(updates);
  }

  function updateObject(update, typeName, parentPath) {
    // istanbul ignore if
    if (!typeName || !schema[typeName] || !update) {
      return {};
    }

    var type = schema[typeName];
    (0, _jsutilsInvariant2['default'])(type.kind === 'type' || type.kind === 'union' || type.kind === 'interface', 'Object must be type, union or interface.');

    var fields = type.kind === 'type' ? type.fields : ((0, _jsutilsInvariant2['default'])(update._type && schema[update._type] && schema[update._type].kind === 'type', 'Update expression must have _type field with actual type.'), schema[update._type].fields);

    var updates = fields.filter(function (field) {
      return !(0, _jsutilsIsNullish2['default'])(update[field.name]);
    }).map(function (field) {
      return updateField(update[field.name], field, parentPath);
    });

    var typePath = parentPath ? parentPath + '._type' : '_type';
    var updateType = update._type ? [{ $set: _defineProperty({}, typePath, update._type) }] : [];

    return merge(updates.concat(updateType));
  }

  function updateField(update, field, parentPath) {
    var name = field.name;
    var type = field.type;
    var isScalar = field.isScalar;
    var isNumeric = field.isNumeric;
    var isObject = field.isObject;
    var isNode = field.isNode;
    var isScalarList = field.isScalarList;
    var isObjectList = field.isObjectList;
    var isNodeList = field.isNodeList;

    var path = parentPath ? parentPath + '.' + name : name;

    return isScalar && !isNumeric ? updateScalar(update, type, path) : isNumeric ? updateNumeric(update, type, path) : isNode ? updateScalar(update, 'ID', path) : isObject ? updateObject(update, type, path) : isScalarList ? updateScalarList(update, type, path) : isNodeList ? updateScalarList(update, 'ID', path) : isObjectList ? updateObjectList(update, type, path) : [];
  }

  function updateScalar(update, typeName, path) {
    return !(0, _jsutilsIsNullish2['default'])(update.clear) ? { $unset: _defineProperty({}, path, '') } : { $set: _defineProperty({}, path, update) };
  }

  function updateNumeric(update, typeName, path) {
    return !(0, _jsutilsIsNullish2['default'])(update.clear) ? { $unset: _defineProperty({}, path, '') } : !(0, _jsutilsIsNullish2['default'])(update.add) ? { $inc: _defineProperty({}, path, update.add) } : !(0, _jsutilsIsNullish2['default'])(update.sub) ? { $inc: _defineProperty({}, path, -update.sub) } : !(0, _jsutilsIsNullish2['default'])(update.mul) ? { $mul: _defineProperty({}, path, update.mul) } : update.div ? { $mul: _defineProperty({}, path, 1.0 / update.div) } : !(0, _jsutilsIsNullish2['default'])(update.min) ? { $min: _defineProperty({}, path, update.min) } : !(0, _jsutilsIsNullish2['default'])(update.max) ? { $max: _defineProperty({}, path, update.max) } : { $set: _defineProperty({}, path, update) };
  }

  var mixinKeep = function mixinKeep(update) {
    return _extends({}, !(0, _jsutilsIsNullish2['default'])(update.keepFirst) ? { $slice: update.keepFirst } : {}, !(0, _jsutilsIsNullish2['default'])(update.keepLast) ? { $slice: -update.keepLast } : {});
  };

  function updateScalarList(update, typeName, path) {
    return Array.isArray(update) ? { $set: _defineProperty({}, path, update) } : !(0, _jsutilsIsNullish2['default'])(update.clear) ? { $unset: _defineProperty({}, path, '') } : update.insert !== undefined ? // allows for insert: null
    !(0, _jsutilsIsNullish2['default'])(update.at) ? {
      $push: _defineProperty({}, path, _extends({
        $each: [].concat(update.insert),
        $position: update.at
      }, mixinKeep(update)))
    } : update.ascending || update.descending ? {
      $push: _defineProperty({}, path, _extends({
        $each: [].concat(update.insert),
        $sort: update.ascending ? 1 : -1
      }, mixinKeep(update)))
    } :
    // default insert to the tail of the list:
    {
      $push: _defineProperty({}, path, _extends({
        $each: [].concat(update.insert)
      }, mixinKeep(update)))
    } : update['delete'] !== undefined ? // allows for delete: null
    typeof update['delete'] === 'object' && !Array.isArray(update['delete']) && update['delete'] !== null ? { $pull: _defineProperty({}, path, scalarFilter(update['delete'])) } : { $pull: _defineProperty({}, path, { $in: [].concat(update['delete']) }) } : !(0, _jsutilsIsNullish2['default'])(update.pop) ? update.pop.toLowerCase() === 'first' ? { $pop: _defineProperty({}, path, -1) } : update.pop.toLowerCase() === 'last' ? { $pop: _defineProperty({}, path, 1) } : {} : {};
  }

  function updateObjectList(update, typeName, path) {
    return Array.isArray(update) ? { $set: _defineProperty({}, path, update) } : !(0, _jsutilsIsNullish2['default'])(update.clear) ? { $unset: _defineProperty({}, path, '') } : update.insert !== undefined ? // allows for insert: null
    !(0, _jsutilsIsNullish2['default'])(update.at) ? {
      $push: _defineProperty({}, path, _extends({
        $each: [].concat(update.insert),
        $position: update.at
      }, mixinKeep(update)))
    } : update.ascending || update.descending ? {
      $push: _defineProperty({}, path, _extends({
        $each: [].concat(update.insert),
        $sort: update.ascending ? _defineProperty({}, update.ascending, 1) : _defineProperty({}, update.descending, -1)
      }, mixinKeep(update)))
    } :
    // default insert to the tail of the list:
    {
      $push: _defineProperty({}, path, _extends({
        $each: [].concat(update.insert)
      }, mixinKeep(update)))
    } : update['delete'] !== undefined ? // allows for delete: null
    typeof update['delete'] === 'object' && !Array.isArray(update['delete']) && update['delete'] !== null ? { $pull: _defineProperty({}, path, { $and: objectFilter(update['delete'], typeName, '') }) } : { $pull: _defineProperty({}, path, { $in: [].concat(update['delete']) }) } : !(0, _jsutilsIsNullish2['default'])(update.pop) ? update.pop.toLowerCase() === 'first' ? { $pop: _defineProperty({}, path, -1) } : update.pop.toLowerCase() === 'last' ? { $pop: _defineProperty({}, path, 1) } : {} : {};
  }

  return {
    updateNode: updateNode,
    updateObject: updateObject,
    merge: merge
  };
}