'use strict';

angular.module('storyHubApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    
  });
