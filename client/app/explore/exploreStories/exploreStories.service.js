'use strict';

angular.module('storyHubApp')
  .factory('ExploreStories', function ($resource) {
    // Service logic
    // ...
    return $resource('/api/nodes');

  });
