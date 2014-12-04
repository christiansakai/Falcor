'use strict';

var _ = require('lodash');
var AlchemyAPI = require('alchemy-api'); 
var config = require('./../../config/environment/index.js'); 
var alchemyApiKey = config.alchemy.apiKey; 
var alchemy = new AlchemyAPI(alchemyApiKey);
var Q = require('q'); 


// Get list of alchemys
exports.sentiment = function(req, res) {
  console.log('body: ', req.body.text)
  alchemy.sentiment(req.body.text, {}, function (err, response) {
    if(err) throw err;
    console.log('res: ', response)
    res.json(response.docSentiment);
  });
};

// Get a single alchemy
exports.keywords = function(req, res) {
  alchemy.keywords(req.body.text, {}, function (err, response) {
    if(err) throw err;
    res.json(response.keywords);
  });
};

// Creates a new alchemy in the DB.
exports.concepts = function(req, res) {
  alchemy.concepts(req.body.text, {}, function(err, response) {
    if(err) throw err;
    res.json(response.concepts);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}