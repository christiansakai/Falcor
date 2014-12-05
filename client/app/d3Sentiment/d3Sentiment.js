'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('d3Sentiment', {
        url: '/d3Sentiment',
        templateUrl: 'app/d3Sentiment/d3Sentiment.html',
        controller: 'D3sentimentCtrl'
      });
  });