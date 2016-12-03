/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Configuration options to control parser behavior
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseConstValue = parseConstValue;
exports.parseType = parseType;
exports.parseFieldDefinitionType = parseFieldDefinitionType;
exports.parseNamedType = parseNamedType;

var _source = require('./source');

var _syntaxError = require('./syntaxError');

var _lexer = require('./lexer');

var _kinds = require('./kinds');

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */

function parse(source, options) {
  var sourceObj = source instanceof _source.Source ? source : new _source.Source(source);
  var parser = makeParser(sourceObj, options || {});
  return parseDocument(parser);
}

/**
 * Given a string containing a GraphQL value, parse the AST for that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 */

function parseValue(source, options) {
  var sourceObj = source instanceof _source.Source ? source : new _source.Source(source);
  var parser = makeParser(sourceObj, options || {});
  return parseValueLiteral(parser);
}

/**
 * Variable : $ Name
 */
function parseVariable(parser) {
  var start = parser.token.start;
  expect(parser, _lexer.TokenKind.DOLLAR);
  return {
    kind: _kinds.VARIABLE,
    name: parseName(parser),
    loc: loc(parser, start)
  };
}

/**
 * Converts a name lex token into a name parse node.
 */
function parseName(parser) {
  var token = expect(parser, _lexer.TokenKind.NAME);
  return {
    kind: _kinds.NAME,
    value: token.value,
    loc: loc(parser, token.start)
  };
}

// Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */
function parseDocument(parser) {
  var start = parser.token.start;

  var definitions = [];
  do {
    definitions.push(parseTypeDefinition(parser));
  } while (!skip(parser, _lexer.TokenKind.EOF));

  return {
    kind: _kinds.DOCUMENT,
    definitions: definitions,
    loc: loc(parser, start)
  };
}

/**
 * Arguments : ( Argument+ )
 */
function parseArguments(parser) {
  return peek(parser, _lexer.TokenKind.PAREN_L) ? many(parser, _lexer.TokenKind.PAREN_L, parseArgument, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * Argument : Name : Value
 */
function parseArgument(parser) {
  var start = parser.token.start;
  return {
    kind: _kinds.ARGUMENT,
    name: parseName(parser),
    value: (expect(parser, _lexer.TokenKind.COLON), parseValueLiteral(parser, false)),
    loc: loc(parser, start)
  };
}

// Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */
function parseValueLiteral(parser, isConst) {
  var token = parser.token;
  switch (token.kind) {
    case _lexer.TokenKind.BRACKET_L:
      return parseList(parser, isConst);
    case _lexer.TokenKind.BRACE_L:
      return parseObject(parser, isConst);
    case _lexer.TokenKind.INT:
      advance(parser);
      return {
        kind: _kinds.INT,
        value: token.value,
        loc: loc(parser, token.start)
      };
    case _lexer.TokenKind.FLOAT:
      advance(parser);
      return {
        kind: _kinds.FLOAT,
        value: token.value,
        loc: loc(parser, token.start)
      };
    case _lexer.TokenKind.STRING:
      advance(parser);
      return {
        kind: _kinds.STRING,
        value: token.value,
        loc: loc(parser, token.start)
      };
    case _lexer.TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        advance(parser);
        return {
          kind: _kinds.BOOLEAN,
          value: token.value === 'true',
          loc: loc(parser, token.start)
        };
      } else if (token.value !== 'null') {
        advance(parser);
        return {
          kind: _kinds.ENUM,
          value: token.value,
          loc: loc(parser, token.start)
        };
      }
      break;
    case _lexer.TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(parser);
      }
      break;
  }
  throw unexpected(parser);
}

function parseConstValue(parser) {
  return parseValueLiteral(parser, true);
}

function parseValueValue(parser) {
  return parseValueLiteral(parser, false);
}

/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */
function parseList(parser, isConst) {
  var start = parser.token.start;
  var item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: _kinds.LIST,
    values: any(parser, _lexer.TokenKind.BRACKET_L, item, _lexer.TokenKind.BRACKET_R),
    loc: loc(parser, start)
  };
}

/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */
function parseObject(parser, isConst) {
  var start = parser.token.start;
  expect(parser, _lexer.TokenKind.BRACE_L);
  var fieldNames = {};
  var fields = [];
  while (!skip(parser, _lexer.TokenKind.BRACE_R)) {
    fields.push(parseObjectField(parser, isConst, fieldNames));
  }
  return {
    kind: _kinds.OBJECT,
    fields: fields,
    loc: loc(parser, start)
  };
}

