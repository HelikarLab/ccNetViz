/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

function degrees(nodes, edges) {
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

export default class {
  // get degree of all nodes
  // let user define at least: starting angle and radius and
  // clock/cclock direction
  // size of vertices
  // more: a ratio of compactness for the more/less connected nodes
  // a spiral ratio with a rotation ratio for having more than 2pi
  // distribution of nodes when spiriling
  // use some other ordering criterion than degree? Strength?
  // defined by user and found as attribute of each node?
  // random ordering, minimal crossing of edges?
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this._angle = 2*Math.PI/nodes.length;
    this.nd = 0;
  }
  apply () {
      console.log(this._nodes);
      var nd = degrees(this._nodes, this._edges);
      this.nd = nd;
      console.log(nd);
      var angle = this._angle;
      var nodes = this._nodes;
      nd.nodes.forEach(function(node, i){
          nodes[node.index].x = (1+Math.cos(i*angle))*.5;
          nodes[node.index].y = (1+Math.sin(i*angle))*.5;
          nodes[node.index].weight = nd.degrees[i];
      }); 
      console.log(this._nodes);
  }
};
