'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createStory', {
        url: '/createStory',
        templateUrl: 'app/createStory/createStory.html',
        controller: 'CreatestoryCtrl as create'
      });
  });