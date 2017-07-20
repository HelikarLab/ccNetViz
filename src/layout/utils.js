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
  var degrees = Array(nodes.length).fill(0);
  edges.forEach(function(e) {
      degrees[e.source.index] += 1;
      degrees[e.target.index] += 1;
  }); // check to see if not getting double of the degree in undirected graphs
  //getting the order of nodes from highest to lowest degrees
  var ordered_nodes = degrees.map(function(el, i) {
      return { index: i, value: el };
  });
  ordered_nodes.sort(function(a, b) {
      return +(a.value < b.value) || +(a.value === b.value) - 1;
  });
  var ordered_degrees = ordered_nodes.map(function(el){
      return degrees[el.index];
  });
  return { nodes: ordered_nodes,
           degrees: ordered_degrees } ;
}

export function getDepth(obj) {
    var depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
            var tmpDepth = getDepth(d);
            if (tmpDepth > depth) {
                depth = tmpDepth;
            }
        })
    }
    return 1 + depth;
}

