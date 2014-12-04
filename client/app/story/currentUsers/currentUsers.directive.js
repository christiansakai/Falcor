'use strict';

angular.module('storyHubApp')
  .directive('currentusers', function () {
    return {
      templateUrl: 'app/story/currentUsers/currentUsers.html',
      restrict: 'E',
      controller: function($scope, socket) {
        // console.log("this is directive", Playlist);
        socket.socket.on('joinedRoom', function(data){
          console.log('hi there', data.currentUsers)
          $scope.currentUsers = data.currentUsers;
        })
      }
    };
  });



