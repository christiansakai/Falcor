'use strict';

angular.module('storyHubApp')
  .factory('StoryService', function () {
    
    
    var Story = {
      id: ''
    }

    return {
    	getData: function(){
    		return Story.id; 
    	}, 
    	setData: function(id){
    		Story.id = id
    	}
    };

  });
