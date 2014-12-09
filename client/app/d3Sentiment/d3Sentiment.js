'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story.charts.sentiment', {
        url: '/storySentiment',
        templateUrl: 'app/d3Sentiment/d3Sentiment.html',
        controller: 'D3sentimentCtrl'
      })
      .state('story.branchCharts.branchSentiment', {
        url: '/branchSentiment',
        templateUrl: 'app/d3Sentiment/d3Sentiment.html',
        controller: 'D3sentimentCtrl'
      })
  });