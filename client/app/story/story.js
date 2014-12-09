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
        })
      .state('story.charts', {
        // params: ['storyTitle'],
        url: '/charts',
        templateUrl: 'app/story/charts/charts.html',
        controller: 'ChartsCtrl as chart',
        authenticate: true
        })
      .state('story.charts.landing', {
        // params: ['storyTitle'],
        url: '/home',
        templateUrl: 'app/story/charts/chartHome.html',
        controller: 'ChartsCtrl as chart',
        authenticate: true
        })
      .state('story.branchCharts', {
        // params: ['storyTitle'],
        url: '/branchCharts',
        templateUrl: 'app/story/charts/branchCharts.html',
        controller: 'ChartsCtrl as chart',
        authenticate: true
        })
      .state('story.branchCharts.landing', {
        // params: ['storyTitle'],
        url: '/home',
        templateUrl: 'app/story/charts/branchChartsHome.html',
        controller: 'ChartsCtrl as chart',
        authenticate: true
        })
  });