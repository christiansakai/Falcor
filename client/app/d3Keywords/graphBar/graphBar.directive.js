'use strict';

angular.module('storyHubApp')
  .directive('graphbar', function () {
    return {
      templateUrl: 'app/d3Keywords/graphBar/graphBar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });