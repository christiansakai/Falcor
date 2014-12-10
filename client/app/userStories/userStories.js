'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userStories', {
        url: '/userStories',
        templateUrl: 'app/userStories/userStories.html',
        controller: 'UserstoriesCtrl',
        authenticate: true
      });
  });