'use strict';

angular.module('storyHubApp')
  .controller('UserstoriesCtrl', function ($scope, ExploreStories, socket, $state, Auth, StoryService) {

    var vm = this; 

    $scope.username = Auth.getCurrentUser().name
    $scope.userId = Auth.getCurrentUser()._id

    vm.getMyNodes = function(){
      var obj = {
        id: $scope.userId
      }
    	ExploreStories.getUserNodes(obj, function(results){
    		$scope.myStories = results.stories
        $scope.nodes = results
    		console.log('results: ', results)
    	})
    }

    $scope.goToStory = function(storyId){
    	StoryService.id = storyId; 
    	// console.log('id: ', StoryService.getData())
      var data = {
        storyId: storyId, 
        username: $scope.username 
      }
      socket.socket.emit('joinRoom', data)
      setTimeout(function(){
        $state.go('story.graph', {storyId: storyId})
      }, 0) 

    }

    //register those who have joined the room
    socket.socket.on('joinedRoom', function(data) {
      console.log(data)
    })

    vm.getMyNodes()

  });
