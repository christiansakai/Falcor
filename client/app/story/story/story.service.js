'use strict';

angular.module('storyHubApp')
  .factory('StoryService', function (ExploreStories) {


    var Story = {
      id: '',
      title: '',
      branchFrom: '',
      getNodes: function(cb){
        var obj = {
          storyId: this.id
        }
          ExploreStories.getNodes(obj, function(results){
              console.log('results', results);
              cb(results)
          })
      },
      getTree: function(resultArray, cb){
        // console.log('resultArray', resultArray)
      	var firstNode = _.find(resultArray, {'firstNode': true});

        function unflatten( array, parent ){
            var children = _.filter( array, function(child){ return child.parentId == parent._id; });
            if(!_.isEmpty(children)){
                 parent.children = children;
                _.each( children, function( child ){ unflatten( array, child ) } );
            }
        }

        unflatten(resultArray, firstNode);

      	cb(firstNode);
      }
    }

    return Story;
  });