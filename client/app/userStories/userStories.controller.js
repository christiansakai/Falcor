'use strict';

angular.module('storyHubApp')
  .controller('UserstoriesCtrl', function ($scope, ExploreStories, socket, $state, Auth, StoryService) {

    var vm = this; 

    $scope.currentPage = 0;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo - 1;
    };

    $scope.pageSize = 10;

    $scope.username = Auth.getCurrentUser().name
    $scope.userId = Auth.getCurrentUser()._id

    vm.getMyNodes = function(){
      var obj = {
        id: $scope.userId
      }
    	ExploreStories.getUserNodes(obj, function(results){
    		$scope.stories = results;
        $scope.currentStories = $scope.stories.slice(0, 10)
    	})
    }

    $scope.joinStory = function(story){
      //zn: this doesn't feel awesome. maybe story could have a method
      //on its prototype that would give that hash you need?
      //also, I don't know the solution, but things like `story.storyId._id` feel weird
      var storyId = story.storyId._id;
      var nodeId = story._id;
      $state.go('story.graph2', {storyId: storyId, nodeId: nodeId})
    }

    $scope.submitKeywords = function(){
      ExploreStories.submitKeywords($scope.keywords, function(results){
        $scope.stories = results;
        $scope.currentStories = $scope.stories.slice(0, 10);
      })
    }



    $scope.changePage = function() {
      var currentIndex = $scope.currentPage - 1;
      var start = currentIndex*10;
      var end = start + 10
      $scope.currentStories = $scope.stories.slice(start, end)
      window.scrollTo(0, 0)
    }

    $scope.goToStory = function(storyId){
    	StoryService.id = storyId; 
      var data = {
        storyId: storyId, 
        username: $scope.username 
      }
      socket.socket.emit('joinRoom', data)
      //zn: you should use `$timeout`
      setTimeout(function(){
        $state.go('story.graph', {storyId: storyId})
      }, 0) 

    }

    //register those who have joined the room
    socket.socket.on('joinedRoom', function(data) {
      // what is this for?
    })

    vm.getMyNodes()

  });
