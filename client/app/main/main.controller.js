'use strict';

angular.module('storyHubApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.awesomeThings = [];


    $scope.isLoggedIn = Auth.isLoggedIn;

  });
