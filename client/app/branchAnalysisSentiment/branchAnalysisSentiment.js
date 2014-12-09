'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story.charts.branchSentiment', {
        url: '/branchSentiment',
        templateUrl: 'app/branchAnalysisSentiment/branchAnalysisSentiment.html',
        controller: 'BranchanalysissentimentCtrl'
      });
  });