'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story', {
        url: '/story',
        templateUrl: 'app/story/story.html',
        controller: 'StoryCtrl'
      });
  });