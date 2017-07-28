/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

import {degrees} from './utils';

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
    this._angle_step = 2*Math.PI/nodes.length;
    if (layout_options.starting_angle == null)
	this._starting_angle = 0;
    else
	this._starting_angle = layout_options.starting_angle;
  }
  apply () {
      let nd = degrees(this._nodes, this._edges);
      for (let i=0; i<this._nodes.length; ++i){
          this._nodes[nd.nodes[i].index].x = 0.05+(1+Math.cos(this._starting_angle+i*this._angle_step))*.45;
          this._nodes[nd.nodes[i].index].y = 0.05+(1+Math.sin(this._starting_angle+i*this._angle_step))*.45;
          this._nodes[nd.nodes[i].index].weight = nd.degrees[i];
      }
  }
};
