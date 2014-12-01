'use strict';

angular.module('storyHubApp')
  .controller('StoryCtrl', function ($scope, NodeService, StoryService, Auth, socket, ExploreStories) {

    $scope.nodes = NodeService;
    $scope.story = StoryService;
    $scope.writing = {
    	text: ''
    }
    $scope.parentId = '';

    $scope.setParent = function(node){
      $scope.parentId = node._id;
      console.log(node);
      console.log($scope.parentId)
    }

		$scope.submitWriting = function(){
      var obj = {
        text: $scope.writing.text,
        author: Auth.getCurrentUser()._id,
        parentId: $scope.parentId
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

    if (NodeService.nodes.length === 0){
      $scope.getNodesPerStory = function(){
      	var obj = {
      		storyId: ExploreStories.storiesInfo.storyId
      	}

      	console.log('params obj', obj)
      	ExploreStories.getNodes(obj, function(results){
    		NodeService.nodes = [];
      		// results.forEach(function(result){
      			// NodeService.nodes.push(result)
            $scope.parentId = results[results.length -1]._id;
            // console.log(result);
            $scope.results = results;
      		// })
        // #########################################################################
        var sampleObj = {
                          "name": "level0",
                          "children": [
                                        {
                                          "name": "level1b1",
                                          "children": [
                                                        {
                                                          "name": "level2b1b1",
                                                          "children": []
                                                        }
                                                      ]
                                        },
                                        {
                                          "name": "level1b2",
                                          "children": [
                                                        {
                                                          "name": "level2b2b1",
                                                          "children": []
                                                        },
                                                        {
                                                          "name": "level2b2b2",
                                                          "children": []
                                                        }
                                                      ]
                                        }
                                      ]
                        };
          buildTree(sampleObj);
          // #########################################################################
      	})
      }();
    }

    // #########################################################################
    function buildTree(treeJSON) {
        debugger;

        root = treeJSON;
        root.x0 = h / 2;
        root.y0 = 0;

        function toggleAll(d) {
          if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
          }
        }

        // Initialize the display to show a few nodes.
        root.children.forEach(toggleAll);
        toggle(root.children[1]);

        update(root);
    }
    // #########################################################################
  });
