'use strict';

angular.module('storyHubApp')
  .controller('ExploreCtrl', function ($scope, ExploreStories) {
    $scope.message = 'Hello';

    $scope.stories = ExploreStories.query({ firstNode: true, isPrivate: false });
    // api/nodes?firstNode=true&isPrivate=false
  });
