'use strict';

var _ = require('lodash');
var AlchemyAPI = require('alchemy-api'); 
var config = require('./../../config/environment/index.js'); 
var alchemyApiKey = config.alchemy.apiKey; 
var alchemy = new AlchemyAPI(alchemyApiKey);
var Q = require('q'); 
var async = require('async');


// Get list of alchemys
exports.sentiment = function(req, res) {
  console.log('HITTTTTT!!!!!!')
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

//figure out how to execute all api calls 
exports.sentimentsArray = function(req, res){
  // console.log('text: ', req.body)
  var sentimentsArr = [];
  var keywordsArr = [];  
  var finalArr = []
  var branchText = req.body.branchText; 
  console.log('branch: ', branchText)

  var alchemyForOneItem = function(oneText, doneAlchemyForOneItem) {
    var apiCallOne = function(doneAPICallOne){
      console.log('inside apiCallOne');
      alchemy.sentiment(oneText, {}, function(err, response){
        sentimentsArr.push(response)
        doneAPICallOne(err, 'done with one')
      })
    }

    var apiCallTwo = function(doneAPICallTwo){
      console.log('inside apiCallTwo');
      alchemy.keywords(oneText, {}, function(err, response) {
        keywordsArr.push(response)
        doneAPICallTwo(err, 'done with two')
      });
    }

    async.series([apiCallOne, apiCallTwo], function(err, results) {
      console.log('inside alchemyForOneItem');
      doneAlchemyForOneItem(err);
    });

  };

  var doneAlchemyForAllItem = function(err) {
    finalArr.push(sentimentsArr, keywordsArr);
    console.log(finalArr);
    res.json(200, finalArr);
  };

  async.each(branchText, alchemyForOneItem, doneAlchemyForAllItem)
}


function handleError(res, err) {
  return res.send(500, err);
}