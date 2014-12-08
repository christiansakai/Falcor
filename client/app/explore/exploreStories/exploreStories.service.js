'use strict';

angular.module('storyHubApp')
  .factory('ExploreStories', function ($resource, $http) {
    // Service logic
    // ...

    var ExploreStories = {

  	    getStories: $resource('/api/nodes'),

  	    storiesInfo: {
  	    	storyId: ''
  	    },
  	    getNodes: function(obj, callback){
  		    $http.get('/api/nodes/getNodes/', {params: obj}).success(callback)    	
  	    },  
        getUserNodes: function(obj, callback){
          $http.get('/api/users/getUserNodes/', {params: obj}).success(callback)
        }, 

        rateNodes: function(nodeId, obj, callback){
          $http.put('/api/nodes/rateNodes/' + nodeId + '/', obj).success(callback)
        }, 

        submitKeywords: function(keyword, callback){
          $http.get('/api/' + keyword + '/').success(callback)
          // ?? $http.get('/api/nodes/' + keyword + '/').success(callback) ??
        },

        getTopNodes: function( callback) {
          $http.get('/api/nodes/getTopNodes/').success(callback)
        }
	    }

    return ExploreStories;
  });
