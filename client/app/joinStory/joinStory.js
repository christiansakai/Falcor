'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('joinStory', {
        url: '/joinStory',
        templateUrl: 'app/joinStory/joinStory.html',
        controller: 'JoinstoryCtrl',
        authenticate: true
      });
  });