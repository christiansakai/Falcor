'use strict';

angular.module('storyHubApp')
  .controller('ExploreCtrl', function ($scope, ExploreStories, Auth, NodeService, StoryService, socket, $state) {
    var vm = this; 

    $scope.stories = ExploreStories.getStories.query({ firstNode: true, isPrivate: false });
    // api/nodes?firstNode=true&isPrivate=false
    $scope.username = Auth.getCurrentUser().name
  
    //final cut of function will pass in the roomId
  	$scope.joinStory = function(storyId){   
      // ExploreStories.storiesInfo.storyId = storyId
      StoryService.setData(storyId)
      var data = {
        storyId: storyId, 
        username: $scope.username 
      }
      socket.socket.emit('joinRoom', data)
      $state.go('story', {storyId: storyId})
  	}

    //register those who have joined the room
    socket.socket.on('joinedRoom', function(data) {
      console.log(data)
    })
  });
