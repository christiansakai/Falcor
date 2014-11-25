'use strict';

angular.module('storyHubApp')
  .controller('LandingCtrl', function ($scope, Auth, socket) {

  	var vm = this; 
    $scope.username = Auth.getCurrentUser().name
    console.log(Auth.getCurrentUser())
    // console.log('socket', socket)

    //final cut of function will pass in the roomId
  	vm.joinStory = function(){
      console.log('in event')
      var data = {
        roomId: '5474e5ec7ef8165d7c7312c2', 
        username: $scope.username 
      }
        socket.socket.emit('joinRoom', data)
  	}

    //register those who have joined the room
    socket.socket.on('joinedRoom', function(data) {
      console.log('im here', data)
    })

  	vm.joinStory = function(roomTitle){
  		var socket = io(); 
  		//create function that sets the story name 
  		io.sockets.on('connection', function(socket){
  			socket.join('roomTitle')
  		})
  	}

  	vm.startStory = function(storyName){
      var obj = {
        name: storyName
      }
  		socket.socket.emit('newStory', obj, username)
  	}
  })
  	.controller('WriteStoryCtrl', function ($scope){
  		var vm = this;

      $scope.nodes = []

      // vm.getNodes = function(){
      //   nodeService.getNodes(function(result){
      //     $scope.nodes = result
      //   })
      // }

  		//every node in every story will have a submit button that's hooked up to a click event 
  		vm.submitWriting = function(text, parentId, roomId){

        //$scope.data = data; 

        //add this node to the children array 
        var obj = {
          text: text,
          author: Auth.getCurrentUser()._id
        }
  			
  			io.sockets.on('connection', function(socket){
  				socket.emit('nodeAdded', obj, parentId, roomId)
  			})

        io.sockets.on('addNodeToDom', function(node){
          //add node to dom
        })
  		}

  		vm.createStory = function(storyName){
	  		var socket = io('/name-of-story')
	  				
  		}



  	});


  	// socket.on('notificaton')
