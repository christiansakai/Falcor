'use strict';

angular.module('storyHubApp')
  .factory('StoryService', function () {

    var Story = {
      id: '',
      title: '',
      branchFrom: '',
      getTree: function(resultArray){
      	var firstNode = _.find(resultArray, {'firstNode': true});

        function unflatten( array, parent ){
            var children = _.filter( array, function(child){ return child.parentId == parent._id; });
            if(!_.isEmpty(children)){
                 parent.children = children;
                _.each( children, function( child ){ unflatten( array, child ) } );
            }
        }

        unflatten(resultArray, firstNode);

      	return firstNode;
      }
    }

    return Story;
  });