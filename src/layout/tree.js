/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

import {getDepth} from './utils';

export default class {
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
  }

  drawTreeCentered(root, visited_leafs_parent=0, layer=1){
      root.centered = true;
      root.depth_visited = false; // so that getDepth does not raise error if another tree layout is called subsequently
      // branch order is for now stable but unpredictable, see layouts.cri
      let visited_leafs = 0;
      for (let i=0; i < root.children.length; i++){
          let child = root.children[i];
          if (child.centered != true){
              visited_leafs += this.drawTreeCentered(child, visited_leafs+visited_leafs_parent, layer+1);
          }
      }
      if (root.children == 0){
          visited_leafs++;
      }
      // moving to parent, position node
      root.y = this.stepy*(visited_leafs_parent+(visited_leafs-1)/2) + this.alphay;
      root.x = (layer-1)*this.stepx + this.alphax;
      return visited_leafs;
  }

  apply () {
      // only one root node supported for now
      // left-right tree by default, let user choose
      // top-down, bottom-top, right-left in subsequent versions
      // hierarchical layouts for non-trees (cyclical graphs) should be
      // implemented separately for now
      let nodes = this._nodes;
      // make hierarchy, annotate parent(s) and children in the nodes
      nodes.forEach(function(n,i){
          n.parents = [];
          n.children = [];
          n.centered = false;
      });
      this._edges.forEach(function(e,i){
          e.source.children.push(e.target);
          e.target.parents.push(e.source);
      });
      // find the root
      for (let i = 0; i < nodes.length; i++){
          if (nodes[i].parents.length == 0){
              var root = nodes[i];
              break;
          }
      }
      const depth = getDepth(root);
      // each layer of tree x = [0+alpha,1-alpha]
      this.alphax = .05;
      this.stepx = (1-2*this.alphax)/(depth-1);
      // posx = alphax + stepx*(depth-1)

      // find the number of leafs to distribute nodes vertically
      let leafs = 0;
      nodes.forEach(function(node){
          if (node.children.length == 0){
              leafs++;
          }
      });
      // each leaf y = [0+alpha,1-alpha]
      this.alphay =  .05;
      this.stepy = (1-2*this.alphay)/(leafs-1);
      // posy = alphay + stepy*(leafn-1)

      this.drawTreeCentered(root);
  }
};
