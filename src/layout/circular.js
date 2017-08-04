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
  // let user define at least: starting angle and radius and
  // clock/cclock direction
  // size of vertices
  // more: a ratio of compactness for the more/less connected nodes
  // a spiral ratio with a rotation ratio for having more than 2pi
  // distribution of nodes when spiriling
  // use some other ordering criterion than degree? Strength?
  // defined by user and found as attribute of each node?
  // random ordering, minimal crossing of edges?
  constructor(nodes, edges, layout_options) {
    this._nodes = nodes;
    this._edges = edges;
    const margin = 0.05;
    const center = [0.5, 0.5];
    let defaults = {
        "angle_step": 2*Math.PI/nodes.length,
        "starting_angle": 0,
        "center": center,
        "radius": Math.max.apply(null, center) - margin, // initial radius
        "angle_ratio": 1, // how many 2*pi from first to last nodes
        "radius_ratio": 1, // factor that radius changes after 2*pi
        "divisions": 1 // how many partitions of the circle are used.
            // I.e. each partition has angle 2*pi/divisions;
            // and each successive node is placed in each successive partition
    }
    ccNetViz_utils.extend(defaults, layout_options);
    this._options = defaults;
  }
  apply () {
      const nd = degrees(this._nodes, this._edges);
      const angle0 = this._options.starting_angle;
      const astep = this._options.angle_step*this._options.angle_ratio;
      const center = this._options.center;
      const ri = this._options.radius; // initial
      const rf = this._options.radius_ratio*this._options.radius; // final
      const divisions = this._options.divisions;
      const nnodes = this._nodes.length;
      for (let i=0; i<nnodes; ++i){
          const radius = ri + i*(rf-ri)/(nnodes-1);
          const angle = angle0+ Math.floor(i/divisions) * astep + (2*Math.PI/divisions) * (i%divisions);
          this._nodes[nd.nodes[i].index].x = center[0]+Math.cos(angle)*radius;
          this._nodes[nd.nodes[i].index].y = center[1]+Math.sin(angle)*radius;
          this._nodes[nd.nodes[i].index].weight = nd.degrees[i];
      }
  }
};
