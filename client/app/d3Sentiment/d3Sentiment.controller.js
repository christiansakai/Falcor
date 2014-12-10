'use strict';

angular.module('storyHubApp')
  .controller('D3sentimentCtrl', function ($scope, $log, ParseAlchemy) {
   

   $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                color: function (d, i) {return colorArray[i]},
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

        var colorArray = ['#4089FF', '#FF4545'];

        // for (var i = 0; i < ParseAlchemy.data.sentiment.length; i++){
        //   //quick fix for neutral sentiments, which contain no score value
        //   if (typeof ParseAlchemy.data.sentiment[i].score === 'undefined'){
        //       // console.log('undefined score type: ', ParseAlchemy.sentiments[i])
        //       ParseAlchemy.data.sentiment[i].score = '0.50000';
        //   }
        // }

        console.log('sentiments prob: ', ParseAlchemy.data.sentiment)
        $scope.sentiments = ParseAlchemy.data.sentiment;

        console.log('data: ', $scope.data)

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
 