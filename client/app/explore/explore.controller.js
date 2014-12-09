'use strict';

angular.module('storyHubApp')
  .controller('ExploreCtrl', function ($scope, ExploreStories, Auth, NodeService, StoryService, socket, $state) {
    var vm = this;
    // cons
    // $scope.stories = ExploreStories.getStories.query({ firstNode: true, isPrivate: false });
    
    // console.log('loaded stories: ', $scope.stories[0])
    // api/nodes?firstNode=true&isPrivate=false
    // console.log($scope.stories)

    vm.getNodes = function(){
      var obj = {
        firstNode: true, 
        isPrivate: false
      }

      ExploreStories.getStories(obj, function(results){
        console.log('results :', results)
        $scope.stories = results;
        $scope.currentStories = $scope.stories.slice(0, 10)
      })
    }

    $scope.username = Auth.getCurrentUser().name

    $scope.currentPage = 0;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo - 1;
    };

    $scope.pageSize = 10;

    $scope.changePage = function(){
      console.log($scope.currentPage)
      var currentIndex = $scope.currentPage - 1;
      var start = currentIndex*10;
      var end = start + 10
      $scope.currentStories = $scope.stories.slice(start, end)
      window.scrollTo(0, 0)
      console.log($scope.currentStories)
    }



    $scope.keywords = "";

    //final cut of function will pass in the roomId
  	$scope.joinStory = function(story){
      // console.log(story)
      // ExploreStories.storiesInfo.storyId = storyId      s
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
        $scope.currentStories = $scope.stories.slice(0, 10);
        console.log('keyword results: ', results)
      })
    }

    //register those who have joined the room
    // socket.socket.on('joinedRoom', function(data) {
    //   console.log(data)
    // })

    vm.getNodes()

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
