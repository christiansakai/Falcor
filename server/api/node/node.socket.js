/**
 * Broadcast updates to client when the model changes
 */


'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Story = require('../story/story.model'); 
var Node = require('./node.model');
var nodemailer = require('nodemailer'); 
var nodemailerConfig = require('../../config/nodemailer');



exports.register = function(socketio) {
		//join room functionality

	socketio.on('connection', function(socket) {
		//subscribe to a room 
		socket.on('joinRoom', function(data){
			if (socket.rooms.length){
				socket.rooms.forEach(function(room){
					socket.leave(room)
				})
			}
			console.log('io', socketio.to)
			socket.join(data.storyId)
    	socketio.to(data.storyId).emit('joinedRoom', {'announcement': data.username + ' joined!'});
		})

		//create a story as well as the first node in the story on this single submit action
		socket.on('newStory', function(obj){
			//then want to create a story here 
			Story.create(obj, function(err, story){
				console.log(story);
				story.name = obj.title;
				var firstNode = {}; 
				firstNode.text = obj.input; 
				firstNode.author = obj.userId;
				firstNode.storyId = story._id; 
				firstNode.firstNode = true; 
				firstNode.isPrivate = obj.isPrivate; 
				Node.create(firstNode, function(err, firstNode){
					// console.log('firstnode', firstNode)
					var data = {
						story: story, 
						firstNode: firstNode
					}
					socket.join(story._id)
					socketio.to(story._id).emit('StoryCreated', data)
				})
			})
		})

		//so this occurs every time a member submits a piece of writing
		//nodes created through this socket ping will never be first nodes  
		socket.on('nodeAdded', function(obj){
			obj._id = mongoose.Types.ObjectId();

			Node.findByIdAndUpdate(obj.parentId, {$push: {children: obj._id}}, function(err, parentNode){
				console.log('parentnode', parentNode)
				obj.ancestors = parentNode.ancestors;
				obj.ancestors.push(parentNode._id);
				obj.parentId = parentNode._id;
				obj.storyId = parentNode.storyId;
				obj.firstNode = false;
				obj.isPrivate = parentNode.isPrivate; 
				console.log('setting obj', obj)
				Node.create(obj, function(err, newNode){
					console.log('created node', newNode)
					socketio.to(obj.storyId).emit('addNodeToDom', newNode)
				})
			})
		})

		socket.on('invitingToStory', function(obj){
			var options = {
          from: 'falkorapp@gmail.com',
          to: obj.email,
          subject: 'You have been invited to join a story',
          text: 'Use this id to access the story and join in on the fun: ' + obj.storyId
        }
      console.log('nodemailerConfig', options)
      nodemailerConfig.transporter.sendMail(options, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
          }
      // nodemailerConfig.transporter.close();
      socketio.to(obj.storyId).emit('sentInvite', obj)
      console.log('obj', obj)
      });
		})
	})		
}

// function onSave(socket, doc, cb) {
//   socket.emit('node:save', doc);
// }

// function onRemove(socket, doc, cb) {
//   socket.emit('node:remove', doc);
// }


// Expose app