'use strict';

angular.module('storyHubApp')
  .directive('topStories', function () {
    return {
      templateUrl: 'app/explore/topStories/topStories.html',
      restrict: 'E',
      // <CONTROLLER>
      controller: function($scope, $state, ExploreStories) {
        

        $scope.topStories = [];
        

        ExploreStories.getTopNodes(function(results) {
        	$scope.topStories = results;	

          console.log('res: ', results)
        });
        
        
        $scope.goToThisStoryBranch = function(topStory) {
    		// console.log('Redirecting user to top story:', topStory)

	    	var storyId = topStory.storyId._id;
	    	var nodeId = topStory._id;

   			$state.go('story.graph2', {storyId: storyId, nodeId: nodeId})
        }
    

      }
      // </CONTROLLER>
    };
  })
