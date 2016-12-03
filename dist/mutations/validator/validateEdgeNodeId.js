'use strict';

var _taggedTemplateLiteral = require('babel-runtime/helpers/tagged-template-literal')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.validateEdgeNodeId = validateEdgeNodeId;

var _templateObject = _taggedTemplateLiteral(['Id passed to ', ' must be for implementation of\n             ~ "', '" interface.'], ['Id passed to ', ' must be for implementation of\n             ~ "', '" interface.']),
    _templateObject2 = _taggedTemplateLiteral(['Id passed to ', ' must be for a member of\n             ~ "', '" union.'], ['Id passed to ', ' must be for a member of\n             ~ "', '" union.']);

var _jsutilsInvariant = require('../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsStrip = require('../../jsutils/strip');

var _jsutilsStrip2 = _interopRequireDefault(_jsutilsStrip);

var _jsutilsIsNullish = require('../../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _jsutilsGlobalId = require('../../jsutils/globalId');

function validateEdgeNodeId(context, id) {
  (0, _jsutilsInvariant2['default'])(context, 'must pass context to validateEdgeNodeId.');
  var func = context['function'];
  var typeName = context.field.type;

  (0, _jsutilsInvariant2['default'])(context.schema && context.schema[typeName] && (context.schema[typeName].kind === 'type' || context.schema[typeName].kind === 'interface' || context.schema[typeName].kind === 'union'), 'must pass correct context to validateEdgeNodeId.');

  var results = (0, _jsutilsIsNullish2['default'])(id) ? ['Must pass an id to ' + func + '.'] : !(0, _jsutilsGlobalId.isGlobalId)(id) ? ['Id passed to ' + func + ' is invalid.'] : context.schema[typeName].kind === 'type' && (0, _jsutilsGlobalId.typeFromGlobalId)(id) !== typeName ? ['Id passed to ' + func + ' must be of type "' + typeName + '".'] : context.schema[typeName].kind === 'interface' && !context.schema[typeName].implementations.includes((0, _jsutilsGlobalId.typeFromGlobalId)(id)) ? [(0, _jsutilsStrip2['default'])(_templateObject, func, typeName)] : context.schema[typeName].kind === 'union' && !context.schema[typeName].typeNames.includes((0, _jsutilsGlobalId.typeFromGlobalId)(id)) ? [(0, _jsutilsStrip2['default'])(_templateObject2, func, typeName)] : [];

  return { context: context, results: results };
}