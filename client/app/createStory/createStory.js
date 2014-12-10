'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createStory', {
        url: '/createStory',
        templateUrl: 'app/createStory/createStory.html',
        controller: 'CreatestoryCtrl as create',
        authenticate: true
      })
      .state('firstLine', {
        url: '/firstLine',
        templateUrl: 'app/createStory/firstLine.html',
        controller: 'CreatestoryCtrl as create',
        authenticate: true
      });
  });