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
        // $scope.nodes = results
    		// console.log('results: ', results)
    	})
    }

    $scope.joinStory = function(story){
      console.log(story)
      var storyId = story.storyId._id;
      var nodeId = story._id;
      $state.go('story.graph2', {storyId: storyId, nodeId: nodeId})
    }

    $scope.submitKeywords = function(){
      // console.log('im hit! keywords: ', $scope.keywords)
      ExploreStories.submitKeywords($scope.keywords, function(results){
        $scope.stories = results;
        $scope.currentStories = $scope.stories.slice(0, 10);
        console.log('keyword results: ', results)
      })
    }



    $scope.changePage = function(){
      console.log($scope.currentPage)
      var currentIndex = $scope.currentPage - 1;
      var start = currentIndex*10;
      var end = start + 10
      $scope.currentStories = $scope.stories.slice(start, end)
      window.scrollTo(0, 0)
      console.log($scope.currentStories)
    }

    $scope.goToStory = function(storyId){
    	StoryService.id = storyId; 
    	// console.log('id: ', StoryService.getData())
      var data = {
        storyId: storyId, 
        username: $scope.username 
      }
      socket.socket.emit('joinRoom', data)
      setTimeout(function(){
        $state.go('story.graph', {storyId: storyId})
      }, 0) 

    }

    //register those who have joined the room
    socket.socket.on('joinedRoom', function(data) {
      console.log(data)
    })

    vm.getMyNodes()

  });
