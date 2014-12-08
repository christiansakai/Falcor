'use strict';

var express = require('express');
var controller = require('./node.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

// router.use(auth.isAuthenticated(), function(req, res, next) {
//     next();
// });

router.get('/', controller.index);
router.get('/getNodes/', controller.getNodes);
router.get('/getTopNodes/', controller.getTopNodes);
router.get('/getNodesForStories/', controller.getNodesForStories);
router.get('/getChildlessNodes/', controller.getChildlessNodes); 
router.get('/getSingleBranch/', controller.getSingleBranch); 
router.get('/:keyword/', controller.findKeyword);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/rateNodes/:nodeId/', controller.rateNodes);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;