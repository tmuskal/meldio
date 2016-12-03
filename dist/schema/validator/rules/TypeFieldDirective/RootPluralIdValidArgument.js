'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Directive @rootPluralId defined on "', '" of\n                 ~ "', '" type should have exactly one argument. ', ''], ['Directive @rootPluralId defined on "', '" of\n                 ~ "', '" type should have exactly one argument. ', '']),
    _templateObject2 = _taggedTemplateLiteral(['Directive @rootPluralId defined on "', '" of\n                 ~ "', '" type should have argument "field" with\n                 ~ a String value. ', ''], ['Directive @rootPluralId defined on "', '" of\n                 ~ "', '" type should have argument "field" with\n                 ~ a String value. ', '']),
    _templateObject3 = _taggedTemplateLiteral(['Directive @rootPluralId defined on "', '" of\n                   ~ "', '" type should specify field name in\n                   ~ "camelCase", e.g. ', '. ', ''], ['Directive @rootPluralId defined on "', '" of\n                   ~ "', '" type should specify field name in\n                   ~ "camelCase", e.g. ', '. ', '']),
    _templateObject4 = _taggedTemplateLiteral(['Directive @rootPluralId defined on "', '" of\n                   ~ "', '" type specifies field name "', '",\n                   ~ which is not unique. ', ''], ['Directive @rootPluralId defined on "', '" of\n                   ~ "', '" type specifies field name "', '",\n                   ~ which is not unique. ', '']);

var _jsutilsCasing = require('../../../../jsutils/casing');

var _utils = require('../../utils');

var RootPluralIdValidArgument = function RootPluralIdValidArgument(_ref) {
  var type = _ref.type;
  var field = _ref.field;
  var directive = _ref.directive;
  var rootQueryFieldNames = _ref.rootQueryFieldNames;

  if (!type || !field || !directive) {
    throw Error('context not passed to rule.');
  }

  var typeName = type.name;
  var fieldName = field.name;
  var name = directive.name;
  var loc = directive.loc;
  var args = directive.arguments;

  if (name === 'rootPluralId') {
    var _ret = (function () {
      if (args.length !== 1) {
        return {
          v: (0, _utils.error)(_templateObject, fieldName, typeName, loc)
        };
      }

      var _args$0 = args[0];
      var argName = _args$0.name;
      var argType = _args$0.type;
      var argValue = _args$0.value;

      if (argName !== 'field' || argType !== 'String' || !argValue) {
        return {
          v: (0, _utils.error)(_templateObject2, fieldName, typeName, loc)
        };
      }

      if (argValue !== (0, _jsutilsCasing.camelCase)(String(argValue))) {
        return {
          v: (0, _utils.warning)(_templateObject3, fieldName, typeName, (0, _jsutilsCasing.camelCase)(String(argValue)), loc)
        };
      }

      var isNameUniqueAtRoot = rootQueryFieldNames.filter(function (f) {
        return f === argValue;
      }).length === 1;

      if (!isNameUniqueAtRoot) {
        return {
          v: (0, _utils.error)(_templateObject4, fieldName, typeName, argValue, loc)
        };
      }
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
};
exports.RootPluralIdValidArgument = RootPluralIdValidArgument;