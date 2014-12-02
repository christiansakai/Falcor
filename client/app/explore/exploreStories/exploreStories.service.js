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
  	    }

    	
    }

    return ExploreStories;
  });
