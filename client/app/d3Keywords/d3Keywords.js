'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('d3Keywords', {
        url: '/d3Keywords',
        templateUrl: 'app/d3Keywords/d3Keywords.html',
        controller: 'D3keywordsCtrl'
      });
  });