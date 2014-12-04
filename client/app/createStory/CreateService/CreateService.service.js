'use strict';

angular.module('storyHubApp')
  .factory('CreateService', function () {


    var newStory = {
      title: '',
      input: '',
      isPrivate: false,
      userId: ''
    }

    // Public API here
    return newStory;
  });
