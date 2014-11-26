'use strict';

angular.module('storyHubApp')
  .controller('CreatestoryCtrl', function ($scope, $http, Auth, socket) {
    $scope.message = 'Hello';

    var vm = this; 

    $scope.story = {
        input: '',
        isPrivate: false
    }

    $scope.username = Auth.getCurrentUser().name

    vm.startStory = function(){

      var obj = {
        name: $scope.story.input
        // isPrivate: $scope.story.isPrivate,  
        // username: $scope.username
      }
        socket.socket.emit('newStory', obj)
    }

      //register those who have joined the room
    socket.socket.on('StoryCreated', function(data) {
      console.log(data)
    })



    $scope.createStory = function(){
    	// console.log($scope.story.input)
    	$http.post('/api/nodes/', {story: $scope.story}).success(function(story){
    		console.log(story);
    	})
    }


  });
