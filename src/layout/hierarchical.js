/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

export default class {
  // this layout should handle any digraph
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this.alphay = 0.05; // y margin
    this.alphax = 0.05; // x margin
  }

  makeLayers(nodes, layer){
      if (nodes.length > 1){
          const stepy = (1 - 2*this.alphay)/(nodes.length-1);
          for (let i=0; i<nodes.length; ++i){
              nodes[i].visited = true;
              nodes[i].layer = layer; // makes x afterwards
              nodes[i].y = this.alphay + i*stepy;
          }
      }
      else {
          nodes[0].visited = true;
          nodes[0].layer = layer; // makes x afterwards
          nodes[0].y = 0.5;
      }
      let next_layer = [];
      for (let i=0; i<nodes.length; i++){
          let neighbors = nodes[i].parents.concat(nodes[i].children);
          for (let j=0; j < neighbors.length; j++){
              if (neighbors[j].visited == false && !next_layer.includes(neighbors[j])){
                  next_layer.push(neighbors[j]);
              }
          }
      }
      if (next_layer.length == 0){
          return layer;
      }
      else {
          return this.makeLayers(next_layer, layer+1);
      }
  }

  apply () {
      // left-right tree by default, let user choose
      // top-down, bottom-top, right-left in subsequent versions
      // hierarchical layouts for trees (acyclic graphs) are
      // implemented separately for now
      let nodes = this._nodes;
      nodes.forEach(function(n,i){
          n.parents = [];
          n.children = [];
          n.visited = false;
      });
      this._edges.forEach(function(e,i){
          e.source.children.push(e.target);
          e.target.parents.push(e.source);
      });
      // find the roots:
      // nodes defined by the user as roots OR
      // nodes with in-degree == 0 OR
      // nodes with greatest in-degree (or degree if undirected graph)
      let roots = [];
      for (let i = 0; i < nodes.length; i++){
          if (nodes[i].isroot == true){ // has to be on the json file of the graph
              roots.push(nodes[i]);
          }
      }
      if (roots.length == 0){
          for (let i = 0; i < nodes.length; i++){
              if (nodes[i].parents.length == 0){
                  roots.push(nodes[i]);
              }
          }
      }
      if (roots.length == 0){
          // calculate max out-degree
          let max_outdegree = 0;
          nodes.forEach(function(node){
              if (node.children.length > max_outdegree){
                  max_outdegree = node.children.length;
              }
          });
          // choose vertices with greatest out-degree
          nodes.forEach(function(node){
              if (node.children.length == max_outdegree){
                  roots.push(node);
              }
          });
      }
      // number of layers and max number of nodes in each layer
      // has to be found by making the layout
      // there are two approaches to finding the nodes in each layer:
      // 1) each layer has all the neighbors of the nodes in the previous layer
      // 2) follow links and then place non visited nodes on the layer of neighbors OR
      // this layout implements the first of these approaches.
      const depth = this.makeLayers(roots, 1);
      // each layer of tree x = [0+alpha,1-alpha]
      const stepx = (1-2*this.alphax)/(depth-1);
      // posx = alphax + stepx*(depth-1)
      for (let i=0; i<this._nodes.length; ++i){
          this._nodes[i].x = this.alphax + stepx*(this._nodes[i].layer - 1);
      }
  }
};
