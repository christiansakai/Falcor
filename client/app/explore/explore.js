'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('explore', {
        url: '/explore',
        templateUrl: 'app/explore/explore.html',
        controller: 'ExploreCtrl'
      });
  });