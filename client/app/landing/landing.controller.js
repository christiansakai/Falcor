'use strict';

angular.module('storyHubApp')
  .controller('LandingCtrl', function ($scope, Auth, socket) {

  	var vm = this; 
    $scope.username = Auth.getCurrentUser().name
  
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
      console.log(data)
    })

    
  })
  	.controller('WriteStoryCtrl', function ($scope, nodeService){
  		var vm = this;

      $scope.nodes = []

      // vm.getNodes = function(){
      //   nodeService.getNodes(function(result){
      //     $scope.nodes = result
      //   })
      // }

  		//every node in every story will have a submit button that's hooked up to a click event 
  		// vm.submitWriting = function(text, parentId, roomId){

    //     //$scope.data = data

    //     //add this node to the array of children 
    //     var obj = {
    //       text: text,
    //       author: Auth.getCurrentUser()._id, 
    //       parentId: parentId, 
    //       roomId: roomId
    //     }
  			
  		// 	socket.socket.emit('nodeAdded', obj)
  		

    //     io.sockets.on('addNodeToDom', function(node){
    //       //add node to dom
    //       //initiate get request for all nodes associated with the story id
    //       //$scope.story = results; 
    //       //ng-repeat over results
    //     })
  		// }

  	});
