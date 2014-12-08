'use strict';

angular.module('storyHubApp')
  .controller('D3sentimentCtrl', function ($scope, $log, ParseAlchemy) {
   

   $scope.options = {
            chart: {
                type: 'pieChart',
                height: 600,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                transitionDuration: 1000,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "Positive",
                y: (1 + Number((ParseAlchemy.data.sentiment.score)))/2
            },
            {
                key: "Negative",
                y: (2 - (1 + Number(ParseAlchemy.data.sentiment.score)))/2
            }
        ];

  });
 