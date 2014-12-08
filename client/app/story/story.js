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
        // params: ['storyTitle'],
        url: '/graph',
        templateUrl: 'app/story/graph.html',
        controller: 'GraphCtrl as graph',
        authenticate: true
        })
      .state('story.graph2', {
        // params: ['storyTitle'],
        url: '/graph/:nodeId',
        templateUrl: 'app/story/graph.html',
        controller: 'GraphCtrl as graph',
        authenticate: true
        });
  });