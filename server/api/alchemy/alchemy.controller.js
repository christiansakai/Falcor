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

// Creates a new alchemy in the DB.
exports.concepts = function(req, res) {
  alchemy.concepts(req.body.text, {}, function(err, response) {
    if(err) throw err;
    res.json(response.concepts);
  });
};


// //figure out how to execute all api calls 
// exports.sentimentsArray = function(req, res){
//   console.log('text: ', req.body)
//   var promisesForBranchText = []; 
//   var branchText = req.body.branchText; 
//     async.each(branchText, function (text, doneOneItemCallback){
      
//       alchemy.sentiment(text, {}, function(err, response){
//         promisesForBranchText.push(response)
//         console.log('res: ', response)
//         console.log('arr: ', promisesForBranchText)
//         doneOneItemCallback(null)
//       })
//     }, function doneAllItems() {
//     res.json(200, promisesForBranchText)
//     });
// }

var apiCallOne = function(text, doneAPICallOne){
  console.log('textHERE!!!!', text)
  alchemy.sentiment(text, {}, function(err, response){
    sentimentsArr.push(response)
    doneAPICallOne(err, 'done with one')
  })
}

var apiCallTwo = function(text, doneAPICallTwo){
  alchemy.concepts(text, {}, function(err, response) {
    conceptsArr.push(response)
    doneAPICallTwo(err, 'done with two')
  });
}

var apiCallThree = function(text, doneAPICallThree){
  alchemy.keywords(text, {}, function(err, response) {
    keywordsArr.push(response)
    doneAPICallThree(err, 'done with three')
  });
}

//figure out how to execute all api calls 
exports.sentimentsArray = function(req, res){
  // console.log('text: ', req.body)
  var sentimentsArr = [];
  var conceptsArr = []; 
  var keywordsArr = [];  
  var finalArr = []
  var branchText = req.body.branchText; 
  console.log('branch: ', branchText)
    async.each(branchText, function (text, doneOneItemCallback){
      async.series([apiCallOne, apiCallTwo, apiCallThree])
      // doneOneItemCallback(null)
    }, function doneAllItems(err, results){
      finalArr.push(sentimentsArr, conceptsArr, keywordsArr)
      res.json(200, finalArr)
    });
}


function handleError(res, err) {
  return res.send(500, err);
}