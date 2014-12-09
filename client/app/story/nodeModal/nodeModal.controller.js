angular.module('storyHubApp')
  .controller('nodeModalController', function ($scope, $modalInstance, $http, $q, $state, alchemize, $modal, node, Auth, ParseAlchemy) {


    var vm = this; 

    $scope.node = node;

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

    $scope.analyzeBranch = function(){
      console.log('node: ', node)

      var obj = {
        nodeId: node._id
      }

      return $http.get('api/nodes/getSingleBranch/', {params: obj}).then(function(response){
        return response.data; 
      })
    }

    $scope.analyze = function(){
      vm.fetchAlchemyDataForBranch();
      $modalInstance.close('done');
  
    }



    vm.fetchAlchemyDataForBranch = function(){
      $scope.analyzeBranch()
      .then(function(nodes){
        console.log('childless nodes here: ', nodes)
        var textArr = nodes.map(function(childlessNode){
          return childlessNode.text + childlessNode.ancestors.map(function(ancestors){
            return ancestors.text + 'hate ugly wrong bad';
          })
        })
        var text = textArr.join(" ")
        console.log('text to be sent: ', text)
        return alchemize.sendToAlchemy(text)
      }).then(function assessAlchemyData(analysis){
        ParseAlchemy.parseAlchemyData(analysis)
      })
      setTimeout(function(){
        $state.go('d3Keywords')
      }, 400)
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