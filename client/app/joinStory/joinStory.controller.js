'use strict';

angular.module('storyHubApp')
  .controller('JoinstoryCtrl', function ($scope, $state, ExploreStories) {
    $scope.message = 'Hello';

    $scope.storyId = ''

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


  });
