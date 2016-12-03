'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ConnectionCountFilter = ConnectionCountFilter;

var _schemaAnalyzer = require('../../../schema/analyzer');

var _jsutilsFlatten2 = require('../../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var hasEdgeFilter = function hasEdgeFilter(filter) {
  return _Object$keys(filter).filter(function (key) {
    return key !== 'node';
  }).length !== 0;
};

function ConnectionCountFilter(context) {
  var schema = context.schema;
  var edge = context.edge;
  var node = context.node;

  var currentObjectId = 0;
  function getObjectId() {
    return 'object' + currentObjectId++;
  }

  var nodeIsScalar = _schemaAnalyzer.SCALAR_TYPES.includes(node) || schema[node] && schema[node].kind === 'enum';

  if (nodeIsScalar) {
    return function (filter) {
      return { $cond: {
          'if': { $and: [].concat(_toConsumableArray(filter.node ? fieldFilter(filter.node, { isScalar: true, name: 'node' }, '') : []), _toConsumableArray(hasEdgeFilter(filter) ? objectFilter(filter, edge, 'edgeProps') : []), [{}]) },
          then: 1,
          'else': 0
        } };
    };
  }

  return function (filter) {
    return { $cond: {
        'if': { $and: [].concat(_toConsumableArray(filter.node ? objectFilter(filter.node, node, 'node') : []), _toConsumableArray(hasEdgeFilter(filter) ? objectFilter(filter, edge, 'edgeProps') : []), [{}]) },
        then: 1,
        'else': 0
      } };
  };

  function objectFilter(filter, typeName, path) {
    // istanbul ignore if
    if (!typeName || !schema[typeName] || !filter) {
      return [];
    }

    var type = schema[typeName];
    var idPath = path ? path + '._id' : '_id';
    var typePath = path ? path + '._type' : '_type';

    var exists = function exists(f) {
      return path && f.exists === true ? [{ $ne: ['$' + path, null] }] : path && f.exists === false ? [{ $eq: ['$' + path, null] }] : [];
    };

    if (type.kind === 'type' && type.implementsNode) {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.id ? scalarFilter(filter.id, idPath) : []), _toConsumableArray(fieldsFilter(_extends({}, filter, { id: undefined }), type.fields, path)));
    } else if (type.kind === 'type') {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(fieldsFilter(filter, type.fields, path)));
    } else if (type.kind === 'union' && type.everyTypeImplementsNode) {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.id ? scalarFilter(filter.id, idPath) : []), _toConsumableArray(filter.type ? typeFilter(filter.type, path) : []));
    } else if (type.kind === 'union') {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.type ? scalarFilter(filter.type, typePath) : []));
    } else if (type.kind === 'interface' && type.everyTypeImplementsNode) {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.id ? scalarFilter(filter.id, idPath) : []), _toConsumableArray(filter.type ? typeFilter(filter.type, path) : []), _toConsumableArray(fieldsFilter(_extends({}, filter, { id: undefined }), type.fields, path)));
    } else if (type.kind === 'interface') {
      return [].concat(_toConsumableArray(exists(filter)), _toConsumableArray(filter.type ? scalarFilter(filter.type, typePath) : []), _toConsumableArray(fieldsFilter(_extends({}, filter, { id: undefined }), type.fields, path)));
    }
    // istanbul ignore next
    return [];
  }

  function fieldsFilter(filter, fields, path) {
    return (0, _jsutilsFlatten22['default'])(fields.filter(function (field) {
      return filter[field.name];
    }).map(function (field) {
      return fieldFilter(filter[field.name], field, path);
    }));
  }

  function fieldFilter(filter, field, path) {
    var name = field.name;
    var type = field.type;
    var isScalar = field.isScalar;
    var isObject = field.isObject;
    var isNode = field.isNode;
    var isScalarList = field.isScalarList;
    var isObjectList = field.isObjectList;
    var isNodeList = field.isNodeList;

    var fieldPath = path ? path + '.' + name : name;

    return isScalar || isNode ? scalarFilter(filter, fieldPath) : isScalarList || isNodeList ? scalarListFilter(filter, fieldPath) : isObject ? objectFilter(filter, type, fieldPath) : isObjectList ? objectListFilter(filter, type, fieldPath) : [];
  }

  function typeFilter(filter, path) {
    var idPath = path ? path + '._id' : '_id';

    if (filter.eq) {
      var encoded = filter.eq.map(function (typeName) {
        return (0, _jsutilsGlobalId.encode)(typeName);
      });
      // istanbul ignore next
      if (encoded.length) {
        return [{ $or: encoded.map(function (type) {
            return { $eq: [{ $substr: ['$' + idPath, 21, -1] }, type] };
          }) }];
      }
      // istanbul ignore next
      return [];
    } else if (filter.ne) {
      var encoded = filter.ne.map(function (typeName) {
        return (0, _jsutilsGlobalId.encode)(typeName);
      });
      // istanbul ignore next
      if (encoded.length) {
        return [{ $and: encoded.map(function (type) {
            return { $ne: [{ $substr: ['$' + idPath, 21, -1] }, type] };
          }) }];
      }
      // istanbul ignore next
      return [];
    }
    // istanbul ignore next
    return [];
  }

  // .concat({ }) is to avoid mongo wrath where $and: [ ] causes an error
  function objectListFilter(filter, type, path) {
    var objectId = '';
    return _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var operator = _ref2[0];
      var filterFragment = _ref2[1];
      return operator === 'exists' && filterFragment ? acc.concat({ $isArray: '$' + path }) : operator === 'exists' && !filterFragment ? acc.concat({ $not: { $isArray: '$' + path } }) : operator === 'length' ? acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: { $eq: [{ $size: '$' + path }, filterFragment] },
          'else': false
        }
      }) : operator === 'empty' ? filterFragment ? acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: { $eq: [{ $size: '$' + path }, 0] },
          'else': false
        }
      }) : acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: { $ne: [{ $size: '$' + path }, 0] },
          'else': false
        }
      }) : operator === 'some' ? (objectId = getObjectId(), acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: {
            $anyElementTrue: [{
              $map: {
                input: '$' + path,
                as: objectId,
                'in': {
                  $and: objectFilter(filterFragment, type, '$' + objectId)
                }
              }
            }]
          },
          'else': false
        }
      })) : operator === 'every' ? (objectId = getObjectId(), acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: {
            $allElementsTrue: [{
              $map: {
                input: '$' + path,
                as: objectId,
                'in': {
                  $and: objectFilter(filterFragment, type, '$' + objectId)
                }
              }
            }]
          },
          'else': true
        }
      })) : operator === 'none' ? (objectId = getObjectId(), acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: {
            $not: {
              $anyElementTrue: [{
                $map: {
                  input: '$' + path,
                  as: objectId,
                  'in': {
                    $and: objectFilter(filterFragment, type, '$' + objectId)
                  }
                }
              }]
            }
          },
          'else': true
        }
      })) : acc;
    }, []);
  }

  function scalarListFilter(filter, path) {
    return _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref3) {
      var _ref32 = _slicedToArray(_ref3, 2);

      var operator = _ref32[0];
      var filterFragment = _ref32[1];
      return operator === 'exists' && filterFragment ? acc.concat({ $isArray: '$' + path }) : operator === 'exists' && !filterFragment ? acc.concat({ $not: { $isArray: '$' + path } }) : operator === 'length' ? acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: { $eq: [{ $size: '$' + path }, filterFragment] },
          'else': false
        }
      }) : operator === 'empty' ? filterFragment ? acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: { $eq: [{ $size: '$' + path }, 0] },
          'else': false
        }
      }) : acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: { $ne: [{ $size: '$' + path }, 0] },
          'else': false
        }
      }) : operator === 'some' ? acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: {
            $anyElementTrue: [{
              $map: {
                input: '$' + path,
                as: 'value',
                'in': { $and: scalarFilter(filterFragment, '$value') }
              }
            }]
          },
          'else': false
        }
      }) : operator === 'every' ? acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: {
            $allElementsTrue: [{
              $map: {
                input: '$' + path,
                as: 'value',
                'in': { $and: scalarFilter(filterFragment, '$value') }
              }
            }]
          },
          'else': true
        }
      }) : operator === 'none' ? acc.concat({
        $cond: {
          'if': { $isArray: '$' + path },
          then: {
            $not: {
              $anyElementTrue: [{
                $map: {
                  input: '$' + path,
                  as: 'value',
                  'in': { $and: scalarFilter(filterFragment, '$value') }
                }
              }]
            }
          },
          'else': true
        }
      }) : acc;
    }, []);
  }

  // isNegated added to avoid Mongo wrath with $not: { $regex } expression
  function scalarFilter(filter, path) {
    return _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref4) {
      var _ref42 = _slicedToArray(_ref4, 2);

      var operator = _ref42[0];
      var value = _ref42[1];
      return operator === 'exists' && value ? acc.concat({ $ne: ['$' + path, null] }) : operator === 'exists' && !value ? acc.concat({ $eq: ['$' + path, null] }) : operator === 'eq' ? acc.concat({ $or: [].concat(value).map(function (v) {
          return { $eq: ['$' + path, v] };
        }) }) : operator === 'ne' ? acc.concat({ $and: [].concat(value).map(function (v) {
          return { $ne: ['$' + path, v] };
        }) }) : operator === 'gt' ? acc.concat({ $gt: ['$' + path, value] }) : operator === 'gte' ? acc.concat({ $gte: ['$' + path, value] }) : operator === 'lt' ? acc.concat({ $lt: ['$' + path, value] }) : operator === 'lte' ? acc.concat({ $lte: ['$' + path, value] }) : operator === 'matches' ? acc.concat({ $eq: ['$' + path, value] }) : acc;
    }, []);
  }
}