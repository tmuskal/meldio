'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeDefinitions = makeDefinitions;

var _MakeBasicEnums = require('./MakeBasicEnums');

var _MakeConnectionTypes = require('./MakeConnectionTypes');

var _MakeFilterInputTypes = require('./MakeFilterInputTypes');

var _MakeMutationInputTypes = require('./MakeMutationInputTypes');

var _MakeMutationPayloadTypes = require('./MakeMutationPayloadTypes');

var _MakeNamedFilterEnums = require('./MakeNamedFilterEnums');

var _MakeNamedOrderEnums = require('./MakeNamedOrderEnums');

var _MakeNodeInterface = require('./MakeNodeInterface');

var _MakeNumericFieldEnums = require('./MakeNumericFieldEnums');

var _MakeOrderInputTypes = require('./MakeOrderInputTypes');

var _MakePageInfoType = require('./MakePageInfoType');

var _MakeRootMutationsType = require('./MakeRootMutationsType');

var _MakeRootQueryType = require('./MakeRootQueryType');

var tasks = [_MakeBasicEnums.MakeBasicEnums, _MakeConnectionTypes.MakeConnectionTypes, _MakeFilterInputTypes.MakeFilterInputTypes, _MakeMutationInputTypes.MakeMutationInputTypes, _MakeMutationPayloadTypes.MakeMutationPayloadTypes, _MakeNamedFilterEnums.MakeNamedFilterEnums, _MakeNamedOrderEnums.MakeNamedOrderEnums, _MakeNodeInterface.MakeNodeInterface, _MakeNumericFieldEnums.MakeNumericFieldEnums, _MakeOrderInputTypes.MakeOrderInputTypes, _MakePageInfoType.MakePageInfoType, _MakeRootMutationsType.MakeRootMutationsType, _MakeRootQueryType.MakeRootQueryType];

var _visitor = require('./visitor');

Object.defineProperty(exports, 'makeVisitors', {
  enumerable: true,
  get: function get() {
    return _visitor.makeVisitors;
  }
});

function makeDefinitions(accumulator, context) {
  return tasks.map(function (task) {
    return task(accumulator, context);
  }).reduce(function (acc, list) {
    return acc.concat(list);
  }, []);
}