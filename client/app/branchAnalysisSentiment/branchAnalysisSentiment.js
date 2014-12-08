'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('branchAnalysisSentiment', {
        url: '/branchAnalysisSentiment',
        templateUrl: 'app/branchAnalysisSentiment/branchAnalysisSentiment.html',
        controller: 'BranchanalysissentimentCtrl'
      });
  });