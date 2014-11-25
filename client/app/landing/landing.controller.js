'use strict';

angular.module('storyHubApp')
  .controller('LandingCtrl', function ($scope) {

  	var vm = this; 

  	$scope.nodes = []

  	vm.getNodes = function(){
  		//put this in a factory
  	}

  	vm.joinStory = function(roomTitle){
  		var socket = io(); 
  		//create function that sets the story name 
  		io.sockets.on('connection', function(socket){
  			socket.join('roomTitle')
  		}
  	}

  	vm.startStory = function(storyName){
  		io.sockets.on('connection', function(socket){
  			socket.emit('startRoom', username, storyName)
  		})
  	}

  })



  	.controller('WriteStoryCtrl', function ($scope){
  		var vm = this;

  		//every node in every story will have a submit button that's hooked up to a click event 
  		vm.submitWriting = function(namespace){
  			//namespace = '/storyName'
  			// var nsp = io.of(namespace)
  			// nsp.on('connection', function(socket){
  			// 	socket.on('submit', function(data){
  			// 		socket.broadcast.emit('submit', data)
  			// 	})
  			// })
  			io.sockets.on('connection', function(socket){
  				socket.emit('addRoom')
  			})
  			//room title sent to server
  		}

  		vm.createStory = function(storyName){
	  		var socket = io('/name-of-story')
	  				
  		}
  	});


  	socket.on('notificaton')
