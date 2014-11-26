'use strict';

angular.module('storyHubApp')
  .controller('CreatestoryCtrl', function ($scope, $http, Auth, socket, NodeService, StoryService) {
    $scope.message = 'Hello';

    var vm = this; 

    $scope.story = {
        input: '',
        isPrivate: false
    }

    $scope.username = Auth.getCurrentUser().name
    $scope.userId = Auth.getCurrentUser()._id

    console.log(Auth.getCurrentUser())

    vm.startStory = function(){

      var obj = {
        name: $scope.story.input, 
        author: $scope.userId
        // isPrivate: $scope.story.isPrivate,  
        // username: $scope.username
      }
        socket.socket.emit('newStory', obj)
    }

      //register those who have joined the room
    socket.socket.on('StoryCreated', function(data) {
      NodeService.nodes.push(data.firstNode);
      StoryService.title = data.story.name;
      StoryService.id = data.story._id;
      console.log(data)
      console.log(StoryService)
    })



    $scope.createStory = function(){
    	// console.log($scope.story.input)
    	$http.post('/api/nodes/', {story: $scope.story}).success(function(story){
    		console.log(story);
    	})
    }


  });
