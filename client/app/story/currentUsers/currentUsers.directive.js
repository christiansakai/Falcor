'use strict';

angular.module('storyHubApp')
  .directive('currentusers', function () {
    return {
      templateUrl: 'app/story/currentUsers/currentUsers.html',
      restrict: 'E',
      controller: function($scope, socket) {
        // console.log("this is directive", Playlist);
        socket.socket.on('joinedRoom', function(data){
          // console.log('hi there', data.currentUsers)
          $scope.currentUsers = data.currentUsers;
        })

        socket.socket.on('leftRoom', function(data){
          // console.log('disconnect test', data)
          $scope.currentUsers = data.currentUsers;
        })

        socket.socket.on('disconnection', function(data){
          console.log('hi there', data)
          var removeIndex = $scope.currentUsers.indexOf(data.formerMember)
          console.log(removeIndex)
          $scope.currentUsers.splice(removeIndex, 1)
          // $scope.currentUsers = data.currentUsers;
        })

      }
    };
  });



