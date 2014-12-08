'use strict';

angular.module('storyHubApp')
  .controller('StoryCtrl', function ($scope, NodeService, StoryService, Auth, socket, ExploreStories, $stateParams, $modal, growl) {

    // this line sets the storyId that we send from the explore controller so that
    // if you refresh the page, the id for the get request is not lost
    StoryService.id = $stateParams.storyId


    $scope.nodes = NodeService;

    //story id is stored 
    $scope.story = StoryService;

    //wire up by retrieving the current story id -- StoryService.id 

    $scope.userId = Auth.getCurrentUser()._id
  });