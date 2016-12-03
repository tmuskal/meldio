'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['You should not declare clientMutationId field explicitly\n                 ~ on mutation "', '". The argument will be created\n                 ~ automatically. ', ''], ['You should not declare clientMutationId field explicitly\n                 ~ on mutation "', '". The argument will be created\n                 ~ automatically. ', '']);

var _utilsJs = require('../../utils.js');

var ClientMutationIdProvided = function ClientMutationIdProvided(_ref) {
  var mutation = _ref.mutation;
  var field = _ref.field;

  if (!mutation || !field) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = field.name;
  var loc = field.loc;

  if (name === 'clientMutationId') {
    return (0, _utilsJs.warning)(_templateObject, mutationName, loc);
  }
};
exports.ClientMutationIdProvided = ClientMutationIdProvided;