/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

import numeric from 'numeric';

function create2dArray (rows, columns) {
    return [...Array(rows).keys()].map(i => Array(columns).fill(0));
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
  }
  apply () {
      var A = create2dArray(this._nodes.length, this._nodes.length);
      // build the adjacency matrix
      // build the diagonal of degrees
      // subtract adjacency from degrees
      // use eigenvectors with greatest values for x,y
      // recipe from http://www.sfu.ca/personal/archives/richards/Pages/NAS.AJS-WDR.pdf
      // and implemented in networkx/drawing/layout.py
      this._nodes.forEach(function(node, i){
          nodes[node.index].x = .5;
          nodes[node.index].y = .5;
      }); 
      console.log(this._nodes);
  }
};
