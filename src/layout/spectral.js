/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

import {EigenvalueDecomposition} from 'ml-matrix';
import {create2dArray} from './utils';

function twoSmallest (arr) {
    const min = Math.min.apply(null, arr), // get the max of the array
        mini = arr.indexOf(min);
    arr[mini] = Infinity; // replace max in the array with -infinity
    const second_min = Math.min.apply(null, arr), // get the new max 
        second_mini = arr.indexOf(second_min);
    arr[second_mini] = Infinity; // replace max in the array with -infinity
    const third_min = Math.min.apply(null, arr), // get the new max 
        third_mini = arr.indexOf(third_min);
    return [second_mini, third_mini];
}

function normalize (x, y) {
    let maxx = Math.max.apply(null, x.map(Math.abs)),
        maxy = Math.max.apply(null, y.map(Math.abs));
    let minx = Math.min.apply(null, x),
        miny = Math.min.apply(null, y);
    for(let i=0; i<x.length; ++i){
        x[i] = 0.1+(x[i]-minx)/((maxx-minx)*1.25);
        y[i] = 0.1+(y[i]-miny)/((maxy-miny)*1.25);
    }
    return [x, y];
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
      let A = create2dArray(this._nodes.length, this._nodes.length);
      // build the adjacency matrix
      for (let i=0; i<this._edges.length; ++i){
          let ii = this._edges[i].source.index;
          let j = this._edges[i].target.index;
          A[ii][j] = -1; // not considering edge weight for now (the example json files don't have weight)
          A[j][ii] = -1; // not considering edge weight for now (the example json files don't have weight)
      }
      // build the diagonal of degrees
      // NOT subtract adjacency from degrees but:
      // substitute diagonal by degrees
      for (let i=0; i<this._nodes.length; ++i){
          A[i][i] = -A[i].reduce((a, b) => a+b, 0);
      }
      let foo = new EigenvalueDecomposition(A);
      const iii = twoSmallest(foo.realEigenvalues);
      const foo_ = foo.eigenvectorMatrix.transpose();
      const x = foo_[iii[0]];
      const y = foo_[iii[1]];
      const xy = normalize(x, y);
      // var fooo = new Matrix.EigenvalueDecomposition(A);
      // var fooo = new Matrix.EigenvalueDecomposition(A);
      // recipe from http://www.sfu.ca/personal/archives/richards/Pages/NAS.AJS-WDR.pdf
      // and implemented in networkx/drawing/layout.py
      this._nodes.forEach(function(node, i){
          node.x = xy[0][i];
          node.y = xy[1][i];
      }); 
  }
};
