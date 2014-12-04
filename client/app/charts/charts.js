'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('charts', {
        url: '/charts',
        templateUrl: 'app/charts/charts.html',
        controller: 'ChartsCtrl'
      });
  });