// var m = [20, 120, 20, 120],
//     w = 1280 - m[1] - m[3],
//     h = 800 - m[0] - m[2],
//     i = 0,
//     root,
//     verticalPadding = 25, // Fixed value in px
//     horizontalPadding = 1;// Ratio

// var d3Tree = d3.layout.tree()
//     .size([h, w]);

// var diagonal = d3.svg.diagonal().projection(function(d) { return [d.x / horizontalPadding, d.y]; });

// // var vis = d3.select("body").append("svg:svg")
// //     .attr("width", w + m[1] + m[3])
// //     .attr("height", h + m[0] + m[2])
// //     .append("svg:g")
// //     .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

// function update(source) {
//   var duration = d3.event && d3.event.altKey ? 5000 : 500;

//   // Compute the new tree layout.
//   var nodes = d3Tree.nodes(root).reverse();

//   // Normalize for fixed-depth.
//   nodes.forEach(function(d) { d.y = d.depth * verticalPadding; });

//   // Update the nodes…
//   var node = vis.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

//   // Enter any new nodes at the parent's previous position.
//   var nodeEnter = node.enter().append("svg:g")
//       .attr("class", "node")
//       .attr("transform", function(d) { return "translate(" + source.x0 / horizontalPadding + "," + source.y0 + ")"; })//
//       .on("click", function(d) {
//         toggle(d);
//         update(d);
//         console.log('clicked node', d);
//       });

//   nodeEnter.append("svg:circle")
//       .attr("r", 1e-6)
//       .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

//   nodeEnter.append("svg:text")
//       .attr("x", function(d) { return d.children || d._children ? -100 : 10; })
//       .attr("dy", ".35em")
//       .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
//       .text(function(d) { return "some text here"; })
//       .style("fill-opacity", 1e-6);

//   // Transition nodes to their new position.
//   var nodeUpdate = node.transition()
//       .duration(duration)
//       .attr("transform", function(d) { return "translate(" + d.x / horizontalPadding + "," + d.y + ")"; });//

//   nodeUpdate.select("circle")
//       .attr("r", 4.5)
//       .style("fill", function(d) {
//         if(d.isMyBranch) {
//           return "green";
//         }
//         else if(d._children || d.children) {
//           return "red";// Has children.
//         } else {
//           return "lightsteelblue";// No children.
//         }
//       });

//   nodeUpdate.select("text")
//       .style("fill-opacity", 1);

//   // Transition exiting nodes to the parent's new position.
//   var nodeExit = node.exit().transition()
//       .duration(duration)
//       .attr("transform", function(d) { return "translate(" + source.y + "," + source.x / horizontalPadding + ")"; })
//       .remove();

//   nodeExit.select("circle")
//       .attr("r", 1e-6);

//   nodeExit.select("text")
//       .style("fill-opacity", 1e-6);

//   // Update the links…
//   var link = vis.selectAll("path.link")
//       .data(d3Tree.links(nodes), function(d) { return d.target.id; });

//   // Enter any new links at the parent's previous position.
//   link.enter().insert("svg:path", "g")
//       .attr("class", "link")
//       .attr("d", function(d) {
//         var o = {x: source.x0 / horizontalPadding, y: source.y0};
//         return diagonal({source: o, target: o});
//       })
//     .transition()
//       .duration(duration)
//       .attr("d", diagonal);

//   // Transition links to their new position.
//   link.transition()
//       .duration(duration)
//       .attr("d", diagonal);

//   // Transition exiting nodes to the parent's new position.
//   link.exit().transition()
//       .duration(duration)
//       .attr("d", function(d) {
//         var o = {x: source.x / horizontalPadding, y: source.y};
//         return diagonal({source: o, target: o});
//       })
//       .remove();

//   // Stash the old positions for transition.
//   nodes.forEach(function(d) {
//     d.x0 = d.x;
//     d.y0 = d.y;
//   });
// }

// // Toggle children.
// function toggle(d) {
//   if (d.children) {
//     d._children = d.children;
//     d.children = null;
//   } else {
//     d.children = d._children;
//     d._children = null;
//   }
// }