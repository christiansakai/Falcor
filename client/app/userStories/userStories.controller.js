'use strict';

angular.module('storyHubApp')
  .controller('UserstoriesCtrl', function ($scope, ExploreStories, socket, $state, Auth, StoryService) {

    var vm = this; 

    $scope.username = Auth.getCurrentUser().name

    vm.getMyNodes = function(){
    	ExploreStories.getUserNodes(function(results){
    		$scope.myStories = results.stories
    		console.log('results: ', results.stories)
    	})
    }

    $scope.goToStory = function(storyId){
    	StoryService.setData(storyId)
    	console.log('id: ', StoryService.getData())
      var data = {
        storyId: storyId, 
        username: $scope.username 
      }
      socket.socket.emit('joinRoom', data)
      setTimeout(function(){
        $state.go('story', {storyId: storyId})
      }, 0) 

    }

    //register those who have joined the room
    socket.socket.on('joinedRoom', function(data) {
      console.log(data)
    })

    vm.getMyNodes()

  });
