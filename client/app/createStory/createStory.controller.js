'use strict';

angular.module('storyHubApp')
  .controller('CreatestoryCtrl', function ($scope, $state, $http, Auth, socket, NodeService, StoryService, CreateService) {
    $scope.isPrivate = false;
    $scope.privacy = 'Public'

    $scope.privacyChange = function(){
      if($scope.isPrivate){
        $scope.privacy = 'Public';
      }
      else $scope.privacy = 'Private';
    }
    $scope.hasTitle = false; 

    var vm = this; 

    $scope.story = {
        title: '',
        input: ''
        // userId: Auth.getCurrentUser()._id
    }


    vm.chooseTitle = function(){
      console.log('scopestory = ', $scope.story)
      CreateService.title = $scope.story.title;
      CreateService.isPrivate = $scope.isPrivate;
      CreateService.userId = Auth.getCurrentUser()._id;
      console.log('CreateService', CreateService)
      $state.go('firstLine')
      

    }


    // $scope.username = Auth.getCurrentUser().name
    // $scope.userId = Auth.getCurrentUser()._id

    vm.startStory = function(){
      CreateService.input = $scope.story.input
      console.log(CreateService);
      var obj = CreateService;
      
        socket.socket.emit('newStory', obj)
    }

      //register those who have joined the room
      //we'll have to remember to reset this --- wiring for switching between stories/rooms
    socket.socket.on('StoryCreated', function(data) {
      console.log('created!')
      NodeService.nodes.push(data.firstNode);
      StoryService.title = data.story.name;
      //StoryService.setData(data.story._id)
      StoryService.id = data.story._id;
      console.log(data)
      console.log(StoryService)
      $state.go('story.graph', {storyId: StoryService.id, newStory: true})
    })




  });
