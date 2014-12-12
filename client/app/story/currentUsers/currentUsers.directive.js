'use strict';

angular.module('storyHubApp')
  .directive('currentusers', function () {
    return {
      templateUrl: 'app/story/currentUsers/currentUsers.html',
      restrict: 'E',
      controller: function($scope, $state, socket, StoryService, Auth, $location, $modal) {

        $scope.leaveStory = function(){
          var obj = {
            storyId: StoryService.id,
            username: Auth.getCurrentUser().name
          }

          socket.socket.emit('leaveRoom', obj);
          $state.go('landing')
        };

        socket.socket.on('leftRoom', function(data){
          console.log('someone left room', data.currentUsers)
          $scope.currentUsers = data.currentUsers;
        })

        socket.socket.on('disconnection', function(data){
          console.log('someone disconnection', data.res)
          $scope.currentUsers = $scope.currentUsers.filter(function(user){
            return user.id !== data.res.id
          })
        })

        socket.socket.on('joinedRoom', function(data){
            console.log('someone joinedRoom', data.currentUsers)
            $scope.currentUsers = data.currentUsers;  
        })

        $scope.onCharts = function(route) {
          return ($location.path().indexOf('chart') !== -1 || $location.path().indexOf('branchChart') !== -1)
        };

        $scope.helpModal = function() {
          var size = 'md';// Empty : default, lg :large, sm : small
          var modalInstance = $modal.open({
            templateUrl: 'helpModal.html',
            controller: 'helpModalController',
            size: size
          });
        };

      }
    };
  });



