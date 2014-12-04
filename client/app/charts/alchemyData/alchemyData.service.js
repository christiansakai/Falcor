'use strict';

angular.module('storyHubApp')
  .factory('alchemyData', function ($http, $q, $log) {
    
    
    this.sendToAlchemy = function (text) {
      var alchemyCalls = [
        '/api/alchemys',
        '/api/alchemys/keywords',
        '/api/alchemys/concepts'
      ];
      // map each API call to a promise for its response.data
      alchemyCalls = alchemyCalls.map( function makeCall (url) {
        return $http.post( url, {text: text} )
          .then( function received (response) {
            return response.data;
          });
      });
      // return a promise for one object representing all the data
      return $q.all( alchemyCalls ).then( function received (results) {
        $log.debug('Alchemy results: ', results);
        return {
          sentiment : results[0],
          keywords : results[1],
          concepts : results[2]
        };
      });
    };


  });
