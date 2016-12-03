'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeMutationContext = makeMutationContext;
exports.makeHookContext = makeHookContext;
exports.makePermissionContext = makePermissionContext;

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _mutationsNode = require('../../../mutations/Node');

var _mutationsModel = require('../../../mutations/Model');

var _securitySecurityApi = require('../../../security/SecurityApi');

var _crudCRUD = require('../crud/CRUD');

var _authAuth = require('../auth/Auth');

function makeMutationContext(schema, rootValue, name, clientMutationId) {
  var db = rootValue.db;
  var env = rootValue.env;
  var config = rootValue.config;
  var viewerId = rootValue.viewerId;

  var passwordHashStrength = config.passwordHashStrength || 12;
  var mutationInfo = {
    name: name,
    clientMutationId: clientMutationId,
    globalIds: []
  };

  var crud = (0, _crudCRUD.CRUD)({ schema: schema, db: db, config: config });
  var auth = (0, _authAuth.Auth)({ db: db, config: config });
  var model = new _mutationsModel.Model({ schema: schema, crud: crud, mutation: mutationInfo });
  var security = new _securitySecurityApi.SecurityApi({
    schema: schema,
    auth: auth,
    mutation: mutationInfo,
    passwordHashStrength: passwordHashStrength
  });
  var viewer = viewerId ? new _mutationsNode.Node({
    schema: schema,
    crud: crud,
    mutation: mutationInfo,
    type: (0, _jsutilsGlobalId.typeFromGlobalId)(viewerId),
    id: viewerId
  }) : null;
  var timestamp = new Date().getTime();

  return {
    model: model,
    timestamp: timestamp,
    viewer: viewer,
    env: env,
    config: config,
    security: security
  };
}

function makeHookContext(schema, rootValue, name) {
  var db = rootValue.db;
  var env = rootValue.env;
  var config = rootValue.config;
  var viewerId = rootValue.viewerId;

  var passwordHashStrength = config.passwordHashStrength || 12;
  var mutationInfo = {
    name: name,
    globalIds: [],
    isHook: true
  };

  var crud = (0, _crudCRUD.CRUD)({ schema: schema, db: db, config: config });
  var auth = (0, _authAuth.Auth)({ db: db, config: config });
  var model = new _mutationsModel.Model({ schema: schema, crud: crud, mutation: mutationInfo });
  var security = new _securitySecurityApi.SecurityApi({
    schema: schema,
    auth: auth,
    mutation: mutationInfo,
    passwordHashStrength: passwordHashStrength
  });
  var viewer = viewerId ? new _mutationsNode.Node({
    schema: schema,
    crud: crud,
    mutation: mutationInfo,
    type: (0, _jsutilsGlobalId.typeFromGlobalId)(viewerId),
    id: viewerId
  }) : null;
  var timestamp = new Date().getTime();

  return {
    model: model,
    timestamp: timestamp,
    viewer: viewer,
    env: env,
    config: config,
    security: security
  };
}

function makePermissionContext(schema, rootValue, name) {
  var db = rootValue.db;
  var env = rootValue.env;
  var config = rootValue.config;
  var viewerId = rootValue.viewerId;

  var passwordHashStrength = config.passwordHashStrength || 12;
  var mutationInfo = {
    name: name,
    globalIds: [],
    isPermission: true
  };

  var crud = (0, _crudCRUD.CRUD)({ schema: schema, db: db, config: config });
  var auth = (0, _authAuth.Auth)({ db: db, config: config });
  var model = new _mutationsModel.Model({ schema: schema, crud: crud, mutation: mutationInfo });
  var security = new _securitySecurityApi.SecurityApi({
    schema: schema,
    auth: auth,
    mutation: mutationInfo,
    passwordHashStrength: passwordHashStrength
  });
  var viewer = viewerId ? new _mutationsNode.Node({
    schema: schema,
    crud: crud,
    mutation: mutationInfo,
    type: (0, _jsutilsGlobalId.typeFromGlobalId)(viewerId),
    id: viewerId
  }) : null;
  var timestamp = new Date().getTime();

  return {
    model: model,
    timestamp: timestamp,
    viewer: viewer,
    env: env,
    config: config,
    security: security
  };
}