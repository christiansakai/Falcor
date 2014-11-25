/**
 * Broadcast updates to client when the model changes
 */


'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Story = require('../story/story.model').schema; 
var Node = require('./node.model');
// var server = require('http').createServer(app);
// var socketio = require('socket.io')(server, {
//   serveClient: (config.env === 'production') ? false : true,
//   path: '/socket.io-client'
// });

exports.register = function(socketio) {
	//this is broken... undefined 
	// socket.on('connection', function(socket){

		//join room functionality

		socketio.on('connection', function(socket) {
			socket.on('joinRoom', function(data){
				if (socket.rooms.length){
					socket.rooms.forEach(function(room){
						socket.leave(room)
					})
				}
				socket.join(data.roomId)
				var username = data.username; 
	    	socketio.to(data.roomId).emit('joinedRoom', {username: ' joined!'});
			})

			socket.on('newStory', function(obj, username){
				//then want to create a story here 
				Story.create(obj, function(err, story){
						socket.join(story._id)
						socket.to(story._id).emit(username + ' joined')
				})
			})

			socket.on('nodeAdded', function(obj, parentId, roomId){
				obj._id = mongoose.Types.ObjectId();

				Node.findByIdAndUpdate(parentId, {$push: {children: obj._id}}, function(err, parentNode){
					obj.ancestors = parentNode.ancestors;
					obj.ancestors.push(parentNode._id);
					obj.parentId = parentNode._id;
					obj.storyId = parent.storyId;
					Node.create(obj, function(err, newNode){
						socket.to(roomId).emit('addNodeToDom', newNode)
					})
				})
			})	
		})

		

	// })

  Node.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Node.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('node:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('node:remove', doc);
}



// //to broadcast information to all sockets in a given room 
// //io.sockets.in('roomNum').emit('function', 'data1', 'data2'); 

// Expose app