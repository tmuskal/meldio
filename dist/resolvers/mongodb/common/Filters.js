'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Filters = Filters;

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _jsutilsGlobalId = require('../../../jsutils/globalId');

function Filters(context) {
  var schema = context.schema;

  function objectFilter(filter, typeName, parentPath) {
    // istanbul ignore if
    if (!typeName || !schema[typeName] || !filter) {
      return [];
    }

    var type = schema[typeName];
    var idPath = parentPath ? parentPath + '._id' : '_id';
    var typePath = parentPath ? parentPath + '._type' : '_type';

    var exists = function exists(f) {
      return parentPath && f.exists === true ? [_defineProperty({}, parentPath, { $ne: null })] : parentPath && f.exists === false ? [_defineProperty({}, parentPath, { $eq: null })] : [];
    };

    if (type.kind === 'type' && type.implementsNode) {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.id ? [_defineProperty({}, idPath, scalarFilter(filter.id))] : []), _toConsumableArray(fieldsFilter(_extends({}, filter, { id: undefined }), type.fields, parentPath)));
    } else if (type.kind === 'type') {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(fieldsFilter(filter, type.fields, parentPath)));
    } else if (type.kind === 'union' && type.everyTypeImplementsNode) {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.id ? [_defineProperty({}, idPath, scalarFilter(filter.id))] : []), _toConsumableArray(filter.type ? typeFilter(filter.type, parentPath) : []));
    } else if (type.kind === 'union') {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.type ? [_defineProperty({}, typePath, scalarFilter(filter.type))] : []));
    } else if (type.kind === 'interface' && type.everyTypeImplementsNode) {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.id ? [_defineProperty({}, idPath, scalarFilter(filter.id))] : []), _toConsumableArray(filter.type ? typeFilter(filter.type, parentPath) : []), _toConsumableArray(fieldsFilter(_extends({}, filter, { id: undefined }), type.fields, parentPath)));
    } else if (type.kind === 'interface') {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.type ? [_defineProperty({}, typePath, scalarFilter(filter.type))] : []), _toConsumableArray(fieldsFilter(filter, type.fields, parentPath)));
    }
    // istanbul ignore next
    return [];
  }

  function fieldsFilter(filter, fields, parentPath) {
    return (0, _jsutilsFlatten22['default'])(fields.filter(function (field) {
      return filter[field.name];
    }).map(function (field) {
      return fieldFilter(filter[field.name], field, parentPath);
    }));
  }

  function fieldFilter(filter, field, parentPath) {
    var name = field.name;
    var type = field.type;
    var isScalar = field.isScalar;
    var isObject = field.isObject;
    var isNode = field.isNode;
    var isScalarList = field.isScalarList;
    var isObjectList = field.isObjectList;
    var isNodeList = field.isNodeList;

    var path = parentPath ? parentPath + '.' + name : name;
    var addPath = function addPath(expression) {
      return _defineProperty({}, path, expression);
    };

    return isScalar || isNode ? [addPath(scalarFilter(filter))] : isScalarList || isNodeList ? scalarListFilter(filter).map(addPath) : isObject ? objectFilter(filter, type, path) : isObjectList ? objectListFilter(filter, type).map(addPath) : [];
  }

  function typeFilter(filter, parentPath) {
    var idPath = parentPath ? parentPath + '._id' : '_id';
    if (typeof filter !== 'object' || Array.isArray(filter)) {
      var encoded = [].concat(filter).map(function (typeName) {
        return (0, _jsutilsGlobalId.encode)(typeName);
      });
      // istanbul ignore else
      if (encoded.length) {
        return [{
          $or: encoded.map(function (type) {
            return _defineProperty({}, idPath, { $regex: '-' + type + '$' });
          })
        }];
      }
      // istanbul ignore next
      return [];
    } else if (filter.eq) {
      var encoded = filter.eq.map(function (typeName) {
        return (0, _jsutilsGlobalId.encode)(typeName);
      });
      // istanbul ignore else
      if (encoded.length) {
        return [{ $or: encoded.map(function (type) {
            return _defineProperty({}, idPath, { $regex: '-' + type + '$' });
          }) }];
      }
      // istanbul ignore next
      return [];
    } else if (filter.ne) {
      var encoded = filter.ne.map(function (typeName) {
        return (0, _jsutilsGlobalId.encode)(typeName);
      });
      // istanbul ignore else
      if (encoded.length) {
        return [{
          $and: encoded.map(function (type) {
            return _defineProperty({}, idPath, { $not: new RegExp('-' + type + '$') });
          })
        }];
      }
      // istanbul ignore next
      return [];
    }
    // istanbul ignore next
    return [];
  }

  // .concat({ }) is to avoid mongo wrath where $and: [ ] causes an error
  function objectListFilter(filter, type) {
    var noPath = '';
    return _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref13) {
      var _ref132 = _slicedToArray(_ref13, 2);

      var operator = _ref132[0];
      var filterFragment = _ref132[1];
      return(
        // FIXME: exists: true will not match array like: [1,2,null] due to
        // mongodb bug / feature
        operator === 'exists' && filterFragment ? acc.concat({ $ne: null }) : operator === 'exists' && !filterFragment ? acc.concat({ $not: { $elemMatch: { $exists: true } } }).concat({ $not: { $size: 0 } }) : operator === 'length' ? acc.concat({ $size: filterFragment }) : operator === 'empty' ? filterFragment ? acc.concat({ $size: 0 }) : acc.concat({ $elemMatch: { $exists: true } }) : operator === 'some' ? acc.concat({
          $elemMatch: {
            $and: objectFilter(filterFragment, type, noPath).concat({})
          } }) : operator === 'every' ? acc.concat({
          $not: {
            $elemMatch: {
              $or: objectFilter(filterFragment, type, noPath).map(function (obj) {
                return _Object$keys(obj).map(function (key) {
                  return _defineProperty({}, key, { $not: obj[key] });
                }).reduce(function (a, e) {
                  return _extends({}, a, e);
                }, {});
              })
            }
          }
        }) : operator === 'none' ? acc.concat({
          $not: {
            $elemMatch: {
              $and: objectFilter(filterFragment, type, noPath).concat({})
            } } }) : acc
      );
    }, []);
  }

  function scalarListFilter(filter) {
    return _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref14) {
      var _ref142 = _slicedToArray(_ref14, 2);

      var operator = _ref142[0];
      var filterFragment = _ref142[1];
      return(
        // FIXME: exists: true will not match array like: [1,2,null] due to
        // mongodb bug / feature
        operator === 'exists' && filterFragment ? acc.concat({ $ne: null }) : operator === 'exists' && !filterFragment ? acc.concat({ $not: { $elemMatch: { $exists: true } } }).concat({ $not: { $size: 0 } }) : operator === 'length' ? acc.concat({ $size: filterFragment }) : operator === 'empty' ? filterFragment ? acc.concat({ $size: 0 }) : acc.concat({ $elemMatch: { $exists: true } }) : operator === 'some' ? acc.concat({ $elemMatch: scalarFilter(filterFragment) }) : operator === 'every' ? acc.concat({ $not: { $elemMatch: { $not: scalarFilter(filterFragment) } } }) : operator === 'none' ? acc.concat({ $not: { $elemMatch: scalarFilter(filterFragment) } }) : acc
      );
    }, []);
  }

  function scalarFilter(filter) {
    return typeof filter === 'object' && !Array.isArray(filter) ? _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref15) {
      var _ref152 = _slicedToArray(_ref15, 2);

      var operator = _ref152[0];
      var value = _ref152[1];
      return operator === 'exists' && value ? _extends({}, acc, { $ne: null }) : operator === 'exists' && !value ? _extends({}, acc, { $eq: null }) : operator === 'eq' ? _extends({}, acc, { $in: [].concat(value) }) : operator === 'ne' ? _extends({}, acc, { $nin: [].concat(value) }) : operator === 'gt' ? _extends({}, acc, { $gt: value }) : operator === 'gte' ? _extends({}, acc, { $gte: value }) : operator === 'lt' ? _extends({}, acc, { $lt: value }) : operator === 'lte' ? _extends({}, acc, { $lte: value }) : operator === 'matches' ? _extends({}, acc, { $not: { $not: new RegExp(value) } }) : acc;
    }, {}) : { $in: [].concat(filter) };
  }

  return {
    objectFilter: objectFilter,
    fieldsFilter: fieldsFilter,
    fieldFilter: fieldFilter,
    typeFilter: typeFilter,
    scalarFilter: scalarFilter
  };
}