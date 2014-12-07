'use strict';

var _ = require('lodash');
var Node = require('./node.model');
var Q = require('q');
var async = require('async'); 

// Get list of nodes
exports.index = function(req, res) {
  var findCriteria = {
    firstNode: JSON.parse(req.query.firstNode),
    isPrivate: JSON.parse(req.query.isPrivate)
  };

  Node.find(findCriteria)
    .populate('storyId').populate('author')
    .exec(function (err, nodes) {
    if(err) { return handleError(res, err); }
    return res.json(200, nodes);
  });
};

// Get list of nodes
exports.getNodesForStories = function(req, res) {
  var promiseForNodesArr = [];
  var backUpArr = [];
  // check if it is not an array
  //if not array, push req.query into the array 
  if (!Array.isArray(req.query.storyIds)){
    backUpArr.push(req.query.storyIds)
    req.query.storyIds = backUpArr; 
  }
  var storyIds = req.query.storyIds;
  storyIds.forEach(function(storyId){
    var promiseForNodes = Node.find({storyId: storyId}).exec();
    promiseForNodesArr.push(promiseForNodes);
  })
  Q.all(promiseForNodesArr).then(function(storyNodes){
    res.json(storyNodes);
  })
};

//get nodes with no children for alchemy branch analysis 
exports.getChildlessNodes = function(req, res){
  console.log('in here')
  Node.find({storyId: req.query.storyId})
    .populate('ancestors', 'text')
    .exec(function(err, nodes){
    console.log('nodes: ', nodes)
    var childlessNodesArr = nodes.reduce(function(childlessNodes, currentNode){

      if(currentNode.children.length === 0){
        childlessNodes.push(currentNode)
      }
      return childlessNodes;  
    }, [])
    res.json(200, childlessNodesArr)
  })
}

// Get list of nodes
exports.getNodes = function(req, res) {
  Node.find({storyId: req.query.storyId})
      .sort('date')
      .populate('author','name')
      .exec(function(err, nodes) {
        if(err) { return handleError(res, err); }
        // console.log('here2', nodes)
        return res.json(200, nodes);
      });
};

// Get list of storys that match keywords
exports.findKeyword = function(req, res) {
  Node.find({$text: {$search: req.params.keyword}}, function (err, stories) {
    if(err) { return handleError(res, err); }
    return res.json(200, stories);
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