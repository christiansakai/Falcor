'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story.charts.branchKeywords', {
        url: '/branchKeywords',
        templateUrl: 'app/branchAnalysis/branchAnalysis.html',
        controller: 'BranchanalysisCtrl'
      });
  });