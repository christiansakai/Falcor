'use strict';

angular.module('storyHubApp')
  .controller('StoryCtrl', function ($scope, NodeService, StoryService, Auth, socket, ExploreStories) {

    $scope.nodes = NodeService;
    $scope.story = StoryService;
    $scope.writing = {
    	text: ''
    }

		$scope.submitWriting = function(){
      var obj = {
        text: $scope.writing.text,
        author: Auth.getCurrentUser()._id, 
        parentId: NodeService.nodes[NodeService.nodes.length - 1]._id 
      }
			socket.socket.emit('nodeAdded', obj)
		}

    socket.socket.on('addNodeToDom', function(node){
    	console.log('added node', node)
    	NodeService.nodes.push(node)
      //add node to dom
      //initiate get request for all nodes associated with the story id
      //$scope.story = results; 
      //ng-repeat over results
    })

    $scope.shareWriting = function(){
      //this function requires the story id, and the email address
      //of the user invited 
      var obj = {
        storyId: StoryService.id, 
        email: 'ayana.d.i.wilson@gmail.com'
      }

      socket.socket.emit('invitingToStory', obj)
    }

    socket.socket.on('sentInvite', function(obj){
      console.log('invitation sent to ' + obj.email)
    })

    $scope.getNodesPerStory = function(){
    	var obj = {
    		storyId: ExploreStories.storiesInfo.storyId
    	}

    	console.log('params obj', obj)
    	ExploreStories.getNodes(obj, function(results){
  		NodeService.nodes = [];
    		results.forEach(function(result){
    			NodeService.nodes.push(result)
    		})    		// $scope.nodesPerStory = result;
    	})
    }();
  });
