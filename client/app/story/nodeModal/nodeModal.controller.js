angular.module('storyHubApp')
  .controller('nodeModalController', function ($scope, $modalInstance, $modal, node) {

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
  	};


  })
  .controller('writingModalController', function ($scope, $modalInstance, node) {
  	// console.log('lets write')
  	$scope.cancel = function () {
  	  $modalInstance.dismiss('cancel');
  	};
  	

  })