/**
 * ObjectField[Const] : Name : Value[?Const]
 */
function parseObjectField(parser, isConst, fieldNames) {
  var start = parser.token.start;
  var name = parseName(parser);
  if (fieldNames.hasOwnProperty(name.value)) {
    throw (0, _syntaxError.syntaxError)(parser.source, start, 'Duplicate input object field ' + name.value + '.');
  }
  fieldNames[name.value] = true;
  return {
    kind: _kinds.OBJECT_FIELD,
    name: name,
    value: (expect(parser, _lexer.TokenKind.COLON), parseValueLiteral(parser, isConst)),
    loc: loc(parser, start)
  };
}

// Implements the parsing rules in the Directives section.

/**
 * Directives : Directive+
 */
function parseDirectives(parser) {
  var directives = [];
  while (peek(parser, _lexer.TokenKind.AT)) {
    directives.push(parseDirective(parser));
  }
  return directives;
}

/**
 * Directive : @ Name Arguments?
 */
function parseDirective(parser) {
  var start = parser.token.start;
  expect(parser, _lexer.TokenKind.AT);
  return {
    kind: _kinds.DIRECTIVE,
    name: parseName(parser),
    arguments: parseArguments(parser),
    loc: loc(parser, start)
  };
}

// Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */

function parseType(parser) {
  var start = parser.token.start;
  var type = undefined;
  if (skip(parser, _lexer.TokenKind.BRACKET_L)) {
    type = parseType(parser);
    expect(parser, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.LIST_TYPE,
      type: type,
      loc: loc(parser, start)
    };
  } else {
    type = parseNamedType(parser);
  }
  if (skip(parser, _lexer.TokenKind.BANG)) {
    return {
      kind: _kinds.NON_NULL_TYPE,
      type: type,
      loc: loc(parser, start)
    };
  }
  return type;
}

/**
 * FieldDefinitionType :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 *   - NodeConnection
 *   - ScalarConnection
 *   - ObjectConnection
 */

function parseFieldDefinitionType(parser) {
  var start = parser.token.start;
  var type = undefined;
  if (skip(parser, _lexer.TokenKind.BRACKET_L)) {
    type = parseType(parser);
    expect(parser, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.LIST_TYPE,
      type: type,
      loc: loc(parser, start)
    };
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'NodeConnection') {
    type = parseNodeConnectionDefinition(parser);
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'ScalarConnection') {
    type = parseScalarConnectionDefinition(parser);
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'ObjectConnection') {
    type = parseObjectConnectionDefinition(parser);
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'Edge') {
    type = parseEdgeDefinition(parser);
  } else {
    type = parseNamedType(parser);
  }
  if (skip(parser, _lexer.TokenKind.BANG)) {
    return {
      kind: _kinds.NON_NULL_TYPE,
      type: type,
      loc: loc(parser, start)
    };
  }
  return type;
}

function parseNodeConnectionDefinition(parser) {
  var skipRelatedField = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var start = parser.token.start;
  expectKeyword(parser, 'NodeConnection');
  expect(parser, _lexer.TokenKind.PAREN_L);
  var type = parseNamedType(parser);
  var relatedField = skipRelatedField ? null : parseName(parser);
  var edgeType = null;
  if (!peek(parser, _lexer.TokenKind.PAREN_R)) {
    edgeType = parseNamedType(parser);
  }
  expect(parser, _lexer.TokenKind.PAREN_R);
  return {
    kind: _kinds.NODE_CONNECTION_DEFINITION,
    type: type,
    relatedField: relatedField,
    edgeType: edgeType,
    loc: loc(parser, start)
  };
}

function parseScalarConnectionDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'ScalarConnection');
  expect(parser, _lexer.TokenKind.PAREN_L);
  var type = parseNamedType(parser);
  var edgeType = null;
  if (!peek(parser, _lexer.TokenKind.PAREN_R)) {
    edgeType = parseNamedType(parser);
  }
  expect(parser, _lexer.TokenKind.PAREN_R);
  return {
    kind: _kinds.SCALAR_CONNECTION_DEFINITION,
    type: type,
    edgeType: edgeType,
    loc: loc(parser, start)
  };
}

function parseObjectConnectionDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'ObjectConnection');
  expect(parser, _lexer.TokenKind.PAREN_L);
  var type = parseNamedType(parser);
  var edgeType = null;
  if (!peek(parser, _lexer.TokenKind.PAREN_R)) {
    edgeType = parseNamedType(parser);
  }
  expect(parser, _lexer.TokenKind.PAREN_R);
  return {
    kind: _kinds.OBJECT_CONNECTION_DEFINITION,
    type: type,
    edgeType: edgeType,
    loc: loc(parser, start)
  };
}

function parseEdgeDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'Edge');
  expect(parser, _lexer.TokenKind.PAREN_L);
  var type = parseNamedType(parser);
  var edgeType = null;
  if (!peek(parser, _lexer.TokenKind.PAREN_R)) {
    edgeType = parseNamedType(parser);
  }
  expect(parser, _lexer.TokenKind.PAREN_R);
  return {
    kind: _kinds.EDGE_DEFINITION,
    type: type,
    edgeType: edgeType,
    loc: loc(parser, start)
  };
}

/**
 * NamedType : Name
 */

function parseNamedType(parser) {
  var start = parser.token.start;
  return {
    kind: _kinds.NAMED_TYPE,
    name: parseName(parser),
    loc: loc(parser, start)
  };
}

// Implements the parsing rules in the Type Definition section.

/**
 * TypeDefinition :
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - ScalarTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 *   - TypeExtensionDefinition
 *   - MutationDefinition
 */
function parseTypeDefinition(parser) {
  if (!peek(parser, _lexer.TokenKind.NAME)) {
    throw unexpected(parser);
  }
  switch (parser.token.value) {
    case 'type':
      return parseObjectTypeDefinition(parser);
    case 'interface':
      return parseInterfaceTypeDefinition(parser);
    case 'union':
      return parseUnionTypeDefinition(parser);
    case 'scalar':
      return parseScalarTypeDefinition(parser);
    case 'enum':
      return parseEnumTypeDefinition(parser);
    case 'input':
      return parseInputObjectTypeDefinition(parser);
    case 'extend':
      return parseTypeExtensionDefinition(parser);
    case 'mutation':
      return parseMutationDefinition(parser);
    case 'filter':
      return parseFilterDefinition(parser);
    case 'order':
      return parseOrderDefinition(parser);
    default:
      throw unexpected(parser);
  }
}

/**
 * ObjectTypeDefinition : type Name ImplementsInterfaces? { FieldDefinition+ }
 */
function parseObjectTypeDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'type');
  var name = parseName(parser);
  var interfaces = parseImplementsInterfaces(parser);
  var directives = parseDirectives(parser);
  var fields = any(parser, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.OBJECT_TYPE_DEFINITION,
    name: name,
    interfaces: interfaces,
    fields: fields,
    directives: directives,
    loc: loc(parser, start)
  };
}

/**
 * ImplementsInterfaces : implements NamedType+
 */
function parseImplementsInterfaces(parser) {
  var types = [];
  if (parser.token.value === 'implements') {
    advance(parser);
    do {
      types.push(parseNamedType(parser));
    } while (!peek(parser, _lexer.TokenKind.BRACE_L) && !peek(parser, _lexer.TokenKind.AT));
  }
  return types;
}

/**
 * FieldDefinition : Name ArgumentsDefinition? : Type
 */
function parseFieldDefinition(parser) {
  var start = parser.token.start;
  var name = parseName(parser);
  var args = parseArgumentDefs(parser);
  expect(parser, _lexer.TokenKind.COLON);
  var type = parseFieldDefinitionType(parser);
  var directives = parseDirectives(parser);
  return {
    kind: _kinds.FIELD_DEFINITION,
    name: name,
    arguments: args,
    type: type,
    directives: directives,
    loc: loc(parser, start)
  };
}

/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */
function parseArgumentDefs(parser) {
  if (!peek(parser, _lexer.TokenKind.PAREN_L)) {
    return [];
  }
  return many(parser, _lexer.TokenKind.PAREN_L, parseInputValueDef, _lexer.TokenKind.PAREN_R);
}

/**
 * InputValueDefinition : Name : Type = DefaultValue?
 */
function parseInputValueDef(parser) {
  var start = parser.token.start;
  var name = parseName(parser);
  expect(parser, _lexer.TokenKind.COLON);
  var type = parseType(parser, false);
  var defaultValue = null;
  if (skip(parser, _lexer.TokenKind.EQUALS)) {
    defaultValue = parseConstValue(parser);
  }
  return {
    kind: _kinds.INPUT_VALUE_DEFINITION,
    name: name,
    type: type,
    defaultValue: defaultValue,
    loc: loc(parser, start)
  };
}

/**
 * InterfaceTypeDefinition : interface Name { FieldDefinition+ }
 */
function parseInterfaceTypeDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'interface');
  var name = parseName(parser);
  var directives = parseDirectives(parser);
  var fields = any(parser, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INTERFACE_TYPE_DEFINITION,
    name: name,
    fields: fields,
    directives: directives,
    loc: loc(parser, start)
  };
}

/**
 * UnionTypeDefinition : union Name = UnionMembers
 */
function parseUnionTypeDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'union');
  var name = parseName(parser);
  expect(parser, _lexer.TokenKind.EQUALS);
  var types = parseUnionMembers(parser);
  var directives = parseDirectives(parser);
  return {
    kind: _kinds.UNION_TYPE_DEFINITION,
    name: name,
    types: types,
    directives: directives,
    loc: loc(parser, start)
  };
}

/**
 * UnionMembers :
 *   - NamedType
 *   - UnionMembers | NamedType
 */
function parseUnionMembers(parser) {
  var members = [];
  do {
    members.push(parseNamedType(parser));
  } while (skip(parser, _lexer.TokenKind.PIPE));
  return members;
}

/**
 * ScalarTypeDefinition : scalar Name
 */
function parseScalarTypeDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'scalar');
  var name = parseName(parser);
  return {
    kind: _kinds.SCALAR_TYPE_DEFINITION,
    name: name,
    loc: loc(parser, start)
  };
}

/**
 * EnumTypeDefinition : enum Name { EnumValueDefinition+ }
 */
function parseEnumTypeDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'enum');
  var name = parseName(parser);
  var values = many(parser, _lexer.TokenKind.BRACE_L, parseEnumValueDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.ENUM_TYPE_DEFINITION,
    name: name,
    values: values,
    loc: loc(parser, start)
  };
}

/**
 * EnumValueDefinition : EnumValue
 *
 * EnumValue : Name
 */
function parseEnumValueDefinition(parser) {
  var start = parser.token.start;
  var name = parseName(parser);
  return {
    kind: _kinds.ENUM_VALUE_DEFINITION,
    name: name,
    loc: loc(parser, start)
  };
}

/**
 * InputObjectTypeDefinition : input Name { InputValueDefinition+ }
 */
function parseInputObjectTypeDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'input');
  var name = parseName(parser);
  var fields = any(parser, _lexer.TokenKind.BRACE_L, parseInputValueDef, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INPUT_OBJECT_TYPE_DEFINITION,
    name: name,
    fields: fields,
    loc: loc(parser, start)
  };
}

/**
 * TypeExtensionDefinition : extend ObjectTypeDefinition
 */
function parseTypeExtensionDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'extend');
  var definition = parseObjectTypeDefinition(parser);
  return {
    kind: _kinds.TYPE_EXTENSION_DEFINITION,
    definition: definition,
    loc: loc(parser, start)
  };
}

function parseMutationDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'mutation');
  var name = parseName(parser);
  var args = parseArgumentDefs(parser);
  var directives = parseDirectives(parser);
  var fields = any(parser, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.MUTATION_DEFINITION,
    name: name,
    arguments: args,
    fields: fields,
    directives: directives,
    loc: loc(parser, start)
  };
}

function parseFilterDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'filter');
  expectKeyword(parser, 'on');

  var type = undefined;
  if (skip(parser, _lexer.TokenKind.BRACKET_L)) {
    type = parseType(parser);
    expect(parser, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.LIST_TYPE,
      type: type,
      loc: loc(parser, start)
    };
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'NodeConnection') {
    type = parseNodeConnectionDefinition(parser, true);
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'ScalarConnection') {
    type = parseScalarConnectionDefinition(parser);
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'ObjectConnection') {
    type = parseObjectConnectionDefinition(parser);
  } else {
    throw unexpected(parser);
  }

  var conditions = any(parser, _lexer.TokenKind.BRACE_L, parseFilterCondition, _lexer.TokenKind.BRACE_R);

  return {
    kind: _kinds.FILTER_DEFINITION,
    type: type,
    conditions: conditions,
    loc: loc(parser, start)
  };
}

function parseFilterCondition(parser) {
  var start = parser.token.start;

  var key = parseEnumValueDefinition(parser);
  expect(parser, _lexer.TokenKind.COLON);
  var args = parseArgumentDefs(parser);
  var condition = parseObject(parser, false);
  return {
    kind: _kinds.FILTER_CONDITION,
    key: key,
    arguments: args,
    condition: condition,
    loc: loc(parser, start)
  };
}

