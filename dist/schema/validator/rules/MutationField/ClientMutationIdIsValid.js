'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation "', '" declares field clientMutationId\n               ~ incorrectly (must be String!). Feel free to remove this\n               ~ declaration since clientMutationId field will be created\n               ~ automatically. ', ''], ['Mutation "', '" declares field clientMutationId\n               ~ incorrectly (must be String!). Feel free to remove this\n               ~ declaration since clientMutationId field will be created\n               ~ automatically. ', '']);

var _utilsJs = require('../../utils.js');

var ClientMutationIdIsValid = function ClientMutationIdIsValid(_ref) {
  var mutation = _ref.mutation;
  var field = _ref.field;

  if (!mutation || !field) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = field.name;
  var loc = field.loc;
  var type = field.type;
  var isScalar = field.isScalar;
  var isRequired = field.isRequired;

  if (name === 'clientMutationId' && (type !== 'String' || !isScalar || !isRequired)) {
    return (0, _utilsJs.error)(_templateObject, mutationName, loc);
  }
};
exports.ClientMutationIdIsValid = ClientMutationIdIsValid;