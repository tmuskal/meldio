/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.visitAST = visitAST;

var _languageVisitor = require('../language/visitor');

var SchemaKeys = {
  Document: ['definitions'],

  ObjectTypeDefinition: _languageVisitor.QueryDocumentKeys.ObjectTypeDefinition,
  FieldDefinition: _languageVisitor.QueryDocumentKeys.FieldDefinition,
  InputValueDefinition: _languageVisitor.QueryDocumentKeys.InputValueDefinition,
  InterfaceTypeDefinition: _languageVisitor.QueryDocumentKeys.InterfaceTypeDefinition,
  UnionTypeDefinition: _languageVisitor.QueryDocumentKeys.UnionTypeDefinition,
  ScalarTypeDefinition: _languageVisitor.QueryDocumentKeys.ScalarTypeDefinition,
  EnumTypeDefinition: _languageVisitor.QueryDocumentKeys.EnumTypeDefinition,
  EnumValueDefinition: _languageVisitor.QueryDocumentKeys.EnumValueDefinition,
  InputObjectTypeDefinition: _languageVisitor.QueryDocumentKeys.InputObjectTypeDefinition,
  TypeExtensionDefinition: _languageVisitor.QueryDocumentKeys.TypeExtensionDefinition,
  MutationDefinition: _languageVisitor.QueryDocumentKeys.MutationDefinition,
  NodeConnectionDefinition: _languageVisitor.QueryDocumentKeys.NodeConnectionDefinition,
  ScalarConnectionDefinition: _languageVisitor.QueryDocumentKeys.ScalarConnectionDefinition,
  ObjectConnectionDefinition: _languageVisitor.QueryDocumentKeys.ObjectConnectionDefinition,
  EdgeDefinition: _languageVisitor.QueryDocumentKeys.EdgeDefinition,
  Directive: _languageVisitor.QueryDocumentKeys.Directive,
  FilterDefinition: _languageVisitor.QueryDocumentKeys.FilterDefinition,
  FilterCondition: _languageVisitor.QueryDocumentKeys.FilterCondition,
  OrderDefinition: _languageVisitor.QueryDocumentKeys.OrderDefinition,
  OrderExpression: _languageVisitor.QueryDocumentKeys.OrderExpression,

  IntValue: _languageVisitor.QueryDocumentKeys.IntValue,
  FloatValue: _languageVisitor.QueryDocumentKeys.FloatValue,
  StringValue: _languageVisitor.QueryDocumentKeys.StringValue,
  BooleanValue: _languageVisitor.QueryDocumentKeys.BooleanValue,
  EnumValue: _languageVisitor.QueryDocumentKeys.EnumValue,
  ListValue: _languageVisitor.QueryDocumentKeys.ListValue,
  ObjectValue: _languageVisitor.QueryDocumentKeys.ObjectValue,
  ObjectField: _languageVisitor.QueryDocumentKeys.ObjectField,

  Name: _languageVisitor.QueryDocumentKeys.Name,
  NamedType: _languageVisitor.QueryDocumentKeys.NamedType,
  ListType: _languageVisitor.QueryDocumentKeys.ListType,
  NonNullType: _languageVisitor.QueryDocumentKeys.NonNullType
};

exports.SchemaKeys = SchemaKeys;

function visitAST(root, visitor, keys) {
  return (0, _languageVisitor.visit)(root, visitor, keys || SchemaKeys);
}