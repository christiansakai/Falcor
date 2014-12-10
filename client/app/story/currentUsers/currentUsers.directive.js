'use strict';

angular.module('storyHubApp')
  .directive('currentusers', function () {
    return {
      templateUrl: 'app/story/currentUsers/currentUsers.html',
      restrict: 'E',
      controller: function($scope, $state, socket, StoryService, Auth, $location, $modal) {

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
          $scope.currentUsers = data.currentUsers;
        })

        socket.socket.on('disconnection', function(data){
          $scope.currentUsers = $scope.currentUsers.filter(function(user){
            return user.id !== data.res.id
          })
        })

        socket.socket.on('joinedRoom', function(data){
            $scope.currentUsers = data.currentUsers;  
        })

        $scope.onCharts = function(route) {
          return ($location.path().indexOf('chart') !== -1 || $location.path().indexOf('branchChart') !== -1)
          // console.log($location.path())
          // return route === $location.path();
        };

        $scope.helpModal = function() {
          // console.log(node);
          // console.log('hi')
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



