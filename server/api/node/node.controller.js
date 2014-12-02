'use strict';

var _ = require('lodash');
var Node = require('./node.model');

// Get list of nodes
exports.index = function(req, res) {
  var findCriteria = {
    firstNode: JSON.parse(req.query.firstNode),
    isPrivate: JSON.parse(req.query.isPrivate)
  };

  Node.find(findCriteria, function (err, nodes) {
    if(err) { return handleError(res, err); }
    return res.json(200, nodes);
  });
};

// Get list of nodes
exports.getNodes = function(req, res) {
  //configure this recursive call for all nodes that are children of this root node
  Node.find({storyId: req.query.storyId}, function (err, nodes) {
    console.log('nodes', nodes)
    console.log('query', req.query);
    if(err) { return handleError(res, err); }
    return res.json(200, nodes);
  });
};

// Get a single node
exports.show = function(req, res) {
  Node.findById(req.params.id, function (err, node) {
    if(err) { return handleError(res, err); }
    if(!node) { return res.send(404); }
    return res.json(node);
  });
};

// Get a single node
exports.rateNodes = function(req, res) {
  Node.findById(req.params.nodeId, {'likes':1}, function (err, node) {
    if(err) { return handleError(res, err); }
    if(!node) { return res.send(404); }
    node.likeNodes(req.body, function(ratedNode){
      return res.json(node);      
    })
  });
};

// Creates a new node in the DB.
exports.create = function(req, res) {
  //amend this create
  console.log(req.body);
  Node.create(req.body, function(err, node) {
    var node = new Node();
    node.text = req.body.story.input;
    node.isPrivate = req.body.story.isPrivate;
    node.firstNode = true;
    node.save();
    if(err) { return handleError(res, err); }
    return res.json(201, node);
  });
};

// Updates an existing node in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Node.findById(req.params.id, function (err, node) {
    if (err) { return handleError(res, err); }
    if(!node) { return res.send(404); }
    var updated = _.merge(node, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, node);
    });
  });
};

// Deletes a node from the DB.
exports.destroy = function(req, res) {
  Node.findById(req.params.id, function (err, node) {
    if(err) { return handleError(res, err); }
    if(!node) { return res.send(404); }
    node.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}