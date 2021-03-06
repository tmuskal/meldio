/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

export const QueryDocumentKeys = {
  Name: [],

  Document: [ 'definitions' ],
  OperationDefinition:
    [ 'name', 'variableDefinitions', 'directives', 'selectionSet' ],
  VariableDefinition: [ 'variable', 'type', 'defaultValue' ],
  Variable: [ 'name' ],
  SelectionSet: [ 'selections' ],
  Field: [ 'alias', 'name', 'arguments', 'directives', 'selectionSet' ],
  Argument: [ 'name', 'value' ],

  FragmentSpread: [ 'name', 'directives' ],
  InlineFragment: [ 'typeCondition', 'directives', 'selectionSet' ],
  FragmentDefinition: [ 'name', 'typeCondition', 'directives', 'selectionSet' ],

  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  EnumValue: [],
  ListValue: [ 'values' ],
  ObjectValue: [ 'fields' ],
  ObjectField: [ 'name', 'value' ],

  Directive: [ 'name', 'arguments' ],

  NamedType: [ 'name' ],
  ListType: [ 'type' ],
  NonNullType: [ 'type' ],

  ObjectTypeDefinition: [ 'name', 'interfaces', 'fields', 'directives' ],
  FieldDefinition: [ 'name', 'arguments', 'type', 'directives' ],
  InputValueDefinition: [ 'name', 'type', 'defaultValue' ],
  InterfaceTypeDefinition: [ 'name', 'fields', 'directives' ],
  UnionTypeDefinition: [ 'name', 'types', 'directives' ],
  ScalarTypeDefinition: [ 'name' ],
  EnumTypeDefinition: [ 'name', 'values' ],
  EnumValueDefinition: [ 'name' ],
  InputObjectTypeDefinition: [ 'name', 'fields' ],
  TypeExtensionDefinition: [ 'definition' ],

  MutationDefinition: [ 'name', 'arguments', 'fields', 'directives' ],
  NodeConnectionDefinition: [ 'type', 'relatedField', 'edgeType' ],
  ScalarConnectionDefinition: [ 'type', 'edgeType' ],
  ObjectConnectionDefinition: [ 'type', 'edgeType' ],
  EdgeDefinition: [ 'type', 'edgeType' ],

  FilterDefinition: [ 'type', 'conditions' ],
  FilterCondition: [ 'key', 'arguments', 'condition' ],
  OrderDefinition: [ 'type', 'expressions' ],
  OrderExpression: [ 'key', 'expression' ],
};


export const BREAK = {};

/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of it's child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     let editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */
export function visit(root, visitor, keyMap) {
  const visitorKeys = keyMap || QueryDocumentKeys;

  let stack;
  let inArray = Array.isArray(root);
  let keys = [ root ];
  let index = -1;
  let edits = [];
  let parent;
  const path = [];
  const ancestors = [];
  let newRoot = root;

  do {
    index++;
    const isLeaving = index === keys.length;
    let key;
    let node;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path.pop();
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          const clone = {};
          for (const k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }
          node = clone;
        }
        let editOffset = 0;
        for (let ii = 0; ii < edits.length; ii++) {
          let editKey = edits[ii][0];
          const editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    let result;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + JSON.stringify(node));
      }
      const visitFn = getVisitFn(visitor, isLeaving, node.kind);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([ key, result ]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([ key, node ]);
    }

    if (!isLeaving) {
      stack = { inArray, index, keys, edits, prev: stack };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[0][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return maybeNode && typeof maybeNode.kind === 'string';
}

export function getVisitFn(visitor, isLeaving, kind) {
  const kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }
    const kindSpecificVisitor =
      isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
    return;
  }
  const specificVisitor = isLeaving ? visitor.leave : visitor.enter;
  if (specificVisitor) {
    if (typeof specificVisitor === 'function') {
      // { enter() {}, leave() {} }
      return specificVisitor;
    }
    const specificKindVisitor = specificVisitor[kind];
    if (typeof specificKindVisitor === 'function') {
      // { enter: { Kind() {} }, leave: { Kind() {} } }
      return specificKindVisitor;
    }
  }
}
