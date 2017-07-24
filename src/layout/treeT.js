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

  drawTreeTop(root, visited_leafs_parent=0, layer=1){
    // each node is in vertically on the top of the stack of its leafs
    root.visited = true;
    root.depth_visited = false; // so that getDepth does not raise error if another tree layout is called subsequently
    root.x = this.alphax+this.stepx*(layer-1);
    root.y = 1-(this.alphay+this.stepy*(visited_leafs_parent));
    // visit children until leafs
    let visited_leafs = 0;
    for (let i=0; i < root.children.length; i++){
       let child = root.children[i];
       if (child.centered != true){
         visited_leafs += this.drawTreeTop(child, visited_leafs+visited_leafs_parent, layer+1);
       }
    }
    if(root.children.length == 0){
        visited_leafs++;
    }
    return visited_leafs;
}
  apply () {
      let nodes = this._nodes;
      // make hierarchy, annotate parent(s) and children in the nodes
      // this layout can be run on any graph actually
      // for which the children might be selected e.g. for their degree
      // draw can be decided on other measures, such as closeness centrality or clustering
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

      // give nodes their positions
      // plot each branch in depth first,
      // increment y position for each leaf
      // backtracking to go from leaf to parents
      // and decide if parent is visited (always in tree layout)

      this.drawTreeTop(root);
  }
};
