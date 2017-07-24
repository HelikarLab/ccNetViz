/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

// inspired in Matlab implementation
// and JS transcription in
// https://github.com/alanmeeson/spectral-graph-layout

import {create2dArray} from './utils';

export default class {
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this._epsilon = 1e-8; // tolerance
    this._MAX_ITTERATIONS = 100; //We use power iteration, this is analogous to wall time to avoid infinite loops.
    this._num_elements = nodes.length; //number of nodes in graph
    this._dims = 2;
  }
  apply () {
      let A = create2dArray(this._nodes.length, this._nodes.length);
      // build the adjacency matrix
      for (let i=0; i<this._edges.length; ++i){
          let ii = this._edges[i].source.index;
          let j = this._edges[i].target.index;
          A[ii][j] = 1; // not considering edge weight for now (the example json files don't have weight)
      }
      const D = deg(A); //degree of each node in graph (number of connections).

      const dims = this._dims + 1; //add one to the dims to allow for the first eigen vector
      let u = new Array(dims);//declare the eigen vector matrix
      u[0] = normalize(ones(this._num_elements)); //create & normalize the first eigen vector
      for (let i = 1; i < dims; i++) u[i] = zeros(this._num_elements); //create empty space for the other eigen vectors

      //Power iteration to determine the remaining eigen vectors.
      for (let k=1; k < dims; k++) { //for each eigen vector after the first, 
          //initialize eigen vector with random values
          let uhk = normalize(rand(this._num_elements));

          let itt_count = 0; //we are allowing a max of 100 iterations, to avoid hanging and infinite loops. (specified above in constants)
          let stop = false; //stopping criterion flag.
          while (!stop) { // do...while using flags to keep it consistent with my matlab implementation

              //D-orthogonalize against previous eigenvectors
              let uk = uhk.slice();
              for (let l = 0; l < k; l++) {						
                  let ul = u[l]; //extract the l-th eigen vector

                  //Calculate (uk'.D.ul)/(ul'.D.ul)
                  let top_ = 0;
                  let bottom = 0;
                  for (let vmi = 0; vmi < uk.length; vmi++) {
                      top_ += (uk[vmi] * D[vmi] * ul[vmi]);
                      bottom += (ul[vmi] * D[vmi] * ul[vmi]);
                  }
                  const ratio = top_ / bottom;

                  //uk = uk - ((uk' . D . ul) / (ul' . D ul)) . ul
                  for (let vsi = 0; vsi < uk.length; vsi++) {
                      uk[vsi] = uk[vsi] - (ratio * ul[vsi]);
                  }
              }

              //multiply with .5(I+D^-1 A)
              for (let i = 0; i < uhk.length; i++) {
                  uhk[i] = 0.5 * (uk[i] + dot(A[i], uk) / D[i]);
              }


              uhk = normalize(uhk);

              itt_count = itt_count + 1;
              stop = (itt_count > 100) | !(dot(uhk, uk) < (1-this._epsilon));
          }
          u[k] = uhk.slice();	
      }

      //discard the first eigenvector which should be [ones].
      // var v = new Array(u.length);
      // for (var i=0; i < u.length; i++) {
      //     v[i] = new Array(u[i].length);
      //     for (var j=0; j < u[i].length; j++) v[i][j] = u[i][j];
      // }
      const x = normalize2(u[1]);
      const y = normalize2(u[2]);
      this._nodes.forEach(function(node, i){
          node.x = x[i];
          node.y = y[i];
      }); 
  }
};

function deg(graph) {
    //Calculate the degree of each node from the graph matrix.
    let d = zeros(graph.length);

    //degree of node i is the sum of the weights of all edges connected to it.
    for (let i = 0; i < graph.length; i++) {
        let node_degree = 0;
        for (let j = 0; j < graph[i].length; j++) {
            node_degree += graph[i][j];
        }
        d[i] = node_degree+1;
    }

    return d;
}

function dot(a,b) {
    //inner product of two vectors
    let d = 0;
    for (let i = 0; i < a.length; i++) {
        d += a[i] * b[i];
    }
    return d;
}

function euclideanDistance(coordinates) {
    //calculate the euclidean distance between two points/vectors.
    // used for normalization.
    let d = 0;

    for (let i = 0; i < coordinates.length; i++) {
        d += Math.pow(coordinates[i], 2);
    }
    return Math.sqrt(d);
}

function normalize(arr) {
    //normalizes a vector = arr/||arr||
    const d = euclideanDistance(arr);
    let narr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        narr[i] = arr[i] / d;
    }

    return narr;
}

function rand(n) {
    //create a vector of length n and fill with random numbers.
    let arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = Math.random();
    return arr;
}

function add(a, b) {
    let c = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
        c[i] = new Array(a[i].length);
        for (let j = 0; j < a[i].length; j++) c[i][j] = a[i][j] + b[i][j];
    }
    return c;
}

function symmetricRandMatrix(n, ulim) {
    let mat = new Array(n);
    for (let i = 0; i < n; i++) {
        mat[i] = new Array(n);
        mat[i][i] = 0;
    }
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            mat[i][j] = ulim * Math.random();
            mat[j][i] = mat[i][j];
        }
    }
    return mat;
}

function zeros(n) {
    //create a vector filled with zeros
    let arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = 0;
    return arr;
}

function ones(n) {
    //create a vector filled with ones
    let arr = new Array(n);
    for (let i = 0; i < n; i++) arr[i] = 1;
    return arr;
}

function normalize2 (x) {
    let maxx = Math.max.apply(null, x.map(Math.abs));
    let minx = Math.min.apply(null, x);
    for(let i=0; i<x.length; ++i){
        x[i] = 0.1+(x[i]-minx)/((maxx - minx)*1.25);
    }
    return x;
}
