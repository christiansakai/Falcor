'use strict';

angular.module('storyHubApp')
  .controller('ExploreCtrl', function ($scope, ExploreStories, Auth, NodeService, StoryService, socket, $state) {
    $scope.message = 'Hello';

    $scope.stories = ExploreStories.getStories.query({ firstNode: true, isPrivate: false });
    // api/nodes?firstNode=true&isPrivate=false


    var vm = this; 
    $scope.username = Auth.getCurrentUser().name
  
    //final cut of function will pass in the roomId
  	$scope.joinStory = function(storyId){   
      console.log('in event', storyId)
      ExploreStories.storiesInfo.storyId = storyId
      var data = {
      	// roomId: '5474e5ec7ef8165d7c7312c2', 
        storyId: storyId, 
        username: $scope.username 
      }

      // ExploreStories.storiesInfo.storyId = storyId

        socket.socket.emit('joinRoom', data)
        $state.go('story')
  	}

    //register those who have joined the room
    socket.socket.on('joinedRoom', function(data) {
      console.log(data)
    })


  });
