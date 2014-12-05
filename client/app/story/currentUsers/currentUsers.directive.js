'use strict';

angular.module('storyHubApp')
  .directive('currentusers', function () {
    return {
      templateUrl: 'app/story/currentUsers/currentUsers.html',
      restrict: 'E',
      controller: function($scope, socket, StoryService) {
        // console.log("this is directive", Playlist);
        // socket.socket.on('joinedRoom', function(data){
        //   console.log('JOINED ROOM', data)
          // console.log('hi there', data.currentUsers)
          $scope.currentUsers = StoryService.currentUsers
          // $scope.$apply();
        // })

        socket.socket.on('leftRoom', function(data){
          // console.log('disconnect test', data)
          $scope.currentUsers = data.currentUsers;
        })

        socket.socket.on('disconnection', function(data){
          $scope.currentUsers = $scope.currentUsers.filter(function(user){
            return user.id !== data.res.id
          })
        })

      }
    };
  });



