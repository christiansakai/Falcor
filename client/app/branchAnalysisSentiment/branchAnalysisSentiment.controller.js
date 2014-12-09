'use strict';

angular.module('storyHubApp')
  .controller('BranchanalysissentimentCtrl', function ($scope, $log, ParseAlchemy) {
    

  	  $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
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

        $scope.allData  = generateData()

        function generateData(){
        	var allData = []; 
        	var data = []; 

        	for (var i = 0; i < ParseAlchemy.sentiments.length; i++){
                if (typeof ParseAlchemy.sentiments[i].score === 'undefined'){
                    // console.log('undefined score type: ', ParseAlchemy.sentiments[i])
                    ParseAlchemy.sentiments[i].score = '0.50000';
                }
        		data.push(
        		{
        		key: "Positive",
                y: (1 + Number((ParseAlchemy.sentiments[i].score)))/2
        		}, 
        		{
                key: "Negative",
                y: (2 - (1 + Number(ParseAlchemy.sentiments[i].score)))/2
                }
        		)
        		allData.push(data); 
        		data = []; 
        	}

        // console.log('all Sentiments Data: ', allData)
				return allData;         	
        
        }
        // $scope.data = [
        //     {
        //         key: "Positive",
        //         y: (1 + Number((ParseAlchemy.data.sentiment.score)))/2
        //     },
        //     {
        //         key: "Negative",
        //         y: (2 - (1 + Number(ParseAlchemy.data.sentiment.score)))/2
        //     }
        // ];



  });
