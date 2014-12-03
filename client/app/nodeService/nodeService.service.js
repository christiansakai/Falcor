'use strict';

angular.module('storyHubApp')
  .factory('NodeService', function ($http) {
    
  	var Node = {
  		nodes: [], 
  		wordCount: []
  	}

  	return Node

  });
