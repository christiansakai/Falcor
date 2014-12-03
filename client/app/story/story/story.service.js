'use strict';

angular.module('storyHubApp')
  .factory('StoryService', function (ExploreStories) {
    
    
    var Story = {
      id: '',
      title: '',
      branchFrom: '',
      getNodes: function(cb){
        var obj = {
          storyId: this.id
        }
          ExploreStories.getNodes(obj, function(results){
              console.log('results', results);
              cb(results)
          })
      },
      getTree: function(resultArray, cb){
        // console.log('resultArray', resultArray)
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
               if (branch.indexOf(treeChild) === -1){
                 branch.push(treeChild)            
               }

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
      	cb(tree);
      }
    }

    return Story;

  });
