'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story', {
        url: '/story/:storyId',
        templateUrl: 'app/story/story.html',
        controller: 'StoryCtrl as story',
        authenticate: true
      })
      .state('story.graph', {
        // params: ['storyId'],
        url: '/graph',
        templateUrl: 'app/story/graph.html',
        controller: 'GraphCtrl as graph',
        authenticate: true
        });
  });