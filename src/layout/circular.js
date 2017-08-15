/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

import {degrees, initHierarchy} from './utils';
import ccNetViz_utils from '../utils';

function topological (nd, nodes){
	let nd_ = {};
	nd_.nodes = [nd.nodes[0]];
	let nodes_ = [];
	for (let i=1; i<nd.nodes.length; ++i){
		nodes[i].degree = nd.degrees[i];
	}

	for (let i=1; i<nodes.length; ++i){
		let degree = nodes[i].degree;
		if ( ( i == (nodes.length -1) || degree != nodes[i+1].degree || fromTo(nodes[i-1], nodes[i]) ) && (nodes[i].picked != true) ){
			nodes_.push(nodes[i]);
			nodes[i].picked=true;
		} else {
			// get all children of last node and see if one of them has degree == degree
			// if true, pick the node, else pick any node with degree == degree
			let children = nodes[i-1].children;
			let found_child = false;
                        for (let j=0; j<children.length; ++j){
				if (children[j].degree == degree){
					nodes_.push(children[j]);
					children[j].picked = true;
					found_child = true;
					break;
				}
			}
			if (found_child == false){
				nodes_.push(nodes[i]);
				nodes[i].picked = true;
			}
		}
	}
	return nodes_;
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
  constructor(nodes, edges, layout_options) {
    this._nodes = nodes;
    this._edges = edges;
    const margin = 0.05;
    const center = [0.5, 0.5];
    let defaults = {
	    margin: 0.05,
	    direction: "left-right",
	    ordering: "degree", // "topological" for degree which also considers the topological order
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
      if (this._options.ordering == "topological") {
	      initHierarchy(this._nodes, this._edges);
              let nodes = nd.nodes.map(function(el){
                  return this._nodes[el.index];
              });
	      let nodes_ = topological(nd, nodes);
	      for (let i=0; i<nnodes; ++i){
		  const radius = ri + i*(rf-ri)/(nnodes-1);
		  const angle = angle0+ Math.floor(i/divisions) * astep + (2*Math.PI/divisions) * (i%divisions);
		  nodes_[i].x = center[0]+Math.cos(angle)*radius;
		  nodes_[i].y = center[1]+Math.sin(angle)*radius;
		  nodes_[i].weight = nodes_.degrees[i];
	      }
      } else {
	      for (let i=0; i<nnodes; ++i){
		  const radius = ri + i*(rf-ri)/(nnodes-1);
		  const angle = angle0+ Math.floor(i/divisions) * astep + (2*Math.PI/divisions) * (i%divisions);
		  this._nodes[nd.nodes[i].index].x = center[0]+Math.cos(angle)*radius;
		  this._nodes[nd.nodes[i].index].y = center[1]+Math.sin(angle)*radius;
		  this._nodes[nd.nodes[i].index].weight = nd.degrees[i];
	      }
      }
      return this._options;
  }
};