function parseOrderDefinition(parser) {
  var start = parser.token.start;
  expectKeyword(parser, 'order');
  expectKeyword(parser, 'on');

  var type = undefined;
  if (skip(parser, _lexer.TokenKind.BRACKET_L)) {
    type = parseType(parser);
    expect(parser, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.LIST_TYPE,
      type: type,
      loc: loc(parser, start)
    };
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'NodeConnection') {
    type = parseNodeConnectionDefinition(parser, true);
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'ScalarConnection') {
    type = parseScalarConnectionDefinition(parser);
  } else if (parser.token.kind === _lexer.TokenKind.NAME && parser.token.value === 'ObjectConnection') {
    type = parseObjectConnectionDefinition(parser);
  } else {
    throw unexpected(parser);
  }

  var expressions = any(parser, _lexer.TokenKind.BRACE_L, parseOrderExpression, _lexer.TokenKind.BRACE_R);

  return {
    kind: _kinds.ORDER_DEFINITION,
    type: type,
    expressions: expressions,
    loc: loc(parser, start)
  };
}

function parseOrderExpression(parser) {
  var parseOrderObject = function parseOrderObject(p) {
    return parseObject(p, false);
  };
  var start = parser.token.start;

  var key = parseEnumValueDefinition(parser);
  expect(parser, _lexer.TokenKind.COLON);
  var expression = many(parser, _lexer.TokenKind.BRACKET_L, parseOrderObject, _lexer.TokenKind.BRACKET_R);
  return {
    kind: _kinds.ORDER_EXPRESSION,
    key: key,
    expression: expression,
    loc: loc(parser, start)
  };
}

// Core parsing utility functions

/**
 * Returns the parser object that is used to store state throughout the
 * process of parsing.
 */
function makeParser(source, options) {
  var _lexToken = (0, _lexer.lex)(source);
  return {
    _lexToken: _lexToken,
    source: source,
    options: options,
    prevEnd: 0,
    token: _lexToken()
  };
}

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */
function loc(parser, start) {
  if (parser.options.noLocation) {
    return null;
  }
  if (parser.options.noSource) {
    return { start: start, end: parser.prevEnd };
  }
  return { start: start, end: parser.prevEnd, source: parser.source };
}

/**
 * Moves the internal parser object to the next lexed token.
 */
function advance(parser) {
  var prevEnd = parser.token.end;
  parser.prevEnd = prevEnd;
  parser.token = parser._lexToken(prevEnd);
}

/**
 * Determines if the next token is of a given kind
 */
function peek(parser, kind) {
  return parser.token.kind === kind;
}

/**
 * If the next token is of the given kind, return true after advancing
 * the parser. Otherwise, do not change the parser state and return false.
 */
function skip(parser, kind) {
  var match = parser.token.kind === kind;
  if (match) {
    advance(parser);
  }
  return match;
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the parser. Otherwise, do not change the parser state and return false.
 */
function expect(parser, kind) {
  var token = parser.token;
  if (token.kind === kind) {
    advance(parser);
    return token;
  }
  throw (0, _syntaxError.syntaxError)(parser.source, token.start, 'Expected ' + (0, _lexer.getTokenKindDesc)(kind) + ', found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * If the next token is a keyword with the given value, return that token after
 * advancing the parser. Otherwise, do not change the parser state and return
 * false.
 */
function expectKeyword(parser, value) {
  var token = parser.token;
  if (token.kind === _lexer.TokenKind.NAME && token.value === value) {
    advance(parser);
    return token;
  }
  throw (0, _syntaxError.syntaxError)(parser.source, token.start, 'Expected "' + value + '", found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */
function unexpected(parser, atToken) {
  var token = atToken || parser.token;
  return (0, _syntaxError.syntaxError)(parser.source, token.start, 'Unexpected ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function any(parser, openKind, parseFn, closeKind) {
  expect(parser, openKind);
  var nodes = [];
  while (!skip(parser, closeKind)) {
    nodes.push(parseFn(parser));
  }
  return nodes;
}

/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function many(parser, openKind, parseFn, closeKind) {
  expect(parser, openKind);
  var nodes = [parseFn(parser)];
  while (!skip(parser, closeKind)) {
    nodes.push(parseFn(parser));
  }
  return nodes;
}

/**
 * By default, the parser creates AST nodes that know the location
 * in the source that they correspond to. This configuration flag
 * disables that behavior for performance or testing.
 */

/**
 * By default, the parser creates AST nodes that contain a reference
 * to the source that they were created from. This configuration flag
 * disables that behavior for performance or testing.
 */