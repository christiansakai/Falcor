/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

console.log('sockets', socketio.sockets)

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// //array of users
// var usernames = {}; 
// //array of rooms 
// var rooms = [];

// //add socket to user document
// //User.findByIdAndUpdate(req.user._id, {$push: {sockets: socket}}, function(err, user))...
// //{}

// io.sockets.on('connection', function(socket){
// 	//addUser click event 
// 	socket.on('addUser', function(username){
// 		//store username in the socket session for this client
// 		socket.username = username; 
// 		usernames[username] = username;
// 		//store the room name in the socket session for this client
// 		socket.room = 'room1' // add object here

// 	})
// })

// //to broadcast information to all sockets in a given room 
// //io.sockets.in('roomNum').emit('function', 'data1', 'data2'); 

// Expose app
exports = module.exports = app;