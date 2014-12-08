'use strict';

angular.module('storyHubApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/landing'
    }, 
    {
      'title': 'Create a Story',
      'link': '/createStory'
    },
    {
      'title': 'Your Stories',
      'link': '/userStories'
    },
    {
      'title': 'Explore Stories',
      'link': '/explore'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });