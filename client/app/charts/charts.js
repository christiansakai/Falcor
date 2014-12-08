'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('charts', {
        url: '/charts',
        templateUrl: 'app/charts/charts.html',
        controller: 'ChartsCtrl'
      })
      .state('charts.wordsPerStory', {
      	url: '/wordsPerStory',
        templateUrl: 'app/charts/wordsPerStory.html',
        controller: 'ChartsCtrl'
      })
	    .state('charts.numLikes', {
	    	url: '/numLikes',
	      templateUrl: 'app/charts/numLikes.html',
	      controller: 'ChartsCtrl'
	    })
	    .state('charts.authorsByWordCount', {
	    	url: '/authorWordCount',
	      templateUrl: 'app/charts/authorsByWordCount.html',
	      controller: 'ChartsCtrl'
	    })
      .state('charts.wordsPerNode', {
        url: '/wordsPerNode',
        templateUrl: 'app/charts/wordsPerNode.html',
        controller: 'ChartsCtrl'
      })
  });