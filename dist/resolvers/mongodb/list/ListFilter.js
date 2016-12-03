'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ListFilter = ListFilter;

var _schemaAnalyzer = require('../../../schema/analyzer');

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _jsutilsIsNullish = require('../../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

function ListFilter(_ref) {
  var schema = _ref.schema;
  var typeName = _ref.typeName;

  var isScalarType = _schemaAnalyzer.SCALAR_TYPES.includes(typeName) || schema[typeName] && schema[typeName].kind === 'enum';

  if (isScalarType) {
    return function (filter, list) {
      return list.filter(function (scalar) {
        return scalarFilter(filter, scalar);
      });
    };
  }
  return function (filter, list) {
    return list.filter(function (obj) {
      return objectFilter(filter, typeName, obj);
    });
  };

  function objectFilter(filter, objectTypeName, obj) {
    // istanbul ignore if
    if (!objectTypeName || !schema[objectTypeName] || !filter) {
      return true;
    }
    // istanbul ignore if
    if (!obj) {
      return false;
    }

    var type = schema[objectTypeName];

    if (type.kind === 'type' && type.implementsNode) {
      return (filter.id ? scalarFilter(filter.id, obj._id) : true) && fieldsFilter(_extends({}, filter, { id: undefined }), type.fields, obj);
    } else if (type.kind === 'type') {
      return fieldsFilter(filter, type.fields, obj);
    } else if (type.kind === 'union' && type.everyTypeImplementsNode) {
      return (filter.id ? scalarFilter(filter.id, obj._id) : true) && (filter.type ? nodeTypeFilter(filter.type, obj) : true);
    } else if (type.kind === 'union') {
      return filter.type ? typeFilter(filter.type, obj) : true;
    } else if (type.kind === 'interface' && type.everyTypeImplementsNode) {
      return (filter.id ? scalarFilter(filter.id, obj._id) : true) && (filter.type ? nodeTypeFilter(filter.type, obj) : true) && fieldsFilter(_extends({}, filter, { id: undefined }), type.fields, obj);
    } else if (type.kind === 'interface') {
      return (filter.type ? typeFilter(filter.type, obj) : true) && fieldsFilter(filter, type.fields, obj);
    }
    // istanbul ignore next
    return true;
  }

  function fieldsFilter(filter, fields, obj) {
    return fields.filter(function (field) {
      return filter[field.name];
    }).reduce(function (acc, field) {
      return acc && fieldFilter(filter[field.name], field, obj[field.name]);
    }, true);
  }

  function fieldFilter(filter, field, value) {
    var type = field.type;
    var isScalar = field.isScalar;
    var isObject = field.isObject;
    var isNode = field.isNode;
    var isScalarList = field.isScalarList;
    var isObjectList = field.isObjectList;
    var isNodeList = field.isNodeList;

    return isScalar || isNode ? scalarFilter(filter, value) : isScalarList || isNodeList ? scalarListFilter(filter, value) : isObject ? objectFilter(filter, type, value) : isObjectList ? objectListFilter(filter, type, value) : true;
  }

  function nodeTypeFilter(filter, _ref2) {
    var id = _ref2._id;

    // istanbul ignore if
    if (!id) {
      return false;
    }

    if (filter.eq) {
      var encoded = filter.eq.map(function (tn) {
        return (0, _jsutilsGlobalId.encode)(tn);
      });
      // istanbul ignore else
      if (encoded.length) {
        return encoded.includes(id.substring(21));
      }
    } else if (filter.ne) {
      var encoded = filter.ne.map(function (tn) {
        return (0, _jsutilsGlobalId.encode)(tn);
      });
      // istanbul ignore else
      if (encoded.length) {
        return !encoded.includes(id.substring(21));
      }
    }
    // istanbul ignore next
    return true;
  }

  function typeFilter(filter, _ref3) {
    var type = _ref3._type;

    // istanbul ignore if
    if (!type) {
      return false;
    }

    if (filter.eq && filter.eq.length) {
      return filter.eq.includes(type);
    } else if (filter.ne && filter.ne.length) {
      return !filter.ne.includes(type);
    }
    // istanbul ignore next
    return true;
  }

  function objectListFilter(filter, type, list) {
    return _Object$keys(filter || []).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref4) {
      var _ref42 = _slicedToArray(_ref4, 2);

      var operator = _ref42[0];
      var filterFragment = _ref42[1];
      return acc && (operator === 'length' ? filterFragment === list.length : operator === 'empty' ? filterFragment ? list.length === 0 : list.length !== 0 : operator === 'some' ? list.some(function (element) {
        return objectFilter(filterFragment, type, element);
      }) : operator === 'every' ? !list.some(function (element) {
        return !objectFilter(filterFragment, type, element);
      }) : operator === 'none' ? !list.some(function (element) {
        return objectFilter(filterFragment, type, element);
      }) : true);
    }, true);
  }

  function scalarListFilter(filter, list) {
    return _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref5) {
      var _ref52 = _slicedToArray(_ref5, 2);

      var operator = _ref52[0];
      var filterFragment = _ref52[1];
      return acc && (operator === 'length' ? filterFragment === list.length : operator === 'empty' ? filterFragment ? list.length === 0 : list.length !== 0 : operator === 'some' ? list.some(function (element) {
        return scalarFilter(filterFragment, element);
      }) : operator === 'every' ? !list.some(function (element) {
        return !scalarFilter(filterFragment, element);
      }) : operator === 'none' ? !list.some(function (element) {
        return scalarFilter(filterFragment, element);
      }) : true);
    }, true);
  }

  function scalarFilter(filter, value) {
    return _Object$keys(filter || {}).map(function (operator) {
      return [operator, filter[operator]];
    }).reduce(function (acc, _ref6) {
      var _ref62 = _slicedToArray(_ref6, 2);

      var operator = _ref62[0];
      var operand = _ref62[1];
      return acc && (operator === 'eq' && Array.isArray(operand) && operand.length === 1 ? value === operand[0] : operator === 'eq' && Array.isArray(operand) ? operand.includes(value) : operator === 'eq' ? value === operand : operator === 'ne' && Array.isArray(operand) && operand.length === 1 ? value !== operand[0] : operator === 'ne' && Array.isArray(operand) ? !operand.includes(value) : operator === 'ne' ? value !== operand : operator === 'gt' ? value > operand : operator === 'gte' ? value >= operand : operator === 'lt' ? value < operand : operator === 'lte' ? value <= operand : operator === 'exists' ? operand ? !(0, _jsutilsIsNullish2['default'])(value) : (0, _jsutilsIsNullish2['default'])(value) : operator === 'matches' ? Boolean(value.match(new RegExp(operand))) : true);
    }, true);
  }
}