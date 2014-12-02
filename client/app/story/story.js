'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story', {
      	// params: ['storyId'],
        url: '/story/:storyId',
        templateUrl: 'app/story/story.html',
        controller: 'StoryCtrl',
        authenticate: true
      });
  });