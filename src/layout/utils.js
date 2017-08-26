/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

export function create2dArray (rows, columns) {
    return [...Array(rows).keys()].map(i => Array(columns).fill(0));
}

export function degrees(nodes, edges) {
  // should return ordered nodes and their degrees - high to low
  let degrees = Array(nodes.length).fill(0);
  edges.forEach(function(e) {
      degrees[e.source.index] += 1;
      degrees[e.target.index] += 1;
  }); // check to see if not getting double of the degree in undirected graphs
  //getting the order of nodes from highest to lowest degrees
  let ordered_nodes = degrees.map(function(el, i) {
      return { index: i, value: el };
  });
  ordered_nodes.sort(function(a, b) {
      return +(a.value < b.value) || +(a.value === b.value) - 1;
  });
  let ordered_degrees = ordered_nodes.map(function(el){
      return degrees[el.index];
  });
  return { nodes: ordered_nodes,
           degrees: ordered_degrees } ;
}

export function getDepth(obj) {
    let depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
	    if (d.depth_visited == true){
		    throw new Error("This layout is only for trees acyclic graphs");
	    }
	    d.depth_visited = true;
            let tmpDepth = getDepth(d);
            if (tmpDepth > depth) {
                depth = tmpDepth;
            }
        })
    }
    return 1 + depth;
}

export function hierarchicalDirection (nodes, direction) {
      if (direction == "right-left"){
          for (let i=0; i<nodes.length; ++i){
              nodes[i].x = 1 - nodes[i].x;
          }
      } else if (direction == "top-down"){ 
          for (let i=0; i<nodes.length; ++i){
              const foo = 1 - nodes[i].x;
              nodes[i].x = nodes[i].y;
              nodes[i].y = foo;
          }
      } else if (direction == "bottom-up"){ 
          for (let i=0; i<nodes.length; ++i){
              const foo = nodes[i].x;
              nodes[i].x = nodes[i].y;
              nodes[i].y = foo;
          }
      } else if (direction != "left-right"){ 
          throw new Error("directions can be only 'left-right' (default), 'right-left', 'top-down' or 'bottom-up'");
      }
}

export function  initHierarchy(nodes, edges){
      nodes.forEach(function(n,i){
          n.parents = [];
          n.children = [];
          n.visited = false;
      });
      edges.forEach(function(e,i){
          e.source.children.push(e.target);
          e.target.parents.push(e.source);
      });
}

export function findRoots_(nodes, root_option) {
   // find the roots:
   // nodes defined by the user as roots OR
   // nodes with in-degree == 0 OR
   // nodes with greatest in-degree (or degree if undirected graph)
   let roots = [];
   if (root_option == "user-defined" || root_option == "auto"){
       for (let i = 0; i < nodes.length; i++){
           if (nodes[i].isroot == true){ // has to be on the json file of the graph
               roots.push(nodes[i]);
           }
       }
   }
   if (root_option == "no-in-degree" || (root_option == "auto" && roots.length == 0) ){
       if (roots.length == 0){
           for (let i = 0; i < nodes.length; i++){
               if (nodes[i].parents.length == 0){
                   roots.push(nodes[i]);
               }
           }
       }
   }
   if (root_option == "degree" || (root_option == "auto" && roots.length == 0) ){
       // calculate max out-degree
       let max_outdegree = 0;
       nodes.forEach(function(node){
           if (node.children.length > max_outdegree){
               max_outdegree = node.children.length;
           }
       });
       // choose vertices with greatest out-degree
       nodes.forEach(function(node){
           if (node.children.length == max_outdegree){
               roots.push(node);
           }
       });
   }

   return roots;
}

export function erdosSectorialization (degrees, min_incidence) {
    let sectorialization = "classification of vertices into hubs, intermediary and peripheral";
    // Returns fractions of hubs, intermediary and peripheral vertices
    // given their degrees and a minimum incidence of histogram bin
    // by comparing the distribution against that of an Erdös-Rényi network.
    // Only basic partitioning using degree is implemented.
    // For other possibilities (using in-out degrees and strengths) see:
    // http://dx.doi.org/10.1016/j.physa.2017.04.109
    
    // get maximum degree
    // make list of distinct degree values
    // make binomial distribution considering probability of edge and max degree
    // derive sectors by comparing the empirical distribution against the binomial
    // model implementation:
    // https://github.com/ttm/percolation/blob/master/percolation/measures/topology/erdosSectors.py

    // not implemented now because it requires an external package (to build the binomial)
}
