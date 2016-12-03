'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.CRUD = CRUD;

var _jsutilsInvariant = require('../../../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsGlobalId = require('../../../jsutils/globalId');

var _common = require('../common');

function CRUD(context) {
  var _this = this;

  var db = context.db;
  var schema = context.schema;
  var config = context.config;

  (0, _jsutilsInvariant2['default'])(schema, 'Must pass schema to CRUD context.');
  (0, _jsutilsInvariant2['default'])(db, 'Must pass database connection to CRUD context.');
  (0, _jsutilsInvariant2['default'])(config, 'Must pass config to CRUD context.');

  var _Filters = (0, _common.Filters)({ schema: schema });

  var objectFilter = _Filters.objectFilter;

  var _Updates = (0, _common.Updates)({ schema: schema });

  var updateNode = _Updates.updateNode;
  var updateObject = _Updates.updateObject;

  var hasEdgeFilter = function hasEdgeFilter(filter) {
    return _Object$keys(filter).filter(function (key) {
      return key !== 'node';
    }).length !== 0;
  };

  var filterTransformer = function filterTransformer(type, filter) {
    return { $and: [].concat(_toConsumableArray(objectFilter(filter, type, '')), [{}]) };
  };

  var updateTransformer = function updateTransformer(type, update) {
    return updateNode(update, type, '');
  };

  var nodeEdgeFilterTransformer = function nodeEdgeFilterTransformer(nodeType, edgeType, filter) {
    return {
      $and: [].concat(_toConsumableArray(filter.node ? objectFilter(filter.node, nodeType, 'node') : []), _toConsumableArray(hasEdgeFilter(filter) ? objectFilter(filter, edgeType, 'edgeProps') : []), [{}]) };
  };
  var nodeEdgeUpdateTransformer = function nodeEdgeUpdateTransformer(edgeType, update) {
    return updateObject(update, edgeType, 'edgeProps');
  };

  var readOptions = config.committedReads ? _common.MAJORITY_READ_OPTIONS : _common.LOCAL_READ_OPTIONS;
  var writeOptions = _common.DEFAULT_WRITE_OPTIONS;

  var mongoToNodeId = function mongoToNodeId(mongoObject) {
    var node = _extends({ id: mongoObject._id }, mongoObject);
    delete node._id;
    return node;
  };

  var nodeToMongoId = function nodeToMongoId(node) {
    var mongoObject = _extends({ _id: node.id }, node);
    delete mongoObject.id;
    return mongoObject;
  };

  var filteredIds = function filteredIds(type, mongoFilter) {
    return _regeneratorRuntime.async(function filteredIds$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          return context$2$0.abrupt('return', db.collection(type, readOptions).find(mongoFilter, { _id: true }).map(function (doc) {
            return doc._id;
          }).toArray());

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  var edgesAggregationStages = function edgesAggregationStages(nodeId, nodeField, nodeType, edgeType, filter) {
    var typeNames = schema[nodeType].kind === 'type' ? [nodeType] : schema[nodeType].kind === 'union' ? schema[nodeType].typeNames : schema[nodeType].kind === 'interface' ? schema[nodeType].implementations : [];
    return [{
      $match: { $or: [{ nodeId: nodeId, nodeField: nodeField }, { relatedId: nodeId, relatedField: nodeField }] }
    }, {
      $project: {
        edgeProps: true,
        joinId: { $cond: {
            'if': { $eq: ['$nodeId', nodeId] },
            then: '$relatedId',
            'else': '$nodeId' } } }
    }].concat(_toConsumableArray(typeNames.map(function (typeName) {
      return {
        $lookup: {
          from: typeName,
          localField: 'joinId',
          foreignField: '_id',
          as: typeName
        } };
    })), [{
      $project: {
        _id: false,
        edgeProps: true,
        node: {
          $arrayElemAt: [{ $concatArrays: typeNames.map(function (tn) {
              return '$' + tn;
            }) }, 0]
        }
      }
    }, {
      $match: {
        $and: [{ node: { $ne: null } }, Array.isArray(filter) ? { 'node._id': { $in: filter } } : nodeEdgeFilterTransformer(nodeType, edgeType, filter)]
      }
    }]);
  };

  // preserve edge invariant that nodeId < relatedId
  var edgeInvariant = function edgeInvariant(edge) {
    return edge.nodeId < edge.relatedId ? edge : _extends({}, edge, {
      nodeId: edge.relatedId,
      nodeField: edge.relatedField,
      relatedId: edge.nodeId,
      relatedField: edge.nodeField
    });
  };

  return {
    EDGE_COLLECTION: _common.EDGE_COLLECTION,
    AUTH_PROVIDER_COLLECTION: _common.AUTH_PROVIDER_COLLECTION,

    startMutation: function startMutation() {
      return _regeneratorRuntime.async(function startMutation$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    // nothing to see here for MongoDB, but could be used to
    // begin transaction
    finishMutation: function finishMutation() {
      return _regeneratorRuntime.async(function finishMutation$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    // nothing to see here for MongoDB, but could be used to
    // commit transaction
    abortMutation: function abortMutation() {
      return _regeneratorRuntime.async(function abortMutation$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    // nothing to see here for MongoDB, but could be used to
    // rollback transaction
    addNode: function addNode(type, node) {
      var object, result;
      return _regeneratorRuntime.async(function addNode$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            (0, _jsutilsInvariant2['default'])(node, 'Must pass node to addNode resolver.');
            (0, _jsutilsInvariant2['default'])(node.id, 'Must pass node with an id to addNode resolver.');

            object = nodeToMongoId(node);
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(db.collection(type).insertOne(object, writeOptions));

          case 5:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result.insertedId === node.id);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    existsNode: function existsNode(type, id) {
      var count;
      return _regeneratorRuntime.async(function existsNode$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(db.collection(type, readOptions).find({ _id: id }, { _id: true }).count());

          case 2:
            count = context$2$0.sent;
            return context$2$0.abrupt('return', count !== 0);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    getNode: function getNode(type, id) {
      var result;
      return _regeneratorRuntime.async(function getNode$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(db.collection(type, readOptions).find({ _id: id }).map(mongoToNodeId).toArray());

          case 2:
            result = context$2$0.sent;

            if (!result.length) {
              context$2$0.next = 5;
              break;
            }

            return context$2$0.abrupt('return', result[0]);

          case 5:
            return context$2$0.abrupt('return', null);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    deleteNode: function deleteNode(type, id) {
      var result;
      return _regeneratorRuntime.async(function deleteNode$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(db.collection(type).deleteOne({ _id: id }, writeOptions));

          case 2:
            result = context$2$0.sent;

            if (!(result.deletedCount === 1)) {
              context$2$0.next = 6;
              break;
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).deleteMany({ $or: [{ nodeId: id }, { relatedId: id }] }, writeOptions));

          case 6:
            return context$2$0.abrupt('return', result.deletedCount === 1);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    updateNode: function updateNode(type, id, update) {
      var mongoUpdate, result;
      return _regeneratorRuntime.async(function updateNode$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            mongoUpdate = updateTransformer(type, update);
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(db.collection(type).updateOne({ _id: id }, mongoUpdate, writeOptions));

          case 3:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result.result && result.result.ok === 1 && result.matchedCount === 1);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    deleteNodes: function deleteNodes(type, filter) {
      var ids, result;
      return _regeneratorRuntime.async(function deleteNodes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!Array.isArray(filter)) {
              context$2$0.next = 4;
              break;
            }

            context$2$0.t0 = filter;
            context$2$0.next = 7;
            break;

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(filteredIds(type, filterTransformer(type, filter)));

          case 6:
            context$2$0.t0 = context$2$0.sent;

          case 7:
            ids = context$2$0.t0;
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(db.collection(type).deleteMany({ _id: { $in: ids } }, writeOptions));

          case 10:
            result = context$2$0.sent;

            if (!result.deletedCount) {
              context$2$0.next = 14;
              break;
            }

            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).deleteMany({ $or: [{ nodeId: { $in: ids } }, { relatedId: { $in: ids } }] }, writeOptions));

          case 14:
            return context$2$0.abrupt('return', ids);

          case 15:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    updateNodes: function updateNodes(type, filter, update) {
      var ids, mongoUpdate;
      return _regeneratorRuntime.async(function updateNodes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!Array.isArray(filter)) {
              context$2$0.next = 4;
              break;
            }

            context$2$0.t0 = filter;
            context$2$0.next = 7;
            break;

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(filteredIds(type, filterTransformer(type, filter)));

          case 6:
            context$2$0.t0 = context$2$0.sent;

          case 7:
            ids = context$2$0.t0;
            mongoUpdate = updateTransformer(type, update);
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(db.collection(type).updateMany({ _id: { $in: ids } }, mongoUpdate, writeOptions));

          case 11:
            return context$2$0.abrupt('return', ids);

          case 12:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    listNodes: function listNodes(type, filter) {
      var collection, mongoFilter;
      return _regeneratorRuntime.async(function listNodes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            collection = db.collection(type, readOptions);
            mongoFilter = Array.isArray(filter) ? { _id: { $in: filter } } : filterTransformer(type, filter);
            return context$2$0.abrupt('return', collection.find(mongoFilter).map(mongoToNodeId).toArray());

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },

    NodeConnection: {
      listRelatedNodeIds: function listRelatedNodeIds(nodeId, nodeField) {
        return _regeneratorRuntime.async(function listRelatedNodeIds$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', db.collection(_common.EDGE_COLLECTION, readOptions).aggregate([{ $match: { $or: [{ nodeId: nodeId, nodeField: nodeField }, { relatedId: nodeId, relatedField: nodeField }] } }, { $project: {
                  _id: false,
                  relatedNodeId: { $cond: {
                      'if': { $eq: ['$nodeId', nodeId] },
                      then: '$relatedId',
                      'else': '$nodeId' } } } }]).map(function (doc) {
                return doc.relatedNodeId;
              }).toArray());

            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      addEdge: function addEdge(id, nodeId, nodeField, relatedId, relatedField, edgeProps) {
        var result;
        return _regeneratorRuntime.async(function addEdge$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).insertOne(edgeInvariant({
                _id: id,
                nodeId: nodeId,
                nodeField: nodeField,
                relatedId: relatedId,
                relatedField: relatedField,
                edgeProps: edgeProps || {}
              }), writeOptions));

            case 2:
              result = context$2$0.sent;
              return context$2$0.abrupt('return', result.insertedId === id);

            case 4:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      existsEdge: function existsEdge(nodeId, nodeField, relatedId, relatedField) {
        var count;
        return _regeneratorRuntime.async(function existsEdge$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION, readOptions).find(edgeInvariant({ nodeId: nodeId, nodeField: nodeField, relatedId: relatedId, relatedField: relatedField }), { _id: true }).count());

            case 2:
              count = context$2$0.sent;
              return context$2$0.abrupt('return', count !== 0);

            case 4:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      getEdge: function getEdge(nodeId, nodeField, relatedId, relatedField) {
        var edgeResult, type, edgeProps, nodeResult, node;
        return _regeneratorRuntime.async(function getEdge$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION, readOptions).find(edgeInvariant({ nodeId: nodeId, nodeField: nodeField, relatedId: relatedId, relatedField: relatedField }), { _id: true, edgeProps: true }).toArray());

            case 2:
              edgeResult = context$2$0.sent;

              if (!edgeResult.length) {
                context$2$0.next = 13;
                break;
              }

              type = (0, _jsutilsGlobalId.typeFromGlobalId)(relatedId);
              edgeProps = edgeResult[0].edgeProps || {};
              context$2$0.next = 8;
              return _regeneratorRuntime.awrap(db.collection(type, readOptions).find({ _id: relatedId }).toArray());

            case 8:
              nodeResult = context$2$0.sent;

              if (!nodeResult.length) {
                context$2$0.next = 12;
                break;
              }

              node = mongoToNodeId(nodeResult[0]);
              return context$2$0.abrupt('return', _extends({}, edgeProps, { node: node }));

            case 12:
              return context$2$0.abrupt('return', null);

            case 13:
              return context$2$0.abrupt('return', null);

            case 14:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      deleteEdge: function deleteEdge(nodeId, nodeField, relatedId, relatedField) {
        var result;
        return _regeneratorRuntime.async(function deleteEdge$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).deleteOne(edgeInvariant({ nodeId: nodeId, nodeField: nodeField, relatedId: relatedId, relatedField: relatedField }), writeOptions));

            case 2:
              result = context$2$0.sent;
              return context$2$0.abrupt('return', result.deletedCount !== 0);

            case 4:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      updateEdge: function updateEdge(nodeId, nodeField, relatedId, relatedField, nodeType, edgeType, update) {
        var mongoUpdate, result;
        return _regeneratorRuntime.async(function updateEdge$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              mongoUpdate = nodeEdgeUpdateTransformer(edgeType, update);
              context$2$0.next = 3;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).updateOne(edgeInvariant({ nodeId: nodeId, nodeField: nodeField, relatedId: relatedId, relatedField: relatedField }), mongoUpdate, writeOptions));

            case 3:
              result = context$2$0.sent;
              return context$2$0.abrupt('return', result.result.ok === 1);

            case 5:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      listEdges: function listEdges(nodeId, nodeField, nodeType, edgeType, filter) {
        var stages;
        return _regeneratorRuntime.async(function listEdges$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              stages = edgesAggregationStages(nodeId, nodeField, nodeType, edgeType, filter);
              return context$2$0.abrupt('return', db.collection(_common.EDGE_COLLECTION, readOptions).aggregate(stages).map(function (edge) {
                edge.node.id = edge.node._id;
                delete edge.node._id;
                return _extends({}, edge.edgeProps || {}, {
                  node: edge.node
                });
              }).toArray());

            case 2:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      deleteEdges: function deleteEdges(nodeId, nodeField, nodeType, edgeType, filter) {
        var ids, result;
        return _regeneratorRuntime.async(function deleteEdges$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              if (!Array.isArray(filter)) {
                context$2$0.next = 4;
                break;
              }

              context$2$0.t0 = filter;
              context$2$0.next = 7;
              break;

            case 4:
              context$2$0.next = 6;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION, readOptions).aggregate(edgesAggregationStages(nodeId, nodeField, nodeType, edgeType, filter)).map(function (edge) {
                return edge.node._id;
              }).toArray());

            case 6:
              context$2$0.t0 = context$2$0.sent;

            case 7:
              ids = context$2$0.t0;
              context$2$0.next = 10;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).deleteMany({
                $or: [{ nodeId: nodeId, nodeField: nodeField, relatedId: { $in: ids } }, { relatedId: nodeId, relatedField: nodeField, nodeId: { $in: ids } }] }, writeOptions));

            case 10:
              result = context$2$0.sent;

              if (!result.deletedCount) {
                context$2$0.next = 14;
                break;
              }

              context$2$0.next = 14;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).deleteMany({ $or: [{ nodeId: { $in: ids } }, { relatedId: { $in: ids } }] }, writeOptions));

            case 14:
              return context$2$0.abrupt('return', ids);

            case 15:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      },

      updateEdges: function updateEdges(nodeId, nodeField, nodeType, edgeType, filter, update) {
        var ids, mongoUpdate;
        return _regeneratorRuntime.async(function updateEdges$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              if (!Array.isArray(filter)) {
                context$2$0.next = 4;
                break;
              }

              context$2$0.t0 = filter;
              context$2$0.next = 7;
              break;

            case 4:
              context$2$0.next = 6;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION, readOptions).aggregate(edgesAggregationStages(nodeId, nodeField, nodeType, edgeType, filter)).map(function (edge) {
                return edge.node._id;
              }).toArray());

            case 6:
              context$2$0.t0 = context$2$0.sent;

            case 7:
              ids = context$2$0.t0;
              mongoUpdate = nodeEdgeUpdateTransformer(edgeType, update);
              context$2$0.next = 11;
              return _regeneratorRuntime.awrap(db.collection(_common.EDGE_COLLECTION).updateMany({
                $or: [{ nodeId: nodeId, nodeField: nodeField, relatedId: { $in: ids } }, { relatedId: nodeId, relatedField: nodeField, nodeId: { $in: ids } }] }, mongoUpdate, writeOptions));

            case 11:
              return context$2$0.abrupt('return', ids);

            case 12:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }
  };
}

// delete related edges