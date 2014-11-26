'use strict';

angular.module('storyHubApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    // $stateProvider
    //   .state('admin', {
    //      url: '/admin',
    //      templateUrl: 'app/admin/admin.html',
    //      controller: 'AdminCtrl'
    //   })
    //   .state('createStory', {
    //     url: '/createStory',
    //     templateUrl: 'app/createStory/createStory.html',
    //     controller: 'CreatestoryCtrl as create'
    //   })
    //   .state('explore', {
    //     url: '/explore',
    //     templateUrl: 'app/explore/explore.html',
    //     controller: 'ExploreCtrl'
    //   })
    //   .state('landing', {
    //     url: '/landing',
    //     templateUrl: 'app/landing/landing.html',
    //     controller: 'LandingCtrl as write'
    //     // authenticate: true
    //   })
    //   .state('main', {
    //     url: '/',
    //     templateUrl: 'app/main/main.html',
    //     controller: 'MainCtrl'
    //   })
    //   .state('story', {
    //     url: '/story',
    //     templateUrl: 'app/story/story.html',
    //     controller: 'StoryCtrl',
    //     authenticate: true
    //   });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });