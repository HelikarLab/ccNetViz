/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

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
    angle = 2.Math.PI/nodes.length;
  }
  function degrees(nodes, edges) {
			// should return ordered nodes and their degrees - high to low
			var degrees = Array(nodes.length).fill(0);
			edges.forEach(function(e) {
					degrees[e.source.index] += 1;
					degrees[e.target.index] += 1;
			}); // check to see if not getting double of the degree in undirected graphs
			//getting the order of nodes from highest to lowest degrees
			var mapped = degrees.map(function(el, i) {
					return { index: i, value: el };
			});
			mapped.sort(function(a, b) {
					return +(a.value < b.value) || +(a.value === b.value) - 1;
			});
			ordered_degrees = mapped.map(function(el){
					return degrees[el.index];
			});
			return mapped_nodes, ordered_degrees;
  }
  apply () {
			var nodes_, degrees_ = degrees(this._nodes, this._edges);
			nodes_.forEach(function(node, i){
					node.x = Math.cos(i*angle);
					node.y = Math.sin(i*angle);
					node.weight = degrees_[i];
			}); 
  }
};
