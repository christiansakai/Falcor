'use strict';

angular.module('storyHubApp')
  .controller('ChartsCtrl', function ($scope, ExploreStories, NodeService, $q, $http, alchemize, parseAlchemy, $log) {
    
  	var vm = this; 

  	$scope.results; 

  	vm.getNodesPerStory = function(){
      var obj = { 
        storyId: "547fb98a382686674d78b276"         //storyId: StoryService.id
      }

      return $http.get('/api/nodes/getNodes/', {params: obj}).then(function(results){
      	return results.data; 
        })
    }

    vm.getStoryIdsForCount = function(){

    	// var deferredObj = $q.defer()
    	// $http.get('/api/stories/').success(function(results){
    	// 	deferredObj.resolve(results)
    	// })
    	// .error(function(status, err){
    	// 	deferredObj.reject(status)
    	// })
    	// return deferredObj.promise

    	return $http.get('/api/stories/').then(function(response){
    		return response.data;
    	});
    }

    //compares word count per story 
    vm.wordStoryCount = function(){
    	var storyIdsArr = []; 
      var wordsPerStoryArr = []; 
    	vm.getStoryIdsForCount()
    	.then(function(stories){
    		storyIdsArr = stories.map(function(story){
    			return story._id;
    		});

    		var obj = {
    			storyIds: storyIdsArr
    		}
        var count = 0; 
    		$http.get('/api/nodes/getNodesForStories/', {params: obj})
    			.success(function(storyNodes){
            console.log('nodes: ', storyNodes)
    				storyNodes.forEach(function(story){
              story.forEach(function(node){
                count += node.text.split(" ").length; 
              })
              wordsPerStoryArr.push(count)
              count = 0
            })
            // console.log('arr: ', wordsPerStoryArr)
    			});
    	})
      return wordsPerStoryArr;
    }


    //compares word count of nodes within a single story
    vm.wordCount = function(){
    	var wordCountArr = []; 
    	vm.getNodesPerStory()
    	.then(function(results){
    		results.forEach(function(element){
    			wordCountArr.push(element.text.split(" ").length)
    		})
    		 // console.log('words: ', wordCountArr)
    	})
     	return wordCountArr;
    }

    //compares number of likes per node in a single story
    vm.numLikes = function(){
      var numLikesArr = []; 
      vm.getNodesPerStory()
      .then(function(results){
        // console.log('res: ', results)
        results.forEach(function(element){
          // console.log('element: ', element)
          numLikesArr.push(element.likes.numLikes)
        })
      // console.log('numLikes: ', numLikesArr)
      })
      return numLikesArr; 
    }

    vm.authorCount = function(){
      var obj = {};
      var count; 
      vm.getNodesPerStory()
      .then(function(story){
        story.forEach(function(node){
          if (typeof obj[node.author] === 'undefined'){
            obj[node.author] = 1;
          }
          else {
            obj[node.author] += 1; 
          }
        })
        console.log('final obj: ', obj)
        return buildAuthArr(obj)
      })
    }

    function buildAuthArr(obj){
      console.log('o: ', obj)
        var authorsAndCountsArr = []; 
        var countPerAuthor = []; 
        var authorLabels = []; 
        for (var key in obj){
          console.log('key: ', key)
          countPerAuthor.push(obj[key])
          authorLabels.push(key)
        }
        authorsAndCountsArr.push(countPerAuthor, authorLabels) 
        console.log('authors&Counts: ', authorsAndCountsArr)
        return authorsAndCountsArr; 
    }



  /////////////// data assessed by alchemy API //////////////////////////


  ///////////////////// SENTIMENT FOR A SINGLE STORY /////////////////////
  //join nodes for a single story 
  //receive sentiment analysis on single story 
  vm.fetchAlchemyDataforStory = function(){
    var nodeTextArr = []
    vm.getNodesPerStory()
    .then(function(story){
      nodeTextArr = story.map(function(node){
        return node.text;
      });
      nodeTextArr.unshift('Politics angry existentialism life pissed nihilism');
      var text = nodeTextArr.join(" ");
      console.log('text to be sent: ', text)
      return alchemize.sendToAlchemy(text)
    }).then(function assessAlchemyData(analysis){
      parseAlchemy.parseAlchemyData(analysis)
    })
  }

  vm.fetchAlchemyDataforStory()


  //////////////// BRANCH BY BRANCH WITHIN STORY DATA ////////////////////////
  vm.getNodesForBranch = function(){
    var obj = {
      storyId: "547fbab6fcbe35714dc28f4f"
    }
    return $http.get('/api/nodes/getChildlessNodes/', {params: obj}).then(function(response){
      return response.data;
    })
  }


  //gets the entire branch of text per story 
  vm.fetchAlchemyDataForBranch = function(){
    vm.getNodesForBranch()
    .then(function(nodes){
      console.log('childless nodes here: ', nodes)
      var textArr = nodes.map(function(childlessNode){
        return childlessNode.text + childlessNode.ancestors.map(function(ancestors){
          return ancestors.text;
        })
      })
      var obj = {
        branchText: textArr
      }; 
      console.log('textArr: ', obj)
      return alchemize.sendArrayToAlchemy(obj)
    })
  }

  // vm.fetchAlchemyDataForBranch();



  //data stored in parseAlchemy service
  setTimeout(function(){
    var data = parseAlchemy.data
    console.log('DATA::', data)
  }, 3000)


  /////////////////////////////////////////////////////////////////////


  // //data for chart js rendering 
    $scope.data = {
    	words: {
	    	labels: 'happy',
	    	datasets: [{
	    		fillColor : "rgba(220,220,220,0.5)",
	        strokeColor : "rgba(220,220,220,1)",
	        pointColor : "rgba(220,220,220,1)",
	        pointStrokeColor : "#fff",
		    	data: vm.wordCount()
    		}]
    	},
      wordsPerStory: {
        labels: 'happy',
        datasets: [{
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          data: vm.wordStoryCount()
        }]
      }, 
  		numLikes: {
    		labels: 'happy',
    		datasets: [{
    			fillColor : "rgba(220,220,220,0.5)",
        	strokeColor : "rgba(220,220,220,1)",
        	pointColor : "rgba(220,220,220,1)",
        	pointStrokeColor : "#fff",
	    		data: vm.numLikes()
  			}]
  		}, 
      authorsByWordCount: {
        // labels: vm.authorCount()[1],
        datasets: [{
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          // data: vm.authorCount()[0]
        }]
      }
    }




	
    // $scope.someData = {
    //     labels: [
    //     'Apr', 
    //     'May', 
    //     'Jun'
    //   ],
    //   datasets: [
    //     {
    //       data: [1, 7, 15, 19, 31, 40]
    //     },
    //     {
    //       data: [6, 12, 18, 24, 30, 36]
    //     }
    //   ]
    // };

    // $scope.someOptions = {
    //     segementStrokeWidth: 20,
    //     segmentStrokeColor: '#000'
    // };

    //  // Chart.js Options
    // $scope.options =  {

    //   // Sets the chart to be responsive
    //   responsive: true,

    //   //Boolean - Whether to show lines for each scale point
    //   scaleShowLine : true,

    //   //Boolean - Whether we show the angle lines out of the radar
    //   angleShowLineOut : true,

    //   //Boolean - Whether to show labels on the scale
    //   scaleShowLabels : false,

    //   // Boolean - Whether the scale should begin at zero
    //   scaleBeginAtZero : false,

    //   //String - Colour of the angle line
    //   angleLineColor : 'rgba(0,0,0,.1)',

    //   //Number - Pixel width of the angle line
    //   angleLineWidth : 1,

    //   //String - Point label font declaration
    //   pointLabelFontFamily : '"Arial"',

    //   //String - Point label font weight
    //   pointLabelFontStyle : 'normal',

    //   //Number - Point label font size in pixels
    //   pointLabelFontSize : 10,

    //   //String - Point label font colour
    //   pointLabelFontColor : '#666',

    //   //Boolean - Whether to show a dot for each point
    //   pointDot : true,

    //   //Number - Radius of each point dot in pixels
    //   pointDotRadius : 3,

    //   //Number - Pixel width of point dot stroke
    //   pointDotStrokeWidth : 1,

    //   //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    //   pointHitDetectionRadius : 20,

    //   //Boolean - Whether to show a stroke for datasets
    //   datasetStroke : true,

    //   //Number - Pixel width of dataset stroke
    //   datasetStrokeWidth : 2,

    //   //Boolean - Whether to fill the dataset with a colour
    //   datasetFill : true,

    //   //String - A legend template
    //   legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    // };

           $scope.options =  {

         // Sets the chart to be responsive
         responsive: true,

         ///Boolean - Whether grid lines are shown across the chart
         scaleShowGridLines : true,

         //String - Colour of the grid lines
         scaleGridLineColor : "rgba(0,0,0,.05)",

         //Number - Width of the grid lines
         scaleGridLineWidth : 1,

         //Boolean - Whether the line is curved between points
         bezierCurve : true,

         //Number - Tension of the bezier curve between points
         bezierCurveTension : 0.4,

         //Boolean - Whether to show a dot for each point
         pointDot : true,

         //Number - Radius of each point dot in pixels
         pointDotRadius : 4,

         //Number - Pixel width of point dot stroke
         pointDotStrokeWidth : 1,

         //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
         pointHitDetectionRadius : 20,

         //Boolean - Whether to show a stroke for datasets
         datasetStroke : true,

         //Number - Pixel width of dataset stroke
         datasetStrokeWidth : 2,

         //Boolean - Whether to fill the dataset with a colour
         datasetFill : true,

         // Function - on animation progress
         onAnimationProgress: function(){},

         // Function - on animation complete
         onAnimationComplete: function(){},

         //String - A legend template
         // legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
       };


      
    


  });
