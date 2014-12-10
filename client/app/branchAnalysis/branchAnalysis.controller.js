'use strict';

angular.module('storyHubApp')
  .controller('BranchanalysisCtrl', function ($scope, $log, ParseAlchemy) {
    
  	 $scope.options = {
                chart: {
                    type: 'scatterChart',
                    height: 500,
                    color: d3.scale.category10().range(),
                    scatter: {
                        onlyCircles: true
                    },
                    showDistX: false,
                    showDistY: false,
                    interactive: true,
                    tooltips: true,
                    transitionDuration: 1000,
                    forceSize: 0,
                    xAxis: {
                        axisLabel: '',
                        tickFormat: function (d){
                          return d3.format(',f')(d);
                        },
                        axisLabelDistance: 30
                    },
                    yAxis: {
                        axisLabel: 'Relevance',
                        tickFormat: function (d){
                          return d3.format('.02f')(d);
                        },
                        axisLabelDistance: 30
                    }
                }
            };


       //receives an array of keywords arrays with objects of text and relevance 
      $scope.allData = generateData(1, ParseAlchemy.keywords.length);

    
      $scope.labels = ParseAlchemy.branchLabels; 

      /* Random Data Generator (took from nvd3.org) */
      function generateData (groups, points) {
          var allData = [],
          	 	data = [],
              shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
              random = d3.random.normal();

          for (var i = 0; i < points; i++) {
          	for (var k = 0; k < ParseAlchemy.keywords[i].length; k++){
	              data.push({
	                  key: ParseAlchemy.keywords[i][k].text,
	                  values: []
	              });

	              console.log('i: ', ParseAlchemy.keywords[i][k].text, 'value: ', ParseAlchemy.keywords[i][k].relevance)
	                  data[k].values.push({
	                      x: k,
	                      y: ParseAlchemy.keywords[i][k].relevance,
	                      size: .1,
	                      shape: shapes[k % 6]
	                  });	
          	}
          	allData.push(data)
          	data = []
          }
          // $log.debug('Stat keywords: ', ParseAlchemy.keywords);
      
          return allData;
      }
        



  });
