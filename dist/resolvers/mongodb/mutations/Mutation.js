'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Mutation = Mutation;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _mutations = require('../../../mutations');

var _graphql = require('graphql');

var _common = require('../common');

function Mutation(_ref) {
  var schema = _ref.schema;

  (0, _jsutilsInvariant2['default'])(schema, 'schema must be passed to resolver');

  return function callee$1$0(parent, args, info) {
    var name, rootValue, mutations, config, permissions, input, clientMutationId, executionArgs, ctx, permissionCtx, permission, mutation, result, output;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          name = info.fieldName;
          rootValue = info.rootValue;
          mutations = rootValue.mutations;
          config = rootValue.config;
          permissions = rootValue.permissions;
          input = args.input;
          clientMutationId = input.clientMutationId;
          executionArgs = _objectWithoutProperties(input, ['clientMutationId']);
          ctx = (0, _common.makeMutationContext)(schema, rootValue, name, clientMutationId);
          permissionCtx = (0, _common.makePermissionContext)(schema, rootValue, name);
          context$2$0.t0 = config.enabledAuth.length === 0;

          if (context$2$0.t0) {
            context$2$0.next = 20;
            break;
          }

          if (!(permissions && permissions[name])) {
            context$2$0.next = 18;
            break;
          }

          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(permissions[name].apply(permissionCtx, [executionArgs]));

        case 15:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.next = 19;
          break;

        case 18:
          context$2$0.t1 = false;

        case 19:
          context$2$0.t0 = context$2$0.t1;

        case 20:
          permission = context$2$0.t0;

          if (permission) {
            context$2$0.next = 23;
            break;
          }

          throw new _graphql.GraphQLError('Permission denied. Can not execute mutation "' + name + '".');

        case 23:
          mutation = mutations[name];
          context$2$0.next = 26;
          return _regeneratorRuntime.awrap(mutation.apply(ctx, [executionArgs]));

        case 26:
          result = context$2$0.sent;
          context$2$0.next = 29;
          return _regeneratorRuntime.awrap((0, _mutations.processMutationResults)(result));

        case 29:
          output = context$2$0.sent;
          return context$2$0.abrupt('return', _extends({}, output, { clientMutationId: clientMutationId }));

        case 31:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
}