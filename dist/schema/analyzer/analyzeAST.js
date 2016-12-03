

/**
 * Configuration options to control parser behavior
 */
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.analyzeAST = analyzeAST;

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _visitor = require('../visitor');

var _visitors = require('./visitors');

var defaultOptions = {
  noLocation: false
};

function analyzeAST(ast, options) {
  if ((0, _jsutilsIsNullish2['default'])(ast)) {
    throw new Error('must pass ast.');
  }

  var context = {
    schema: {},
    implementations: {},
    unionMembership: {},
    noLocation: Boolean((options || defaultOptions).noLocation)
  };

  // First pass:
  // Visit type definitions and pick up schema information:
  (0, _visitor.visitAST)(ast, (0, _visitors.EnumTypeDefinition)(context));
  (0, _visitor.visitAST)(ast, (0, _visitors.ObjectTypeDefinition)(context));
  addNodeDefinition(context);
  (0, _visitor.visitAST)(ast, (0, _visitors.InterfaceTypeDefinition)(context));
  (0, _visitor.visitAST)(ast, (0, _visitors.UnionTypeDefinition)(context));
  (0, _visitor.visitAST)(ast, (0, _visitors.InputObjectTypeDefinition)(context));
  (0, _visitor.visitAST)(ast, (0, _visitors.MutationDefinition)(context));
  (0, _visitor.visitAST)(ast, (0, _visitors.FilterDefinition)(context));
  (0, _visitor.visitAST)(ast, (0, _visitors.OrderDefinition)(context));

  // Second pass:
  // 1. Go over types and interfaces and if field has isObject or isObjectList
  //    flags and the target implements Node, set isNode or isNodeList flags.
  // 2. Set memberOfUnions for each type using context.unionMembership map

  _Object$keys(context.schema).forEach(function (name) {
    var type = context.schema[name];
    if (type.kind === 'type' || type.kind === 'interface') {
      type.fields = type.fields.map(function (field) {
        var target = context.schema[field.type];
        if (Boolean(target) && (target.implementsNode || target.everyTypeImplementsNode)) {
          if (field.isObject) {
            delete field.isObject;
            return _extends({}, field, { isNode: true });
          } else if (field.isObjectList) {
            delete field.isObjectList;
            return _extends({}, field, { isNodeList: true });
          }
        }
        return field;
      });
    }
    if (type.kind === 'type') {
      type.memberOfUnions = context.unionMembership[name] || [];
    }
  });

  return context.schema;
}

function addNodeDefinition(context) {
  if (context.schema['Node']) {
    throw new Error('Name "Node" cannot be redefined.');
  }
  context.schema['Node'] = {
    kind: 'interface',
    name: 'Node',
    implementations: context.implementations['Node'] || [],
    everyTypeImplementsNode: true,
    noTypeImplementsNode: false,
    fields: [{
      kind: 'field',
      name: 'id',
      isRequired: true,
      isScalar: true,
      type: 'ID',
      hasArguments: false,
      directives: [] }],
    isSystemDefined: true,
    directives: []
  };
}

/**
 * By default, analyzer trensfer location information from AST. This can
 * be disabled for testing or performance.
 */