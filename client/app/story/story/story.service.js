'use strict';

angular.module('storyHubApp')
  .factory('StoryService', function (ExploreStories, socket) {

    /*
     *  zn: this feels a little iffy to me because factories are singletons
     *  this means that your angular app only has one of them. I think if your
     *  factory returned a class whos instances had these properties, that would be better
     *  With this method, your user can only look at one story at once. While this may be
     *  fine for now, you could imagine schenarios in which your angular app had to think 
     *  about two stories
     */

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
              // console.log('results', results);
              cb(results)
          });
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
      // console.log('hitting StoryService', data)

      angular.copy(data.currentUsers, Story.currentUsers);
      // console.log('Story.title', Story.title)
    })


    return Story;
  });
