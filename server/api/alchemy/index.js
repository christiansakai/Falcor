'use strict';

var express = require('express');
var alchemy = require('./alchemy.controller');
var AlchemyAPI = require('alchemy-api');

var router = express.Router();

router.post('/', alchemy.sentiment);
router.post('/keywords', alchemy.keywords);
router.post('/sentimentsArray', alchemy.sentimentsArray)


module.exports = router;