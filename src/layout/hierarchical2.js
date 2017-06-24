/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

function getDepth(obj) {
    var depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
            var tmpDepth = getDepth(d);
            if (tmpDepth > depth) {
                depth = tmpDepth;
            }
        })
    }
    return 1 + depth
}

function isOrphan(node){
    var orphan = true;
    for (let i=0; i<node.parents.length; ++i){
        parent_ = node.parents[i];
        if (parent_ != node)
            orphan = false;
    }
    for (let i=0; i<node.children.length; ++i){
        child = node.parents[i];
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
    this.components = {"current_component": 0};
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
      var orphans = [];
      var nodes = [];
      for (let i=0; i< this._nodes.length; ++i){
          var node = this._nodes[i];
          if (isOrphan(node))
              orphans.push(node);
          else
              nodes.push(node);
      }
      return [orphans, nodes];
  }
  findRoots(nodes){
      // find the roots:
      // nodes defined by the user as roots OR
      // nodes with in-degree == 0 OR
      // nodes with greatest in-degree (or degree if undirected graph)
      var roots = [];
      for (var i = 0; i < nodes.length; i++){
          if (nodes[i].isroot == true){ // has to be on the json file of the graph
              roots.push(nodes[i]);
          }
      }
      if (roots.length == 0){
          for (var i = 0; i < nodes.length; i++){
              if (nodes[i].parents.length == 0){
                  roots.push(nodes[i]);
              }
          }
      }
      if (roots.length == 0){
          // calculate max out-degree
          var max_outdegree = 0;
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
  }

  placeOrphans(nodes, max_layer){
      var stepy = (1 - 2*this.alphay)/(nodes.length-1);
      for (let i=0; i<nodes.length; ++i){
          nodes[i].y = this.alphay + i*stepy;
          nodes[i].x = max_layer+1;
      }
      if (nodes.length > 0)
          return max_layer+1;
      else
          return max_layer;
  }

  nonVisitedNodes(){
      var nodes = [];
      this._nodes.forEach(function(node){
          if (node.visited == false)
              nodes.push(node);
      });
      return nodes;
  }

  placeAdditional(){
      // place non-visited nodes in between layers

      // find non visited nodes
      var nodes = this.nonVisitedNodes;
      var aux_layers = {};
      var c = this.components[this.current_component];
      for (let i=0; i<nodes.length; ++i){
          var node = nodes[i];
          var lowest_layer = this.components.depth;
          var child_found = false;
          for(let j=0; j<node.children.length; ++j){
              var child = node.children[j];
              if (child.visited == true){
                  child_found = true;
                  if(child.layer <= lowest_layer){ // child has to be visited to have a layer
                      lowest_layer = child.layer;
                  }
              }
          }
          if (child_found){
              node.visited = true;
              node.x = lowest_layer-sep;
              if ( !((lowest_layer-sep) in aux_layers))
                  aux_layers[lowest_layer-sep] = []
              aux_layers[lowest_layer-sep].push(node)
          }
          else {
              var lowest_layer = max_layer;
              var parent_found = false;
              for(let j=0; j<node.parents.length; ++j){
                  var parent_ = node.parents[j];
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
                  if ( !((lowest_layer+sep) in aux_layers) )
                      aux_layers[lowest_layer+sep] = []
                  aux_layers[lowest_layer+sep].push(node)
              }
          }
      }
      var positioned_nodes = [];
      for (var key in aux_layers){
          var layer = aux_layers[key];
          // var stepy = (1 - 2*this.alphay)/(layer.length-1);
          for (let i=0; i<layer.length; ++i){
              layer[i].index = i + index_offset;
              positioned_nodes.push(layer[i]);
          }
      }
      var remaining_nodes = [];
      for (let i=0; i<nodes.length; ++i){
          if (positioned_nodes.indexOf(nodes[i]) == -1)
              remaining_nodes.push(nodes[i]);
      }
      if (remaining_nodes.length > 0){
          if (remaining_nodes.length < nodes.length){
              this.placeNew(remaining_nodes, max_layer, sep*.4);
          } else { // new component
              var roots = this.findRoots(remaining_nodes);
              makeLayers(roots, 1, 0, index_offset);
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
      this.components[component].layers = {"nodes": [], "layer_value": 1};
  }

  layerNodes(nodes){
      if (!(this.current_component in this.components))
          this.initializeComponent(component);
      var c = this.components[component];
      if (nodes.length > c.max_nodes_layer)
          c.max_nodes_layer = nodes.length;
      c.layers[c.current_layer].layer_value = c.current_layer;
      for (let i=0; i<nodes.length; ++i){
          nodes[i].visited = true;
          c.layers[c.current_layer].nodes.push(node);
      }
      var next_layer = [];
      for (let i=0; i<nodes.length; i++){
          var candidates = nodes[i].children;
          for (var j=0; j < candidates.length; j++){
              if (candidates[j].visited == false && !next_layer.includes(candidates[j])){
                  next_layer.push(candidates[j]);
              }
          }
      }
      if (next_layer.length > 0){
          c.current_layer++;
          this.makeLayers(next_layer);
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
      var [orphans, nodes] = separateOrphanNodes();
      while (nodes.length > 0){
          let roots = this.findRoots(nodes);
          nodes = this.layerNodes(roots);
          this.placeAdditional(); // place additional nodes linked to this component
          this.components.current_component++;
      }
      this.placeOrphans(orphans);

      // layerNodes should populate the dictionary this.components of components and aux variables:
      // components[x] is a component, x is an integer
      // components[x].vertical_nodes is the maximum number of nodes in a layer for the component
      // components[x].layer[j] is the j-th layer on the component
      // components[x].layer[j].nodes is the nodes in the layer on the component
      // components[x].layer[j].layer_value the layer value, necessary because we have fractional layers
      // components[x].index_offset is the number of nodes positioned in above components
      // components.ncomponents is the number of components
      // components.vertical_nodes is the sum of the max nodes in any layer of each component
      // components.depth is the maximum number of layers

      // each layer of tree xy = [0+alpha,1-alpha]
      var stepx = (1-2*this.alphax)/(this.components.depth-1);
      var stepy = (1-2*this.alphay)/(this.components.vertical_nodes-1);
      for (let i=0; i<this.components.ncomponents; ++i){
          var component = this.components[i];
          for (let j=0; j<component.layers.length; ++j){
              var layer = component.layers[j];
              if (layer.length == 1){
                  var node = layer[0];
                  node.x = this.alphax + stepx*j;
                  node.y = this.alphay + stepx*(component.index_offset + component.vertical_nodes/2);
              } else {
                  for (let k=0; k<layer.length; ++k){
                      var node = layer[k];
                      node.x = this.alphax + stepx*j;
                      node.y = this.alphay + stepx*(component.index_offset + k);
                  }
              }
          }
      }
      // for (var i=0; i<this._nodes.length; ++i){
      //     this._nodes[i].x = this.alphax + stepx*(this._nodes[i].layer - 1);
      //     this._nodes[i].y = this.alphay + stepy*(this._nodes[i].index - 1);
      // }
  }
};
