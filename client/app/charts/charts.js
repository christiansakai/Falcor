'use strict';

angular.module('storyHubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('charts', {
        url: '/charts',
        templateUrl: 'app/charts/charts.html',
        controller: 'ChartsCtrl as chart'
      })
      .state('charts.wordsPerStory', {
      	url: '/wordsPerStory',
        templateUrl: 'app/charts/wordsPerStory.html',
        controller: 'ChartsCtrl as chart'
      })
	    .state('story.charts.numLikes', {
	    	url: '/numLikes',
	      templateUrl: 'app/charts/numLikes.html',
	      controller: 'ChartsCtrl as chart'
	    })
	    .state('story.charts.authorsByWordCount', {
	    	url: '/authorWordCount',
	      templateUrl: 'app/charts/authorsByWordCount.html',
	      controller: 'ChartsCtrl as chart'
	    })
      .state('story.charts.wordsPerNode', {
        url: '/wordsPerNode',
        templateUrl: 'app/charts/wordsPerNode.html',
        controller: 'ChartsCtrl as chart'
      })
       .state('story.charts.likesPerStory', {
        url: '/likesPerStory',
        templateUrl: 'app/charts/likesPerStory.html',
        controller: 'ChartsCtrl as chart'
      })
  });