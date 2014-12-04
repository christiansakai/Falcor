/**
 * Broadcast updates to client when the model changes
 */


'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Story = require('../story/story.model'); 
var Node = require('./node.model');
var User = require('../user/user.model');
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
				console.log('storyID: ', story._id)
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

					console.log('first node with storyID: ', firstNode)
					var userStory = {
						id: story._id, 
						title: obj.title
					}
					//User.findByIdAndUpdate(obj.userId, {$push: {stories: userStory}})
					User.findByIdAndUpdate(obj.userId, {$push: {stories: userStory}}, function(err, user){
						console.log('id: ', obj.userId)
						if (err) {console.log('error!: ', err)}
						// user.stories.push(userStory)
						user.save(function (err, newUser, numModified){
							// console.log('user: ', user, 'story: ', userStory, 'saved?: ', numModified)							
						})
					})
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
				obj.author = obj.author;
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

			User.findOne({'email': obj.email}, function(err, user){
				if (err) {return; }
				if (!user) {return; }
				//if the email address given matches that of a user, add the story to the
				//user's stories array
				user.stories.push(obj.storyId)
			})

			var options = {
          from: 'falkorapp@gmail.com',
          to: obj.email,
          subject: 'You have been invited to join a story',
          text: 'Use this id to access the story and join in on the fun: ' + obj.storyId
        }
      console.log('nodemailerConfig', options)
      nodemailerConfig.transporter.sendMail(options, function(error, info){

        var success = false;
        if(error){
          success = false;
          console.log(error);
        }else{
          success = true;
          console.log('Message sent: ' + info.response);
        }
        // nodemailerConfig.transporter.close();
        obj.success = success;
        // socketio.to(obj.storyId).emit('sentInvite', obj)
        socket.emit('sentInvite', obj)
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