'use strict';

angular.module('storyHubApp')
  .controller('StoryCtrl', function ($scope, NodeService, StoryService, Auth, socket, ExploreStories, $stateParams) {

    // this line sets the storyId that we send from the explore controller so that
    // if you refresh the page, the id for the get request is not lost 
    StoryService.setData($stateParams.storyId)
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


    function getTree(resultArray){
      var firstNode = _.find(resultArray, {'firstNode': true});
      var tree = {
          name: firstNode.text,
          id: firstNode._id,
          children: [] 
      };
      // var count = 0;
      // console.log(resultArray);
      // var branch; 


      function recursion(node, branch){
        console.log(node)
        // if(node.children.length === 0){
        //   return
        // }
        for(var i = 0; i < node.children.length; i++){

          // console.log(node.children)
          var child = _.find(resultArray, {'_id': node.children[i]})
          // console.log(child);
          var treeChild = {
            name: child.text,
            id: child._id,
            children: [] 
          };


         // branch = tree.children[i] // []
          branch.push(treeChild)
          console.log('branch after push: ', branch)

          if (child.children.length > 0){
            var k = 0; 
            while (k < child.children.length){
              console.log('k: ', k)
              branch = treeChild.children;
              console.log('branch: ', branch)
              k++
              console.log('k: ', k)
              // console.log('branch: ', treeChild.children)
              recursion(child, branch)
              }
            }
            branch = tree.children
          }
        }

      recursion(firstNode, tree.children) //tree.children
      console.log('final Tree: ', tree)
      return tree;
    }


    if (NodeService.nodes.length === 0){
      console.log('in here: ', NodeService.nodes.length)
      console.log('storyService: ', StoryService.getData())
      $scope.getNodesPerStory = function(){
      	var obj = {
      		storyId: StoryService.getData()
      	}

      	console.log('params obj', obj)
      	ExploreStories.getNodes(obj, function(results){
      		// results.forEach(function(result){
      			// NodeService.nodes.push(result)
            // $scope.parentId = results[results.length -1]._id;
            // console.log(result);
            $scope.results = results;
            console.log('results: ', results)

            var tree = getTree(results)
            // NodeService.nodes = tree
            console.log('tree: ', tree)
            buildTree(tree)
      		// })
        // #########################################################################
        // var sampleObj = {
        //                   "name": "level0",
        //                   "children": [
        //                                 {
        //                                   "name": "level1b1",
        //                                   "children": [
        //                                                 {
        //                                                   "name": "level2b1b1",
        //                                                   "children": []
        //                                                 }
        //                                               ]
        //                                 },
        //                                 {
        //                                   "name": "level1b2",
        //                                   "children": [
        //                                                 {
        //                                                   "name": "level2b2b1",
        //                                                   "children": []
        //                                                 },
        //                                                 {
        //                                                   "name": "level2b2b2",
        //                                                   "children": []
        //                                                 }
        //                                               ]
        //                                 }
        //                               ]
        //                 };
        //   buildTree(sampleObj);
          // #########################################################################
      	})
      }();
    }

    // #########################################################################
    function buildTree(treeJSON) {
        // debugger;

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
        // root.children.forEach(toggleAll);
        // toggle(root.children[1]);

        update(root);
    }
    // #########################################################################
  });
