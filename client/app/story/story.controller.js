'use strict';

angular.module('storyHubApp')
  .controller('StoryCtrl', function ($scope, NodeService, StoryService, Auth, socket, ExploreStories, $stateParams, $modal, growl) {

    // this line sets the storyId that we send from the explore controller so that
    // if you refresh the page, the id for the get request is not lost 


    StoryService.id = $stateParams.storyId
    // $scope.nodes = NodeService;

    $scope.nodes = NodeService;
    $scope.story = StoryService;
    $scope.writing = {
    	text: ''
    }

    $scope.userId = Auth.getCurrentUser()._id
    console.log('userId: ', Auth.getCurrentUser()._id)
    console.log('userIdOnScope: ', $scope.userId)

    $scope.parentId = '';

    this.setParent = function(node){
      console.log(node);
      $scope.parentId = node._id;
      console.log($scope.parentId)
      // console.log(node);
      // console.log($scope.parentId)
    }

    $scope.rateNode = function(nodeId){
      var obj = {
        userId: $scope.userId
      }
      console.log('sent obj: ', obj.userId)
      ExploreStories.rateNodes(nodeId, obj, function(result){
        console.log('liked node: ', result)
      })
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
		};

    socket.socket.on('addNodeToDom', function(node){
    	// console.log('added node', node)
    	// NodeService.nodes.push(node)
      //add node to dom
      //initiate get request for all nodes associated with the story id
      //$scope.story = results;
      //ng-repeat over results
    })



    $scope.shareWriting = function() {
      var size = 'sm';// Empty : default, lg :large, sm : small
      var modalInstance = $modal.open({
      templateUrl: 'shareStoryModal.html',
      controller: 'shareStoryModalInstanceCtrl',
      size: size,
      resolve: {
        storyId: function () {
          // !! GET THE CORRECT storyId
          // return StoryService.id;
          return 'somefakestoryid';
        }
      }
      });

      modalInstance.result.then(function (inviteObj) {
        // Modal ok.
        growl.info('Sending Invitation to ' + inviteObj.email);
        socket.socket.emit('invitingToStory', inviteObj)
      }, function () {
        // Modal cancel.
        // $log.info('Modal dismissed at: ' + new Date());
      });
    }

    socket.socket.on('sentInvite', function(obj){
      // console.log('invitation sent to ' + obj.email)
      // console.log('sentInvite', obj)
      if(obj.success) {
        growl.success('Invitation sent to ' + obj.email);
      } else {
        growl.error('Could not send invitation to ' + obj.email);
      }
    });

  });


      // var count = 0;
      // console.log(resultArray);
      // var branch;




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
    //     // console.log(node)
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
    //       // console.log('branch after push: ', branch)

    //       if (child.children.length > 0){
    //         var k = 0;
    //         while (k < child.children.length){
    //           // console.log('k: ', k)
    //           branch = treeChild.children;
    //           // console.log('branch: ', branch)
    //           k++
    //           // console.log('k: ', k)
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


    // if (NodeService.nodes.length === 0){
    //   // console.log('in here: ', NodeService.nodes.length)
    //   // console.log('storyService: ', StoryService.getData())
    //   $scope.getNodesPerStory = function(){
    //   	var obj = {
    //   		storyId: StoryService.getData()
    //   	}

    //   	console.log('params obj', obj)
    //   	ExploreStories.getNodes(obj, function(results){
    //   		// results.forEach(function(result){
    //   			// NodeService.nodes.push(result)
    //         // $scope.parentId = results[results.length -1]._id;
    //         // console.log(result);
    //         $scope.results = results;
    //         // console.log('results: ', results)

    //         var tree = getTree(results)
    //         // NodeService.nodes = tree
    //         // console.log('tree: ', tree)
    //         buildTree(tree)
    //   		// })

    //   	})
    //   }();
    // }




    // #########################################################################


// !! ABSTRACT INTO ITS OWN FILE
angular.module('storyHubApp').controller('shareStoryModalInstanceCtrl', function ($scope, $modalInstance, storyId) {

  $scope.storyId = storyId;
  $scope.recipientEmail = '';

  $scope.ok = function () {
    console.log('clicked ok')

    //this function requires the story id, and the email address
    //of the user invited
    var inviteObj = {
      storyId: $scope.storyId,
      email: $scope.recipientEmail
    }

    $modalInstance.close(inviteObj);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});