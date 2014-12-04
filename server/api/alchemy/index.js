'use strict';

var express = require('express');
var alchemy = require('./alchemy.controller');
var AlchemyAPI = require('alchemy-api');

var router = express.Router();

router.post('/', alchemy.sentiment);
router.post('/keywords', alchemy.keywords);
router.post('/concepts', alchemy.concepts);


module.exports = router;