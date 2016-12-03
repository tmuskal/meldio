'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.addTypeAnnotations = addTypeAnnotations;
exports.addTypeAnnotationsToUpdateExp = addTypeAnnotationsToUpdateExp;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var hasExactlyOne = function hasExactlyOne(list) {
  return list && list.length === 1;
};

function addTypeAnnotations(context, typeName, object) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to addTypeAnnotations.');
  (0, _jsutilsInvariant2['default'])(typeName, 'must pass typeName to addTypeAnnotations.');
  (0, _jsutilsInvariant2['default'])(object, 'must pass object to addTypeAnnotations.');

  var type = context.schema[typeName];
  if (!type) {
    return object;
  }

  var annotatedObject = undefined;
  var actualType = undefined;
  if (type.kind === 'type' && !type.implementsNode && !object._type) {
    annotatedObject = _extends({ _type: type.name }, object);
    actualType = type;
  } else if (type.kind === 'interface' && !type.everyTypeImplementsNode && hasExactlyOne(type.implementations) && !object._type) {
    annotatedObject = _extends({ _type: type.implementations[0] }, object);
    actualType = context.schema[type.implementations[0]];
  } else if (type.kind === 'union' && !type.everyTypeImplementsNode && hasExactlyOne(type.typeNames) && !object._type) {
    annotatedObject = _extends({ _type: type.typeNames[0] }, object);
    actualType = context.schema[type.typeNames[0]];
  } else {
    annotatedObject = object;
    actualType = type;
  }

  if (actualType.fields) {
    return actualType.fields.filter(function (field) {
      return (field.isObjectList || field.isObject) && !(0, _jsutilsIsNullish2['default'])(annotatedObject[field.name]);
    }).reduce(function (acc, field) {
      return _extends({}, acc, _defineProperty({}, field.name, field.isObjectList ? acc[field.name].map(function (element) {
        return addTypeAnnotations(context, field.type, element);
      }) : addTypeAnnotations(context, field.type, acc[field.name])));
    }, annotatedObject);
  }

  return annotatedObject;
}

function addTypeAnnotationsToUpdateExp(context, typeName, expression) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to addTypeAnnotationsToUpdateExp.');
  (0, _jsutilsInvariant2['default'])(typeName, 'must pass typeName to addTypeAnnotationsToUpdateExp.');
  (0, _jsutilsInvariant2['default'])(expression, 'must pass object to addTypeAnnotationsToUpdateExp.');
  var type = context.schema[typeName];
  if (!type) {
    return expression;
  }

  var annotatedExpression = undefined;
  var actualType = undefined;
  if (type.kind === 'type' && !type.implementsNode && !expression._type) {
    annotatedExpression = _extends({ _type: type.name }, expression);
    actualType = type;
  } else if (type.kind === 'interface' && !type.everyTypeImplementsNode && hasExactlyOne(type.implementations) && !expression._type) {
    annotatedExpression = _extends({ _type: type.implementations[0] }, expression);
    actualType = context.schema[type.implementations[0]];
  } else if (type.kind === 'union' && !type.everyTypeImplementsNode && hasExactlyOne(type.typeNames) && !expression._type) {
    annotatedExpression = _extends({ _type: type.typeNames[0] }, expression);
    actualType = context.schema[type.typeNames[0]];
  } else {
    annotatedExpression = expression;
    actualType = type;
  }

  if (actualType.fields) {
    return actualType.fields.filter(function (field) {
      return (field.isObjectList || field.isObject) && !(0, _jsutilsIsNullish2['default'])(expression[field.name]);
    }).reduce(function (acc, field) {
      return _extends({}, acc, _defineProperty({}, field.name, field.isObjectList && Array.isArray(acc[field.name]) ? acc[field.name].map(function (element) {
        return addTypeAnnotations(context, field.type, element);
      }) : field.isObjectList && Array.isArray(acc[field.name].insert) ? _extends({}, acc[field.name], {
        insert: acc[field.name].insert.map(function (element) {
          return addTypeAnnotations(context, field.type, element);
        })
      }) : field.isObjectList && !(0, _jsutilsIsNullish2['default'])(acc[field.name].insert) ? _extends({}, acc[field.name], {
        insert: addTypeAnnotations(context, field.type, acc[field.name].insert)
      }) : field.isObjectList && Array.isArray(acc[field.name]['delete']) ? _extends({}, acc[field.name], {
        'delete': acc[field.name]['delete'].map(function (element) {
          return addTypeAnnotations(context, field.type, element);
        })
      }) :
      // field.isObject ?
      addTypeAnnotationsToUpdateExp(context, field.type, acc[field.name])));
    }, annotatedExpression);
  }

  return annotatedExpression;
}