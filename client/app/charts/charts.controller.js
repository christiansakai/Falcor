'use strict';

angular.module('storyHubApp')
  .controller('ChartsCtrl', function ($scope, ExploreStories, NodeService, $q, $http) {
    
  	var vm = this; 

  	$scope.results; 

  	// vm.getNodesPerStory = function(){
   //    var obj = {
   //      storyId: "547617ddf41f2eb111c49b45"
   //      //storyId: StoryService.id
   //    }
   //    var deferredObj = $q.defer();
   //    $http.get('/api/nodes/getNodes/', {params: obj}).success(function(results){
   //    	deferredObj.resolve(results)
   //    })
   //    .error(function(status, err){
   //    	deferredObj.reject(status)
   //    })

   //    return deferredObj.promise;
   //  }

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

    //consider making a chart that compares total words per stories 

    vm.wordStoryCount = function(){
    	console.log('here!')
    	var storyIdsArr = []; 
    	var nodesPerStory = []; 
    	vm.getStoryIdsForCount()
    	.then(function(stories){
    		storyIdsArr = stories.map(function(story){
    			return story._id;
    		});

    		var obj = {
    			storyIds: storyIdsArr
    		}
    		console.log('obj', obj)
    		$http.get('/api/nodes/getNodesForStories/', {params: obj})
    			.success(function(storyNodes){
    				console.log('story nodes: ', storyNodes)
    			});

    		// storyIds.forEach(function(storyId){
    		// 	console.log('storyId!', storyId)
    		// // 	storyIds.push(storyId)
    		// // })
	    	// // console.log('storyIDArr: ', storyIds)
	    	// // storyIds.forEach(function(storyId){
	    	// 	console.log('in here!')
	    	// 	var obj = {
	    	// 		storyId: storyId._id
	    	// 	}
	    	// 	var deferredObj = $q.defer()
	    	// 	$http.get('/api/nodes/getNodes/', {params: obj}).success(function(result){
	    	// 		deferredObj.resolve(result)
	    	// 	})
	    	// 	.error(function(status, err){
	    	// 		deferredObj.reject(status)
	    	// 	})
	    	// 	 nodesPerStory.push(deferredObj.promise)
	    	// })
    	// console.log('nodesPerStoryArr: ', nodesPerStory)
    	// return nodesPerStory; 
    	})
    }

    vm.wordStoryCount()

    // vm.wordStoryCountContinued = function(){
    // 	var arrayforNodes = vm.wordStoryCount()
    // 	var resultArr = []; 
    // 		setTimeout(function(){
    // 			console.log('arr: ', arrayforNodes)
    // 			arrayforNodes.forEach(function(result){
    // 			result.then(function(results){
    // 				resultArr.push(result)
    // 			})
    // 		})
    // 	}, 1000)
    // 		console.log('res: ', resultArr)
    // 		return resultArr; 
    // }

    // vm.wordStoryCountContinued()

    //counts words of text per node in a single story
    // vm.wordCount = function(){
    // 	var wordCountArr = []; 
    // 	vm.getNodesPerStory()
    // 	.then(function(results){
    // 		results.forEach(function(element){
    // 			wordCountArr.push(element.text.split(" ").length)
    // 		})
    // 		 console.log('words: ', wordCountArr)
    // 	})
    //  	return wordCountArr;
    // }

    // //data for chart js rendering 
    // $scope.data = {
    // 	words: {
	   //  	labels: 'happy',
	   //  	datasets: [{
	   //  		fillColor : "rgba(220,220,220,0.5)",
	   //      strokeColor : "rgba(220,220,220,1)",
	   //      pointColor : "rgba(220,220,220,1)",
	   //      pointStrokeColor : "#fff",
		  //   	data: vm.wordCount()
    // 		}]
    // 	}, 
  		// numLikes: {
    // 		labels: 'happy',
    // 		datasets: [{
    // 			fillColor : "rgba(220,220,220,0.5)",
    //     	strokeColor : "rgba(220,220,220,1)",
    //     	pointColor : "rgba(220,220,220,1)",
    //     	pointStrokeColor : "#fff"
	   //  		// data: vm.numLikes()
  		// 	}]
  		// }

    // }

    // vm.numLikes = function(){
    // 	var numLikesArr = []; 
    // 	vm.getNodesPerStory()
    // 	.then(function(results){
    // 		results.forEach(function(element){
    // 			numLikesArr.push(element.likes.numLikes)
    // 		})
    // 		console.log('numLikes: ', numLikesArr)
    // 	})
    // 	return numLikesArr; 
    // }

    // vm.authorCount = function(){
    // 	var countPerAuthor = []; 
    // 	var authorLabels = []; 
    // 	var obj = {};
    // 	var count; 
    // 	vm.getNodesPerStory()
    // 	.then(function(results){
    // 		results.forEach(function(element){
    // 			if (typeof obj[element.author] === 'undefined'){
    // 				obj[element.author] = 1;
    // 			}
    // 			else {
    // 				obj[element.author] += 1; 
    // 			}
    // 		})
    // 		for (var key in obj){
    // 			if (obj.hasOwnProperty(key)){
    // 				countPerAuthor.push(obj[key])
    // 				authorLabels.push(key)
    // 			}
    // 		}
    // 	})
    // 	console.log('countPerAuthor: ', countPerAuthor)
    // }
  


	
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
