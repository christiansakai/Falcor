'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('branchAnalysis', {
        url: '/branchAnalysis',
        templateUrl: 'app/branchAnalysis/branchAnalysis.html',
        controller: 'BranchanalysisCtrl'
      });
  });