'use strict';

angular.module('storyHubApp')
  .controller('StoryCtrl', function ($scope, NodeService, StoryService, Auth, socket, ExploreStories, $stateParams) {

    // this line sets the storyId that we send from the explore controller so that
    // if you refresh the page, the id for the get request is not lost 
    StoryService.id = $stateParams.storyId
    // $scope.nodes = NodeService;
    $scope.story = StoryService;
    $scope.writing = {
    	text: ''
    }
    $scope.parentId = '';

    this.setParent = function(node){
      console.log(node);
      $scope.parentId = node._id;
      console.log($scope.parentId)
      // console.log(node);
      // console.log($scope.parentId)
    }

		$scope.submitWriting = function(){
      console.log($scope.parentId)
      var obj = {
        text: $scope.writing.text,
        author: Auth.getCurrentUser()._id,
        parentId: this.parentId
      }
      console.log(obj)
			socket.socket.emit('nodeAdded', obj)
		}

    socket.socket.on('addNodeToDom', function(node){
    	// console.log('added node', node)
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
      // console.log('invitation sent to ' + obj.email)
    })


    // function getTree(resultArray){
    //   var firstNode = _.find(resultArray, {'firstNode': true});
    //   var tree = {
    //       name: firstNode.text,
    //       id: firstNode._id,
    //       children: []
    //   };
    //   // var count = 0;
    //   // console.log(resultArray);
    //   // var branch;


    //   function recursion(node, branch){
    //     console.log(node)
    //     // if(node.children.length === 0){
    //     //   return
    //     // }
    //     for(var i = 0; i < node.children.length; i++){

    //       // console.log(node.children)
    //       var child = _.find(resultArray, {'_id': node.children[i]})
    //       // console.log(child);
    //       var treeChild = {
    //         name: child.text,
    //         id: child._id,
    //         children: []
    //       };


    //      // branch = tree.children[i] // []
    //       branch.push(treeChild)
    //       console.log('branch after push: ', branch)

    //       if (child.children.length > 0){
    //         var k = 0;
    //         while (k < child.children.length){
    //           console.log('k: ', k)
    //           branch = treeChild.children;
    //           console.log('branch: ', branch)
    //           k++
    //           console.log('k: ', k)
    //           // console.log('branch: ', treeChild.children)
    //           recursion(child, branch)
    //           }
    //         }
    //         branch = tree.children
    //       }
    //     }

    //   recursion(firstNode, tree.children) //tree.children
    //   console.log('final Tree: ', tree)
    //   return tree;
    // }


    //   $scope.getNodesPerStory = function(){
    //   	var obj = {
    //   		storyId: StoryService.id
    //   	}

    //   	console.log('params obj', obj)
    //     if($stateParams.newStory !== true){
    //     	ExploreStories.getNodes(obj, function(results){
    //           console.log('results', results);
    //           $scope.results = results;

    //           var tree = getTree(results)
    //           // NodeService.nodes = tree
    //           console.log('tree: ', tree)
    //           buildTree(tree)
    //     	})
    //     }
    //     else {
    //       //something
    //     }
    //   }();

    // // #########################################################################
    // function buildTree(treeJSON) {
    //     debugger;
    //     console.log('treeJSON', treeJSON)
    //     root = treeJSON;
    //     root.x0 = h / 2;
    //     root.y0 = 0;

    //     function toggleAll(d) {
    //       if (d.children) {
    //         d.children.forEach(toggleAll);
    //         toggle(d);
    //       }
    //     }

    //     // Initialize the display to show a few nodes.
    //     // root.children.forEach(toggleAll);
    //     // toggle(root.children[1]);

    //     update(root);
    // }




    // #########################################################################
  });
