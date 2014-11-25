'use strict';

angular.module('storyHubApp')
  .controller('CreatestoryCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.storyText = '';

    $scope.isPrivate = false;

    $scope.createStory = function(){
    	console.log($scope.storyText)
    }

  });
