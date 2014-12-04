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
        templateUrl: 'app/charts/linewordsPerStory.html',
        controller: 'ChartsCtrl'
      })
	    .state('charts.numLikes', {
	    	url: '/numLikes',
	      templateUrl: 'app/charts/lineNumLikes.html',
	      controller: 'ChartsCtrl'
	    })
	    .state('charts.authorByWordCount', {
	    	url: '/authorWordCount',
	      templateUrl: 'app/charts/authorsByWordCount.html',
	      controller: 'ChartsCtrl'
	    })
  });