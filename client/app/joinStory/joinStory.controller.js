'use strict';

angular.module('storyHubApp')
  .controller('JoinstoryCtrl', function ($scope, $state, ExploreStories, socket, Auth) {
    $scope.message = 'Hello';

    $scope.storyId = ''
    $scope.username = Auth.getCurrentUser().name

	$scope.joinStory = function(storyId){   
    ExploreStories.storiesInfo.storyId = storyId
    var data = {
      storyId: storyId, 
      username: $scope.username 
    }

      $state.go('story.graph', {storyId: storyId})
	}


  });
