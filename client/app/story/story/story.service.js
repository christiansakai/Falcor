'use strict';

angular.module('storyHubApp')
  .factory('StoryService', function (ExploreStories, socket) {


    var Story = {
      currentUsers: [],
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
        // console.log('asdasd',firstNode);
      	cb(firstNode);
      }
    }

    socket.socket.on('joinedRoom', function(data){
      console.log('hitting StoryService', data)
      // Story.currentUsers = [];
      // Story.currentUsers = data.currentUsers;
      angular.copy(data.currentUsers, Story.currentUsers)
    })


    return Story;
  });