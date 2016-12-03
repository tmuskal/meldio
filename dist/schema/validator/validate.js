'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validate = validate;

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsValues = require('../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var _jsutilsFlatten2 = require('../../jsutils/flatten2');

var _jsutilsFlatten22 = _interopRequireDefault(_jsutilsFlatten2);

var _utils = require('./utils');

var _analyzer = require('../analyzer');

var _validators = require('./validators');

var _definitions = require('./definitions');

var _rules = require('./rules');

function validate(schema) {
  var rules = arguments.length <= 1 || arguments[1] === undefined ? _rules.rules : arguments[1];

  if ((0, _jsutilsIsNullish2['default'])(schema)) {
    throw new Error('must pass schema.');
  }

  var context = {
    schema: schema,
    TYPE_RESERVED_WORDS: _definitions.TYPE_RESERVED_WORDS,
    FIELD_RESERVED_WORDS: _definitions.FIELD_RESERVED_WORDS,
    TYPE_RESERVED_SUFFIXES: _definitions.TYPE_RESERVED_SUFFIXES,
    ARGUMENT_RESERVED_WORDS: _definitions.ARGUMENT_RESERVED_WORDS,
    rootQueryFieldNames: (0, _utils.rootQueryFieldNames)(schema),
    connections: (0, _analyzer.allConnections)(schema)
  };

  return [].concat(_toConsumableArray((0, _validators.validateSchema)(context, rules)), _toConsumableArray((0, _jsutilsFlatten22['default'])((0, _jsutilsValues2['default'])(schema).map(function (definition) {
    return definition.kind === 'enum' ? (0, _validators.validateEnum)(definition, context, rules) : definition.kind === 'input' ? (0, _validators.validateInput)(definition, context, rules) : definition.kind === 'interface' ? (0, _validators.validateInterface)(definition, context, rules) : definition.kind === 'mutation' ? (0, _validators.validateMutation)(definition, context, rules) : definition.kind === 'type' ? (0, _validators.validateType)(definition, context, rules) : definition.kind === 'union' ? (0, _validators.validateUnion)(definition, context, rules) : definition.kind === 'filter' ? (0, _validators.validateFilter)(definition, context, rules) : definition.kind === 'order' ? (0, _validators.validateOrder)(definition, context, rules) : [];
  }))));
}