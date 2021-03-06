'use strict';

angular.module('storyHubApp')
  .controller('GraphCtrl', function ($scope, $state, $stateParams, ExploreStories, StoryService, Auth, growl, $modal, socket) {

    // <TO JOIN ROOM WHEN LOADED>
    socket.socket.on('joinedRoom', function(data){
      // console.log('controller', data)
      $scope.storyTitle = data.storyName;
    })

    $scope.storyTitle = StoryService.title;
    var data = {
        storyId: $stateParams.storyId,
        username: Auth.getCurrentUser().name
    };
    
    socket.socket.emit('joinRoom', data);
    // <TO JOIN ROOM WHEN LOADED>

    $scope.setParent = function(parentId) {
      $scope.parentId = parentId;
    };


    $scope.writing = {
      text: ''
    };


    $scope.selectNode = function(node) {
      var size = 'md';// Empty : default, lg :large, sm : small
      var modalInstance = $modal.open({
        templateUrl: 'nodeModal.html',
        controller: 'nodeModalController',
        size: size,
        resolve: {
          node: function () {
            return node;
          }
        }
      });
    };


    //This function allows user to leave a story
    $scope.leaveStory = function(){

      var obj = {
        storyId: StoryService.id,
        username: Auth.getCurrentUser().name
      };

      socket.socket.emit('leaveRoom', obj);
      $state.go('landing');
    };


    $scope.submitWriting = function(){
      var obj = {
        text: $scope.writing.text,
        author: Auth.getCurrentUser()._id,
        parentId: this.parentId
      }
      socket.socket.emit('nodeAdded', obj)
    };

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
      });
    };

    socket.socket.on('sentInvite', function(obj){
      if(obj.success) {
        growl.success('Invitation sent to ' + obj.email);
      } else {
        growl.error('Could not send invitation to ' + obj.email);
      }
    });

    socket.socket.on('addNodeToDom', function(node){
      
      $scope.results.push(node);

      if(node.author === Auth.getCurrentUser()._id) {
        // User is author of new node. Set it selected.
        getBranchForNode(node);  
      } else {
        // New node was added by someone else.
        // getBranchForNode($scope.branchFiltered[$scope.branchFiltered.length - 1]);
      }
      
      StoryService.getTree($scope.results, function(tree){
          buildTree(tree)
      }); 

    });


    StoryService.getNodes(function(results){      
      $scope.results = results;

      if($stateParams.nodeId) {
        // console.log('Has nodeId. Most likely redirect from top stories or use of deep linked url.');
        var deeplinkNode = _.find($scope.results, {'_id': $stateParams.nodeId });
        getBranchForNode(deeplinkNode);
      } else {
        // console.log('Does not have nodeId. Handle as normal.');
        // When results are retrieved, set the first node as selected.
        getBranchForNode($scope.results[0]);
      }
    })

    var box = document.getElementById('graphBox');
    var widthToCenter = (box.clientWidth - 120) / 2;

  	var m = [20, 120, 20, 120],
  	    w = 1280 - m[1] - m[3],
  	    h = 800 - m[0] - m[2],
  	    i = 0,
  	    root,
  	    verticalPadding = 25, // Fixed value in px
  	    horizontalPadding = 3;// Ratio



  	var d3Tree = d3.layout.tree().size([h, w]);

  	var diagonal = d3.svg.diagonal().projection(function(d) { 
      return [d.x / horizontalPadding, d.y]; 
    });

  	var vis = d3.select("#graphBox").append("svg:svg")  	    
  	    .append("svg:g")
        .attr("transform", "translate(" + widthToCenter + ", 20)");
        

    function getBranchForNode(node) {

      $scope.branchFiltered = _.select($scope.results, function(ancestor){
        return node.ancestors.indexOf(ancestor._id) !== -1 || ancestor._id === node._id;
      });

    };

    var node;
    var duration = d3.event && d3.event.altKey ? 5000 : 500;
    var nodes;

  	function update(source) {
  	  


function updateNode() {
//##################


      // Compute the new tree layout.
      nodes = d3Tree.nodes(root).reverse();

      var maxHeight = 0;

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { 
        d.y = d.depth * verticalPadding; 
        
        // console.log('d.y', d.y)

        if(d.y > maxHeight) {
          maxHeight = d.y;
        }
      });

      
      document.getElementById('graphBox').style.height= (maxHeight < 50 ? 100 : (maxHeight + 60)) + 'px';
      

      // Update the nodes…
      node = vis.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("svg:g")
          .attr("class", "node")
          .attr("transform", function(d) { 
            return "translate(" + source.x0 / horizontalPadding + "," + source.y0 + ")"; 
          })
          .on("click", function(d) {
            getBranchForNode(d);
            $scope.showAddLine = false;
            updateNode();
            // Do apply to update the view.
            $scope.$apply();
          });

      

      nodeEnter.append("svg:circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return "black"; });
//####################

  	  // Transition nodes to their new position.
  	  var nodeUpdate = node.transition()
  	      .duration(duration)
  	      .attr("transform", function(d) { return "translate(" + d.x / horizontalPadding + "," + d.y + ")"; });//

      
  	  nodeUpdate.select("circle")
  	      .attr("r", function(d){
            if(typeof $scope.branchFiltered !== 'undefined' && $scope.branchFiltered.length > 0) {
              var endOfBranchNode = $scope.branchFiltered[$scope.branchFiltered.length - 1];
              if(d._id === endOfBranchNode._id) {
                return 7;
              } 
            } 
            return 4.5;
          })
  	      .style("fill", function(d) {                        
            if(typeof $scope.branchFiltered !== 'undefined' && $scope.branchFiltered.length > 0) {
              var endOfBranchNode = $scope.branchFiltered[$scope.branchFiltered.length - 1];
              var ance = endOfBranchNode.ancestors;



              if(ance.indexOf(d._id) !== -1 || d._id === endOfBranchNode._id){
                // console.log('greener fill for', d)
                return "#42f6ce";// Current selected branch.
              } 
            }
            return "black";// Default color.
  	      })
          .style("stroke", function(d) {
            if(typeof $scope.branchFiltered !== 'undefined' && $scope.branchFiltered.length > 0) {
              var endOfBranchNode = $scope.branchFiltered[$scope.branchFiltered.length - 1];
              var ance = endOfBranchNode.ancestors;

              if(ance.indexOf(d._id) !== -1 || d._id === endOfBranchNode._id){
                // console.log('greener border for', d)
                return "#42f6ce";// Current selected branch.
              } 
            }
            return "black";// Default color.
          });

  	  // nodeUpdate.select("text")
  	  //     .style("fill-opacity", 1);
}
    updateNode();

  	  // Transition exiting nodes to the parent's new position.
  	  var nodeExit = node.exit().transition()
  	      .duration(duration)
  	      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x / horizontalPadding + ")"; })
  	      .remove();

  	  nodeExit.select("circle")
  	      .attr("r", 1e-6);

  	  nodeExit.select("text")
  	      .style("fill-opacity", 1e-6);

  	  // Update the links…
  	  var link = vis.selectAll("path.link")
  	      .data(d3Tree.links(nodes), function(d) { return d.target.id; });

  	  // Enter any new links at the parent's previous position.
  	  link.enter().insert("svg:path", "g")
  	      .attr("class", "link")
  	      .attr("d", function(d) {
  	        var o = {x: source.x0 / horizontalPadding, y: source.y0};
  	        return diagonal({source: o, target: o});
  	      })
  	    .transition()
  	      .duration(duration)
  	      .attr("d", diagonal);

  	  // Transition links to their new position.
  	  link.transition()
  	      .duration(duration)
  	      .attr("d", diagonal);

  	  // Transition exiting nodes to the parent's new position.
  	  link.exit().transition()
  	      .duration(duration)
  	      .attr("d", function(d) {
  	        var o = {x: source.x / horizontalPadding, y: source.y};
  	        return diagonal({source: o, target: o});
  	      })
  	      .remove();

  	  // Stash the old positions for transition.
  	  nodes.forEach(function(d) {
  	    d.x0 = d.x;
  	    d.y0 = d.y;
  	  });
  	}

  	// Toggle children.
  	function toggle(d) {
  	  if (d.children) {
  	    d._children = d.children;
  	    d.children = null;
  	  } else {
  	    d.children = d._children;
  	    d._children = null;
  	  }
  	}


    if($stateParams.newStory !== true){
      StoryService.getNodes(function(nodes){
        StoryService.getTree(nodes, function(tree){
          buildTree(tree)
        })
      })
    }

    // #########################################################################
    function buildTree(rootNode) {
        // debugger;
        root = rootNode;
        root.x0 = h / 2;
        root.y0 = 0;

        function toggleAll(d) {
          if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
          }
        }

        update(root);
    }



    // ##############################################################################
    // <EXPORT PDF>
    // ##############################################################################
    $scope.exportPDF = function() {
      console.log('Exporting PDF.');
      
      var doc = new jsPDF();

      // We'll make our own renderer to skip this editor
      var specialElementHandlers = {
        '#exportBtn': function(element, renderer){
          return true;
        }
      };
      // All units are in the set measurement for the document
      // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
      doc.fromHTML($('#storyBox').get(0), 15, 15, {
        'width': 170, 
        'elementHandlers': specialElementHandlers
      });

        doc.save('FalcorExport.pdf');

    }
    
    // ##############################################################################
    // </EXPORT PDF>
    // ##############################################################################
  });

// !! ABSTRACT INTO ITS OWN FILE
angular.module('storyHubApp').controller('shareStoryModalInstanceCtrl', function ($scope, $modalInstance, storyId) {

  $scope.storyId = storyId;
  $scope.recipientEmail = '';

  $scope.ok = function () {

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
