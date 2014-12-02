'use strict';

angular.module('storyHubApp')
  .controller('CreatestoryCtrl', function ($scope, $http, Auth, socket, NodeService, StoryService) {
    $scope.message = 'Hello';
    $scope.isPrivate = false;

    var vm = this; 

    $scope.story = {
        title: '',
        input: '',
        isPrivate: $scope.isPrivate,
        userId: Auth.getCurrentUser()._id,
        username: Auth.getCurrentUser().name
    }

    // $scope.username = Auth.getCurrentUser().name
    // $scope.userId = Auth.getCurrentUser()._id

    vm.startStory = function(){
      console.log($scope.story)
      var obj = $scope.story;
        socket.socket.emit('newStory', obj)
    }

      //register those who have joined the room
      //we'll have to remember to reset this --- wiring for switching between stories/rooms
    socket.socket.on('StoryCreated', function(data) {
      NodeService.nodes.push(data.firstNode);
      StoryService.title = data.story.name;
      StoryService.id = data.story._id;
      console.log(data)
      console.log(StoryService)
    })




  });
