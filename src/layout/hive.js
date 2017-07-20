/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

import {degrees} from 'utils';

export default class {
  // get degree of all nodes
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this._margin = 0.05; // from [0,1] borders
    this._radius = 0.05; // of the empty circle on the center
    this._nlines = 5;
  }
  apply () {
      var nd = degrees(this._nodes, this._edges);
      
      var nodes_segment = this._nodes.length / this._nlines;
      var segment = 0.5 - (this._margin + this._radius);
      var step = segment / nodes_segment;
      var angle = 2*Math.PI/this._nlines;
      var j = 0;
      for(let i=0; i<this._nodes.length; ++i){
          let ii = nd.nodes[i].index;
          this._nodes[ii].x = 0.5+(this._radius + step*(i-j*nodes_segment))*Math.cos(angle*j+Math.PI/2);
          this._nodes[ii].y = 0.5+(this._radius + step*(i-j*nodes_segment))*Math.sin(angle*j+Math.PI/2);
          j = Math.floor(i/nodes_segment);
      }
  }
};
