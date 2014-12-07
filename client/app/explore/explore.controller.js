'use strict';

angular.module('storyHubApp')
  .controller('ExploreCtrl', function ($scope, ExploreStories, Auth, NodeService, StoryService, socket, $state) {
    var vm = this;
    // cons
    $scope.stories = ExploreStories.getStories.query({ firstNode: true, isPrivate: false });
    // api/nodes?firstNode=true&isPrivate=false
    console.log($scope.stories)
    $scope.username = Auth.getCurrentUser().name

    $scope.keywords = "";


    //final cut of function will pass in the roomId
  	$scope.joinStory = function(story){
      console.log(story)
      // ExploreStories.storiesInfo.storyId = storyId

      StoryService.id = story._id;
      StoryService.title = story.name;
      var data = {

        storyId: StoryService.id,
        username: Auth.getCurrentUser().name
      }
      // socket.socket.emit('joinRoom', data)
    

      $state.go('story.graph', {storyId: data.storyId, storyTitle: StoryService.title})

    }

    $scope.submitKeywords = function(){
      // console.log('im hit! keywords: ', $scope.keywords)
      ExploreStories.submitKeywords($scope.keywords, function(results){
        $scope.stories = results;
        console.log('keyword results: ', results)
      })
    }

    //register those who have joined the room
    // socket.socket.on('joinedRoom', function(data) {
    //   console.log(data)
    // })

})
  .directive('ngEnter', function(){
    return function(scope, element, attrs){
      element.bind('keydown keypress', function(event){
        if (event.which === 13){
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter, {'event': event});
          });
          event.preventDefault();
        }
      });
    };
  });
