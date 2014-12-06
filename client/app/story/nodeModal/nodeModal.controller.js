angular.module('storyHubApp')
  .controller('nodeModalController', function ($scope, $modalInstance, $modal, node, Auth) {

  	$scope.cancel = function () {
  	  $modalInstance.dismiss('cancel');
  	};

  	$scope.write = function() {
  	  console.log(node);

  	  var size = '';// Empty : default, lg :large, sm : small
  	  var modalInstance = $modal.open({
  	    templateUrl: 'writingModal.html',
  	    controller: 'writingModalController',
  	    size: size,
  	    resolve: {
  	      node: function () {
  	        return node;
  	      }
  	    }
  	  })

      modalInstance.result.then($modalInstance.close('done'))
  	};

    $scope.rateNode = function(){
      var nodeId = node._id
      var obj = {
        userId: Auth.getCurrentUser()._id
      }
      console.log('nodeId', nodeId)
      console.log('obj', obj)
      // console.log('sent obj: ', obj.userId)
      ExploreStories.rateNodes(nodeId, obj, function(result){
        // console.log('liked node: ', result)
      })
    }



  })
  .controller('writingModalController', function ($scope, $modalInstance, node, Auth, socket) {
  	// console.log('lets write')
  	$scope.cancel = function () {
  	  $modalInstance.dismiss('cancel');
  	};
    $scope.writing = '';

    $scope.submitWriting = function(){
      console.log(node.parentId)
      var obj = {
        text: $scope.writing,
        author: Auth.getCurrentUser()._id,
        parentId: node._id
      }
      console.log(obj)
      socket.socket.emit('nodeAdded', obj);
      $modalInstance.close('done');
    };
  	

  })