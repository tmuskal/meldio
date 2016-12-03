'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getConnectionName = getConnectionName;
exports.getEdgeName = getEdgeName;
exports.declaredLists = declaredLists;
exports.declaredConnections = declaredConnections;
exports.rootConnectionDirectives = rootConnectionDirectives;
exports.directiveConnections = directiveConnections;
exports.allConnections = allConnections;
exports.rootPluralIdDirectives = rootPluralIdDirectives;
exports.implicitRootPluralIdTypes = implicitRootPluralIdTypes;
exports.rootViewerDirectives = rootViewerDirectives;
exports.extractVariablesFromObjectValues = extractVariablesFromObjectValues;

var _jsutilsKeyMap = require('../../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _language = require('../language');

function getConnectionName(type, edgeType) {
  return '' + type + (edgeType || '') + 'Connection';
}

function getEdgeName(type, edgeType) {
  return '' + type + (edgeType || '') + 'Edge';
}

function declaredLists(schema) {
  var _ref;

  var lists = (_ref = []).concat.apply(_ref, _toConsumableArray(_Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (value) {
    return value.kind === 'type' || value.kind === 'interface' || value.kind === 'mutation';
  }).map(function (target) {
    return (target.fields || []). // flowism
    filter(function (field) {
      return field.isScalarList || field.isObjectList || field.isNodeList;
    }).map(function (field) {
      return {
        kind: field.isScalarList ? 'ScalarList' : field.isObjectList ? 'ObjectList' : 'NodeList', // field.isNodeList
        type: field.type
      };
    });
  })));

  var map = (0, _jsutilsKeyMap2['default'])(lists, function (l) {
    return l.type;
  });
  var uniqueLists = _Object$keys(map).map(function (key) {
    return map[key];
  });
  return uniqueLists;
}

function uniqueConnections(connections) {
  var map = (0, _jsutilsKeyMap2['default'])(connections, function (conn) {
    return conn.name + '#' + conn.type + '#' + (conn.edgeType || '');
  });
  return _Object$keys(map).map(function (key) {
    return map[key];
  });
}

function declaredConnections(schema) {
  var _ref2;

  var typesAndInterfaces = _Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (value) {
    return value.kind === 'type' || value.kind === 'interface';
  });

  var connections = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(typesAndInterfaces.map(function (type) {
    return (type.fields || []). // flowism
    filter(function (field) {
      return field.isScalarConnection || field.isObjectConnection || field.isNodeConnection;
    }).map(function (field) {
      return {
        kind: field.isScalarConnection ? 'ScalarConnection' : field.isObjectConnection ? 'ObjectConnection' : 'NodeConnection', // field.isNodeConnection
        name: getConnectionName(field.type, field.edgeType),
        edgeType: field.edgeType || '',
        type: field.type
      };
    });
  })));

  return uniqueConnections(connections);
}

function rootConnectionDirectives(schema) {
  var _ref3;

  var isRootConnection = function isRootConnection(directive) {
    return Boolean(directive.name === 'rootConnection' && directive.arguments && directive.arguments.some(function (arg) {
      return arg.name === 'field' && arg.type === 'String' && arg.value;
    }));
  };

  return (_ref3 = []).concat.apply(_ref3, _toConsumableArray(_Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (definition) {
    return definition.kind === 'type';
  }).map(function (definition) {
    return (definition.directives || []). // flowism
    map(function (directive) {
      return _extends({}, directive, {
        parentTypeName: definition.name
      });
    });
  }))).filter(function (directive) {
    return isRootConnection(directive);
  });
}

function directiveConnections(schema) {
  var connections = rootConnectionDirectives(schema).map(function (directive) {
    return {
      kind: 'NodeConnection',
      name: getConnectionName(directive.parentTypeName),
      edgeType: '',
      type: directive.parentTypeName
    };
  });
  return uniqueConnections(connections);
}

function allConnections(schema) {
  var connections = [].concat(_toConsumableArray(declaredConnections(schema)), _toConsumableArray(directiveConnections(schema)));
  return uniqueConnections(connections);
}

function rootPluralIdDirectives(schema) {
  var _ref4;

  return (_ref4 = []).concat.apply(_ref4, _toConsumableArray(_Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (definition) {
    return definition.kind === 'type';
  }).map(function (type) {
    var _ref5;

    return (_ref5 = []).concat.apply(_ref5, _toConsumableArray((type.fields || []).map(function (field) {
      return field.directives.map(function (directive) {
        return _extends({}, directive, {
          parentTypeName: type.name,
          parentFieldName: field.name,
          parentFieldType: field.type
        });
      });
    })));
  }))).filter(function (directive) {
    return directive.name === 'rootPluralId' && directive.arguments && directive.arguments.length === 1;
  });
}

function implicitRootPluralIdTypes(schema) {
  return _Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (definition) {
    return definition.kind === 'type' && definition.implementsNode || definition.kind === 'interface' && definition.name !== 'Node' && definition.everyTypeImplementsNode || definition.kind === 'union' && definition.everyTypeImplementsNode;
  });
}

function rootViewerDirectives(schema) {
  var _ref6;

  return (_ref6 = []).concat.apply(_ref6, _toConsumableArray(_Object$keys(schema).map(function (key) {
    return schema[key];
  }).filter(function (definition) {
    return definition.kind === 'type';
  }).map(function (definition) {
    return (definition.directives || []). // flowism
    map(function (directive) {
      return _extends({}, directive, {
        parentTypeName: definition.name
      });
    });
  }))).filter(function (directive) {
    return directive.name === 'rootViewer' && directive.arguments && directive.arguments.length === 1;
  });
}

function extractVariablesFromObjectValues(values) {
  var variables = values.reduce(function (acc, objectValue) {
    var result = [];
    var visitor = {
      Variable: function Variable(node) {
        result.push(node.name.value);
        return undefined;
      }
    };
    (0, _language.visit)(objectValue, visitor);
    return acc.concat(result);
  }, []);
  return _Object$keys(variables.reduce(function (acc, variable) {
    return _extends({}, acc, _defineProperty({}, variable, true));
  }, {}));
}