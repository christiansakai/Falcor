'use strict';

angular.module('storyHubApp')
  .controller('ExploreCtrl', function ($scope, ExploreStories, Auth, NodeService, StoryService, socket, $state) {
    var vm = this;
    vm.getNodes = function(){
      var obj = {
        firstNode: true, 
        isPrivate: false
      }

      ExploreStories.getStories(obj, function(results){
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
      StoryService.id = story._id;
      StoryService.title = story.name;
      var data = {
        storyId: StoryService.id,
        username: Auth.getCurrentUser().name
      }
      $state.go('story.graph', {storyId: data.storyId, storyTitle: StoryService.title})

    }

    $scope.submitKeywords = function(){
      ExploreStories.submitKeywords($scope.keywords, function(results){
        $scope.stories = results;
        $scope.currentStories = $scope.stories.slice(0, 10);
        console.log('keyword results: ', results)
      })
    }

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
