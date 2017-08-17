/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

import {degrees} from './utils';
import ccNetViz_utils from '../utils';

export default class {
  // get degree of all nodes
  // mode: fill_segment or alternate_segment
  // wiggle segment (cycles and amplitude)
  constructor(nodes, edges, layout_options) {
    this._nodes = nodes;
    this._edges = edges;
    let defaults = {
        starting_angle: Math.PI/2,
        radius: 0.05, // internal radious without nodes
        margin: 0.05,
        direction: "left-right",
        nlines: 5
    }
    ccNetViz_utils.extend(defaults, layout_options);
    this._options = defaults;
  }
  apply () {
      let nd = degrees(this._nodes, this._edges);
      const nodes_segment = Math.ceil(this._nodes.length / this._options.nlines);
      const segment = 0.05 - this._options.radius;
      const step = segment / nodes_segment;
      const angle = 2*Math.PI/this._options.nlines;
      const sangle = this._options.starting_angle;
      const radius = this._options.radius;
      let j = 0;
      for(let i=0; i<this._nodes.length; ++i){
          let ii = nd.nodes[i].index;
          this._nodes[ii].x = 0.05+(radius + step*(i-j*nodes_segment))*Math.cos(angle*j+sangle);
          this._nodes[ii].y = 0.05+(radius + step*(i-j*nodes_segment))*Math.sin(angle*j+sangle);
          j = Math.floor(i/nodes_segment);
      }
      let od = [];
      for(let i=0; i<this._nodes.length; ++i){
          let ii = nd.nodes[i].index;
          od.push(this._nodes[ii]);
      }
      return this._options;
  }
};
