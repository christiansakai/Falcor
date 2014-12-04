'use strict';

angular.module('storyHubApp')
  .controller('StoryCtrl', function ($scope, NodeService, StoryService, Auth, socket, ExploreStories, $stateParams, $modal, growl) {

    // this line sets the storyId that we send from the explore controller so that
    // if you refresh the page, the id for the get request is not lost
    StoryService.id = $stateParams.storyId


    $scope.nodes = NodeService;
    $scope.story = StoryService;

    $scope.userId = Auth.getCurrentUser()._id
  });