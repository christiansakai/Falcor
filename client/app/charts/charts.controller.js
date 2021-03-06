  'use strict';

angular.module('storyHubApp')
  .controller('ChartsCtrl', function ($scope, $timeout, $state, StoryService, ExploreStories, NodeService, $q, $http, alchemize, ParseAlchemy, $log) {
    
  	var vm = this; 

  	$scope.results; 

  	vm.getNodesPerStory = function(){
      var obj = { 
        storyId: StoryService.id
      }

      return $http.get('/api/nodes/getNodes/', {params: obj}).then(function(results){
      	return results.data; 
      })
    }

    vm.getStoryIdsForCount = function(){
    	return $http.get('/api/stories/').then(function(response){
    		return response.data;
    	});
    }

    //////////////////////////// CHART JS GRAPHS //////////////////////////////////////////

    //retrieves all stories, whether public or private, and compares word count per story 
    vm.wordStoryCount = function(){
    	var storyIdsArr = []; 
      var wordsPerStoryArr = []; 
      $scope.wordCountStoryLabels = []; 
    	vm.getStoryIdsForCount()
    	.then(function(stories){
        $scope.wordCountStoryLabels = stories.map(function(story){
          return story.name; 
        })
    		storyIdsArr = stories.map(function(story){
    			return story._id;
    		});
    		var obj = {
    			storyIds: storyIdsArr
    		}
        var count = 0; 
    		$http.get('/api/nodes/getNodesForStories/', {params: obj})
    			.success(function(storyNodes){
            storyNodes.forEach(function(story){
              story.forEach(function(node){
                count += node.text.split(" ").length; 
              })
              wordsPerStoryArr.push(count)
              count = 0
            })
    			});
    	})
      return wordsPerStoryArr;
    }


    //retrieves all nodes per story and compares word count of nodes within a single story
    vm.wordCount = function(){
    	var wordCountArr = []; 
      $scope.wordCountByNodeLabels = []; 
    	vm.getNodesPerStory()
    	.then(function(story){
    		story.forEach(function(node){
          wordCountArr.push(node.text.split(" ").length)
          $scope.wordCountByNodeLabels.push(node.text.substring(0, 30))

    		})
    	})
      $scope.wordArr = wordCountArr; 
     	return wordCountArr;
    }



    //compares number of likes per node in a single story
    vm.numLikes = function(){
      var numLikesArr = []; 
      $scope.likesLabels = []; 
      vm.getNodesPerStory()
      .then(function(story){
        story.forEach(function(node){
          numLikesArr.push(node.likes.numLikes)
          $scope.likesLabels.push(node.text.substring(0, 30))
        })
      })
      return numLikesArr; 
    }


    //displays number of likes per story, whether public or private
    vm.numLikesAcrossStories = function(){
      var storyIdsArr = []; 
      var likesPerStoryArr = []; 
      vm.getStoryIdsForCount()
      .then(function(stories){
        $scope.likesCountStoryLabels = stories.map(function(story){
          return story.name; 
        })
        storyIdsArr = stories.map(function(story){
          return story._id;
        });
        var obj = {
          storyIds: storyIdsArr
        }
        var count = 0; 
        $http.get('/api/nodes/getNodesForStories/', {params: obj})
          .success(function(storyNodes){
            storyNodes.forEach(function(story){
              story.forEach(function(node){
                count += node.likes.numLikes; 
              })
              likesPerStoryArr.push(count)
              count = 0
            })
          });
      })
      return likesPerStoryArr;
    }


    //compares authors of a story by word count 
    vm.authorCount = function(){
      var obj = {};
      $scope.authorCountLabels = []; 
      var countPerAuthor = []; 
      vm.getNodesPerStory()
      .then(function(story){
        story.forEach(function(node){
          if (typeof obj[node.author.name] === 'undefined'){
            obj[node.author.name] = 1;
          }
          else {
            obj[node.author.name] += 1; 
          }
        })
        for (var key in obj){
          countPerAuthor.push(obj[key])
          if ($scope.authorCountLabels.indexOf(key) === -1){
            $scope.authorCountLabels.push(key)            
          }
        }
      })
      console.log('returned: ', countPerAuthor)
      return countPerAuthor;
    }



////////////////////////////// END OF CHART JS GRAPHS ///////////////////////////////////////////

//////////////////////////////  ALCHEMY API CALLS /////////////////////////////////////////////


  ///////////////////// SENTIMENT FOR A SINGLE STORY /////////////////////
  //join nodes for a single story 
  //receive sentiment analysis on single story 
  vm.fetchAlchemyDataforStory = function(string){
    console.log('fetching data!')
    var nodeTextArr = []
    vm.getNodesPerStory()
    .then(function(story){
      nodeTextArr = story.map(function(node){
        return node.text;
      });
      var text = nodeTextArr.join(" ");
      console.log('text to be sent: ', text)
      return alchemize.sendToAlchemy(text)
    }).then(function assessAlchemyData(analysis){
      ParseAlchemy.parseAlchemyData(analysis)
      console.log("this is from chart controller", ParseAlchemy.data);
    })

    if (string === 'keywords'){
      $timeout(function(){
        $state.go('story.charts.storyKeywords')
      }, 600)
    }

    else if (string === 'sentiment'){
      $timeout(function(){
        $state.go('story.charts.sentiment')
      }, 600)
    }
  }

  $scope.test = function() {
    console.log("chart controller, ", ParseAlchemy.data);
    ParseAlchemy.doTest();
    console.log(ParseAlchemy.test);
  };


  // vm.fetchAlchemyDataforStory()


  //////////////// BRANCH BY BRANCH WITHIN STORY DATA ////////////////////////
  vm.getNodesForBranch = function(){
    var obj = {
      storyId: StoryService.id
    }
    return $http.get('/api/nodes/getChildlessNodes/', {params: obj}).then(function(response){
      return response.data;
    })
  }


  //gets the entire branch of text per story 
  vm.fetchAlchemyDataForBranch = function(string){
    vm.getNodesForBranch()
    .then(function(nodes){
      var labelArr = nodes.map(function(childlessNode){
        return childlessNode.text.substring(0, 30)
      })
      if (ParseAlchemy.branchLabels.length > 0){
        ParseAlchemy.branchLabels = []
      }
      ParseAlchemy.branchLabels = labelArr; 
      var textArr = nodes.map(function(childlessNode){
        return childlessNode.text + childlessNode.ancestors.map(function(ancestors){
          return ancestors.text;
        })
      })
      var obj = {
        branchText: textArr
      }; 
      return alchemize.sendArrayToAlchemy(obj)
    }).then(function assessAlchemyBranchData(analysis){
      ParseAlchemy.parseAlchemyBranchData(analysis)
    })

    if (string === 'keywords'){
      $timeout(function(){
        $state.go('story.charts.branchKeywords')
      }, 1200)
    }

    else if (string === 'sentiment'){
      $timeout(function(){
        $state.go('story.charts.branchSentiment')
      }, 1200)
    }
  }

  // vm.fetchAlchemyDataForBranch();


  ////////////////////////////  DATA FOR CHART JS RENDERING /////////////////////////////////////////

    $scope.data = {
    	// wordsPerNode: {
	    // 	labels: $scope.wordCountByNodeLabels,
	    // 	datasets:gitgit  [{
	    // 		fillColor : 'rgba(129, 183, 26, 0.5)',
	    //     strokeColor : 'rgba(129, 183, 26, 1)',
	    //     pointColor : 'rgba(129, 183, 26, 1)',
	    //     pointStrokeColor : "#fff",
     //      pointHighlightFill: '#fff',
     //      pointHighlightStroke: 'rgba(220,220,220,1)',
		   //  	data: vm.wordCount()
    	// 	}]
    	// },
     //  wordsPerStory: {
     //    labels: $scope.wordCountStoryLabels,
     //    datasets: [{
     //      fillColor : 'rgba(129, 183, 26, 0.5)',
     //      strokeColor : 'rgba(129, 183, 26, 1)',
     //      pointColor : 'rgba(129, 183, 26, 1)',
     //      pointStrokeColor : "#fff",
     //      pointHighlightFill: '#fff',
     //      data: vm.wordStoryCount()
     //    }]
     //  }, 
  		numLikes: {
    		labels: $scope.likesLabels,
    		datasets: [{
    		  fillColor : 'rgba(192, 192, 192, 0.5)',
          strokeColor : 'rgba(192, 192, 192, 1)',
          pointColor : 'rgba(192, 192, 192, 1)',
          pointStrokeColor : "#fff",
          pointHighlightFill: '#fff',
	    		data: vm.numLikes()
  			}]
  		}, 
      authorsByWordCount: {
        labels:  $scope.authorCountLabels,
        datasets: [{
          fillColor : 'rgba(192, 192, 192, 0.5)',
          strokeColor : 'rgba(192, 192, 192, 1)',
          pointColor : 'rgba(192, 192, 192, 1)',
          pointStrokeColor : "#fff",
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: vm.authorCount()
        }]
      }
      // likesPerStory: {
      //   labels:  $scope.likesCountStoryLabels,
      //   datasets: [{
      //     fillColor : 'rgba(129, 183, 26, 0.5)',
      //     strokeColor : 'rgba(129, 183, 26, 1)',
      //     pointColor : 'rgba(129, 183, 26, 1)',
      //     pointStrokeColor : "#fff",
      //     pointHighlightFill: '#fff',
      //     pointHighlightStroke: 'rgba(220,220,220,1)',
      //     data: vm.numLikesAcrossStories()
      //   }]
      // }
    }


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
