'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['Mutation "', '" declares argument clientMutationId\n               ~ incorrectly (must be String!). Feel free to remove this\n               ~ declaration since clientMutationId argument will be created\n               ~ automatically. ', ''], ['Mutation "', '" declares argument clientMutationId\n               ~ incorrectly (must be String!). Feel free to remove this\n               ~ declaration since clientMutationId argument will be created\n               ~ automatically. ', '']);

var _utilsJs = require('../../utils.js');

var ClientMutationIdIsValid = function ClientMutationIdIsValid(_ref) {
  var mutation = _ref.mutation;
  var argument = _ref.argument;

  if (!mutation || !argument) {
    throw Error('context not passed to rule.');
  }
  var mutationName = mutation.name;
  var name = argument.name;
  var loc = argument.loc;
  var type = argument.type;
  var isScalar = argument.isScalar;
  var isRequired = argument.isRequired;

  if (name === 'clientMutationId' && (type !== 'String' || !isScalar || !isRequired)) {
    return (0, _utilsJs.error)(_templateObject, mutationName, loc);
  }
};
exports.ClientMutationIdIsValid = ClientMutationIdIsValid;