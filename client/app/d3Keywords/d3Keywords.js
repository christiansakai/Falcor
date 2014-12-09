'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story.charts.storyKeywords', {
        url: '/storyKeywords',
        templateUrl: 'app/d3Keywords/d3Keywords.html',
        controller: 'D3keywordsCtrl'
      })
      .state('story.branchCharts.branchKeywords', {
        url: '/branchKeywords',
        templateUrl: 'app/d3Keywords/d3Keywords.html',
        controller: 'D3keywordsCtrl'
      });

  });