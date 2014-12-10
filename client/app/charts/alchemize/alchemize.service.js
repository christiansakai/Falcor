'use strict';

angular.module('storyHubApp')
  .service('alchemize', function ($http, $q, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //from gnitty
  this.sendToAlchemy = function (text) {
      var alchemyCalls = [
        '/api/alchemys',
        '/api/alchemys/keywords'
      ];
      // map each API call to a promise for its response.data
      alchemyCalls = alchemyCalls.map( function makeCall (url) {
        return $http.post( url, {text: text})
          .then( function received (response) {
            return response.data;
          });
      });
      // return a promise for one object representing all the data
      return $q.all( alchemyCalls ).then( function received (results) {
        // $log.debug('Alchemy results: ', results);
        return {
          sentiment : results[0],
          keywords : results[1]
        };
      });
    };

    this.sendArrayToAlchemy = function(obj){

      return $http.post('/api/alchemys/sentimentsArray', obj)
        .then(function received (response){
          // $log.debug('Alchemy results: ', response)
          return response.data; 
        })
    };





  });
