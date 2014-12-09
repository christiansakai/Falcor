'use strict';

angular.module('storyHubApp')
  .directive('currentusers', function () {
    return {
      templateUrl: 'app/story/currentUsers/currentUsers.html',
      restrict: 'E',
      controller: function($scope, $state, socket, StoryService, Auth) {
        // console.log("this is directive", Playlist);
        // socket.socket.on('joinedRoom', function(data){
        //   console.log('JOINED ROOM', data)
          // console.log('hi there', data.currentUsers)

          $scope.$watch(function () { return StoryService.currentUsers }, function (newVal, oldVal) {
              if (typeof newVal !== 'undefined') {
                  $scope.currentUsers = StoryService.currentUsers;
              }
          });
          // $scope.currentUsers = StoryService.currentUsers;
          // $scope.$apply();
        // })
        $scope.leaveStory = function(){
          console.log(StoryService.id)

          var obj = {
            storyId: StoryService.id,
            username: Auth.getCurrentUser().name
          }


          socket.socket.emit('leaveRoom', obj);
          $state.go('landing')
        };

        socket.socket.on('leftRoom', function(data){
          // console.log('disconnect test', data)
          $scope.currentUsers = data.currentUsers;
        })

        socket.socket.on('disconnection', function(data){
          $scope.currentUsers = $scope.currentUsers.filter(function(user){
            return user.id !== data.res.id
          })
        })

        socket.socket.on('joinedRoom', function(data){
          // console.log('hitting StoryService', data)
            $scope.currentUsers = data.currentUsers;  
          // console.log('Story.title', Story.title)
        })

      }
    };
  });



