'use strict';

angular.module('storyHubApp')
  .controller('CreatestoryCtrl', function ($scope, $http) {
    $scope.message = 'Hello';


    $scope.story = {
    	input: '',
    	isPrivate: false
    }


    $scope.createStory = function(){
    	// console.log($scope.story.input)
    	$http.post('/api/nodes/', {story: $scope.story}).success(function(story){
    		console.log(story);
    	})
    }

  });
