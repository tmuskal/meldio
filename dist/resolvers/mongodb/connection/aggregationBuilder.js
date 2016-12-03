'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.aggregationBuilder = aggregationBuilder;

var _jsutilsKeyMap = require('../../../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _jsutilsKeyValMap = require('../../../jsutils/keyValMap');

var _jsutilsKeyValMap2 = _interopRequireDefault(_jsutilsKeyValMap);

var _jsutilsAtMostOneOf = require('../../../jsutils/atMostOneOf');

var _jsutilsAtMostOneOf2 = _interopRequireDefault(_jsutilsAtMostOneOf);

var _graphqlError = require('graphql/error');

var _graphqlUtilities = require('graphql/utilities');

function aggregationBuilder(kind, aggregations, countFilterBuilder, filterConditions, filterInputObjectDefinition) {
  // istanbul ignore if
  if (!aggregations || !aggregations.length) {
    return [];
  }
  return {
    $group: _extends({
      _id: null
    }, aggregations.map(function (aggregation) {
      return _defineProperty({}, aggregation.alias || aggregation.name, aggregation.name === 'sum' ? { $sum: getFieldName(aggregation) } : aggregation.name === 'min' ? { $min: getFieldName(aggregation) } : aggregation.name === 'max' ? { $max: getFieldName(aggregation) } : aggregation.name === 'average' ? { $avg: getFieldName(aggregation) } : aggregation.name === 'count' ? { $sum: getCountExpression(aggregation) } :
      // istanbul ignore next
      { $first: null });
    }).reduce(function (acc, agg) {
      return _extends({}, acc, agg || {});
    }, {}))
  };

  function getCountExpression(_ref2) {
    var argsList = _ref2.arguments;

    var args = (0, _jsutilsKeyValMap2['default'])(argsList, function (arg) {
      return arg.name;
    }, function (arg) {
      return arg.value;
    });
    var filter = args.filter;
    var filterBy = args.filterBy;

    if (!(0, _jsutilsAtMostOneOf2['default'])(filter, filterBy)) {
      throw new _graphqlError.GraphQLError('Count cannot specify more than one filter.');
    }
    if (filterBy) {
      return countFilterBuilder(filterBy);
    } else if (filter) {
      var ast = filterConditions[filter];
      // TODO: pass only args relevant to given filter key:
      var filterValue = (0, _graphqlUtilities.valueFromAST)(ast, filterInputObjectDefinition, args);
      var validationResults = (0, _graphqlUtilities.isValidJSValue)(filterValue, filterInputObjectDefinition);
      if (validationResults.length) {
        throw new _graphqlError.GraphQLError('Count filter validation failed:\n' + validationResults.join('\n'));
      }
      return countFilterBuilder(filterValue);
    }
    return 1;
  }

  function getFieldName(_ref3) {
    var name = _ref3.name;
    var args = _ref3.arguments;

    var argsMap = (0, _jsutilsKeyMap2['default'])(args, function (arg) {
      return arg.name;
    });
    if (!argsMap.node && !argsMap.edges || argsMap.node && argsMap.edges) {
      throw new _graphqlError.GraphQLError('Aggregation "' + name + '" must specify either node or edges parameter.');
    }
    if (argsMap.edges) {
      return '$edgeProps.' + argsMap.edges.value;
    }
    if (argsMap.node) {
      if (kind === 'ScalarConnection') {
        return '$node';
      }
      return '$node.' + argsMap.node.value;
    }
    // istanbul ignore next
    return null;
  }
}