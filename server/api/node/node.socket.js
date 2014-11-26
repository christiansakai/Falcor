/**
 * Broadcast updates to client when the model changes
 */


'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Story = require('../story/story.model'); 
var Node = require('./node.model');

exports.register = function(socketio) {
		//join room functionality

		socketio.on('connection', function(socket) {
			socket.on('joinRoom', function(data){
				if (socket.rooms.length){
					socket.rooms.forEach(function(room){
						socket.leave(room)
					})
				}
				console.log('io', socketio.to)
				socket.join(data.roomId)
				var username = data.username; 
	    	socketio.to(data.roomId).emit('joinedRoom', {username: username + ' joined!'});
			})

			socket.on('newStory', function(obj){
				//then want to create a story here 
				Story.create(obj, function(err, story){
						socket.join(story._id)
						socketio.to(story._id).emit('StoryCreated', story)
				})
			})

			socket.on('nodeAdded', function(obj){
				obj._id = mongoose.Types.ObjectId();

				Node.findByIdAndUpdate(obj.parentId, {$push: {children: obj._id}}, function(err, parentNode){
					obj.ancestors = parentNode.ancestors;
					obj.ancestors.push(parentNode._id);
					obj.parentId = parentNode._id;
					obj.storyId = parent.storyId;
					Node.create(obj, function(err, newNode){
						socketio.to(obj.roomId).emit('addNodeToDom', newNode)
					})
				})
			})	
		})

		

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


// Expose app