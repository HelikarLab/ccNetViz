/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

function isOrphan(node){
    let orphan = true;
    for (let i=0; i<node.parents.length; ++i){
        let parent_ = node.parents[i];
        if (parent_ != node)
            orphan = false;
    }
    for (let i=0; i<node.children.length; ++i){
        let child = node.children[i];
        if (child != node)
            orphan = false;
    }
    return orphan;
}

export default class {
  // this layout should handle any digraph
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this.alphay = 0.05; // y margin
    this.alphax = 0.05; // x margin
    this.components = {"current_component": 0, "depth": 1};
    this.unvisited = nodes;
  }
  
  initHierarchy(){
      this._nodes.forEach(function(n,i){
          n.parents = [];
          n.children = [];
          n.visited = false;
      });
      this._edges.forEach(function(e,i){
          e.source.children.push(e.target);
          e.target.parents.push(e.source);
      });
  }

  separateOrphans(){
      let orphans = [];
      let nodes = [];
      for (let i=0; i< this._nodes.length; ++i){
          let node = this._nodes[i];
          if (isOrphan(node))
              orphans.push(node);
          else
              nodes.push(node);
      }
      return orphans;
  }

  findRoots(nodes){
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
      return roots;
  }

  placeOrphans(nodes, max_layer){
      const stepy = (1 - 2*this.alphay)/(nodes.length-1);
      for (let i=0; i<nodes.length; ++i){
          nodes[i].y = this.alphay + i*stepy;
          nodes[i].x = max_layer+1;
      }
      if (nodes.length > 0)
          return max_layer+1;
      else
          return max_layer;
  }

  unvisitedNodes(){
      let nodes = [];
      let orphans = this.orphans;
      this.unvisited.forEach(function(node){
          if (node.visited == false && !(node in orphans))
              nodes.push(node);
      });
      if (nodes.length != this.unvisited){
          this.maybe_more = true;
          this.unvisited = nodes;
      } else this.maybe_more = false;
  }

  placeAdditional(){
      // place non-visited nodes in between layers
      let aux_layers = {};
      let c = this.components[this.components.current_component];
      let layers = c.layers;
      for (let i=0; i<this.unvisited.length; ++i){
          let node = this.unvisited[i];
          let lowest_layer = this.components.depth;
          let child_found = false;
          for(let j=0; j<node.children.length; ++j){
              let child = node.children[j];
              if (child.visited == true){
                  child_found = true;
                  if(child.layer <= lowest_layer){ // child has to be visited to have a layer
                      lowest_layer = child.layer;
                  }
                  break;
              }
          }
          if (child_found){
              node.visited = true;
              // node.index = lowest_layer-sep;
              if ( !((lowest_layer-sep) in layers))
                  layers[lowest_layer-sep] = []
              layers[lowest_layer-sep].push(node)
          }
          else {
              let lowest_layer = max_layer;
              let parent_found = false;
              for(let j=0; j<node.parents.length; ++j){
                  let parent_ = node.parents[j];
                  if (parent_.visited == true){
                      parent_found = true;
                      if(parent_.layer <= lowest_layer){ // child has to be visited to have a layer
                          lowest_layer = parent_.layer;
                      }
                  }
              }
              if (parent_found){
                  node.visited = true;
                  node.x = lowest_layer+sep;
                  if ( !((lowest_layer+sep) in layers) )
                      layers[lowest_layer+sep] = []
                  layers[lowest_layer+sep].push(node)
              }
          }
      }
  }

  initializeComponent(component){
      this.components[component] = {};
      this.components[component].max_nodes_layer = 0;
      if (component > 0)
          this.components[component].index_offset = this.components[component-1].vertical_nodes;
      else
          this.components[component].index_offset = 0;
      this.components[component].current_layer = 1;
      //this.components[component].layers = {"nodes": [], "layer_value": 1};
      this.components[component].layers = {};
      this.components[component].vertical_nodes = 0;
  }

  layerNodes(nodes){
      if (!(this.components.current_component in this.components))
          this.initializeComponent(this.components.current_component);
      let c = this.components[this.components.current_component];
      if (nodes.length > c.vertical_nodes)
          c.vertical_nodes = nodes.length;
      c.layers[c.current_layer] = [];
      for (let i=0; i<nodes.length; ++i){
          nodes[i].visited = true;
          c.layers[c.current_layer].push(nodes[i]);
      }
      let next_layer = [];
      for (let i=0; i<nodes.length; i++){
          let candidates = nodes[i].children;
          for (let j=0; j < candidates.length; j++){
              if (candidates[j].visited == false && !next_layer.includes(candidates[j])){
                  next_layer.push(candidates[j]);
              }
          }
      }
      if (next_layer.length > 0){
          c.current_layer++;
          if (this.components.depth<c.current_layer)
              this.components.depth = c.current_layer;
          this.layerNodes(next_layer);
      }
  }

  apply () {
      // left-right tree by default, let user choose
      // top-down, bottom-top, right-left in subsequent versions
      // hierarchical layouts for trees (acyclic graphs) are
      // implemented separately for now

      // number of layers and max number of nodes in each layer
      // has to be found by making the layout
      // there are two approaches to finding the nodes in each layer:
      // 1) each layer has all the neighbors of the nodes in the previous layer
      // 2) follow links and then place non visited nodes on the layer of neighbors OR
      // this layout implements the second of these approaches.

      this.initHierarchy();
      this.orphans = this.separateOrphans();
      this.unvisitedNodes();
      while (this.unvisited.length > 0){
          let roots = this.findRoots(this.unvisited);
          this.layerNodes(roots);
          this.unvisitedNodes(); // update unvisited nodes
          this.maybe_mode = true;
          while (this.maybe_more){
              this.placeAdditional(); // place additional nodes linked to this component
              this.unvisitedNodes(); // update unvisited nodes
          }
          this.components.current_component++;
      }
      this.components.vertical_nodes = 0;
      for (let i=0; i<this.components.current_component; i++){
          this.components.vertical_nodes += this.components[i].vertical_nodes;
      }

      // layerNodes should populate the dictionary this.components of components and aux variables:
      // components[x] is a component, x is an integer
      // components[x].vertical_nodes is the maximum number of nodes in a layer for the component
      // components[x].layer[j] is the j-th layer on the component, j can be fractional
      // components[x].index_offset is the number of nodes positioned in above components
      // components.ncomponents is the number of components
      // components.vertical_nodes is the sum of the max nodes in any layer of each component
      // components.depth is the maximum number of layers

      // each layer of tree xy = [0+alpha,1-alpha]
      const stepx = (1-2*this.alphax)/(this.components.depth);
      const stepy = (1-2*this.alphay)/(this.components.vertical_nodes);
      for (let i=0; i<this.components.current_component; i++){
          let component = this.components[i];
          for (let layer_val in component.layers){
              let layer = component.layers[layer_val];
              if (layer.length == 1){
                  let node = layer[0];
                  node.x = this.alphax + stepx*layer_val;
                  node.y = this.alphay + stepy*(component.index_offset + component.vertical_nodes/2);
              } else {
                  for (let k=0; k<layer.length; ++k){
                      let node = layer[k];
                      node.x = this.alphax + stepx*layer_val;
                      node.y = this.alphay + stepy*(component.index_offset + k);
                  }
              }
          }
      }
      this.placeOrphans(this.orphans);
  }
};
