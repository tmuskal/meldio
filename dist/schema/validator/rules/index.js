'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jsutilsValues = require('../../../jsutils/values');

var _jsutilsValues2 = _interopRequireDefault(_jsutilsValues);

var Enum = require('./Enum');
var Filter = require('./Filter');
var FilterCondition = require('./FilterCondition');
var FilterConditionArgument = require('./FilterConditionArgument');
var Input = require('./Input');
var InputArgument = require('./InputArgument');
var Interface = require('./Interface');
var InterfaceDirective = require('./InterfaceDirective');
var InterfaceField = require('./InterfaceField');
var InterfaceFieldDirective = require('./InterfaceFieldDirective');
var Mutation = require('./Mutation');
var MutationDirective = require('./MutationDirective');
var MutationArgument = require('./MutationArgument');
var MutationField = require('./MutationField');
var MutationFieldDirective = require('./MutationFieldDirective');
var Order = require('./Order');
var OrderExpression = require('./OrderExpression');
var Schema = require('./Schema');
var Type = require('./Type');
var TypeDirective = require('./TypeDirective');
var TypeField = require('./TypeField');
var TypeFieldDirective = require('./TypeFieldDirective');
var Union = require('./Union');
var UnionDirective = require('./UnionDirective');

var rules = {
  '/': (0, _jsutilsValues2['default'])(Schema),
  '/enum': (0, _jsutilsValues2['default'])(Enum),
  '/filter': (0, _jsutilsValues2['default'])(Filter),
  '/filter/condition': (0, _jsutilsValues2['default'])(FilterCondition),
  '/filter/condition/argument': (0, _jsutilsValues2['default'])(FilterConditionArgument),
  '/input': (0, _jsutilsValues2['default'])(Input),
  '/input/argument': (0, _jsutilsValues2['default'])(InputArgument),
  '/interface': (0, _jsutilsValues2['default'])(Interface),
  '/interface/directive': (0, _jsutilsValues2['default'])(InterfaceDirective),
  '/interface/field': (0, _jsutilsValues2['default'])(InterfaceField),
  '/interface/field/directive': (0, _jsutilsValues2['default'])(InterfaceFieldDirective),
  '/mutation': (0, _jsutilsValues2['default'])(Mutation),
  '/mutation/directive': (0, _jsutilsValues2['default'])(MutationDirective),
  '/mutation/argument': (0, _jsutilsValues2['default'])(MutationArgument),
  '/mutation/field': (0, _jsutilsValues2['default'])(MutationField),
  '/mutation/field/directive': (0, _jsutilsValues2['default'])(MutationFieldDirective),
  '/order': (0, _jsutilsValues2['default'])(Order),
  '/order/expression': (0, _jsutilsValues2['default'])(OrderExpression),
  '/type': (0, _jsutilsValues2['default'])(Type),
  '/type/directive': (0, _jsutilsValues2['default'])(TypeDirective),
  '/type/field': (0, _jsutilsValues2['default'])(TypeField),
  '/type/field/directive': (0, _jsutilsValues2['default'])(TypeFieldDirective),
  '/union': (0, _jsutilsValues2['default'])(Union),
  '/union/directive': (0, _jsutilsValues2['default'])(UnionDirective)
};
exports.rules = rules;