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

  placeNew(nodes, max_layer, sep=0.4){
      // place non-visited nodes in between layers
      var place_again = false;
      var disconnected_nodes = false;
      var aux_layers = {};
      for (let i=0; i<nodes.length; ++i){
          var node = nodes[i];
          var lowest_layer = max_layer;
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
              if ( (lowest_layer-sep) not in aux_layers)
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
                  if ( (lowest_layer+sep) not in aux_layers)
                      aux_layers[lowest_layer+sep] = []
                  aux_layers[lowest_layer+sep].push(node)
              }
          }
      }
      var positioned_nodes = [];
      for (var key in aux_layers){
          var layer = aux_layers[key];
          var stepy = (1 - 2*this.alphay)/(layer.length-1);
          for (let i=0; i<layer.length; ++i){
              layer[i].y = this.alphay + i*stepy;
              positioned_nodes.push(layer[i]);
          }
      }
      var remaining_nodes = [];
      for (let i=0; i<nodes.length; ++i){
          if (positioned_nodes.indexOf(nodes[i]) == -1)
              remaining_nodes.push(nodes[i]);
      }
      if (remaining_nodes.length > 0){
          this.placeNew(remaining_nodes, max_layer, sep*.4);
      }
  }

  makeLayers(nodes, layer){
      if (nodes.length > 1){
          var stepy = (1 - 2*this.alphay)/(nodes.length-1);
          for (var i=0; i<nodes.length; ++i){
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
      var next_layer = [];
      for (var i=0; i<nodes.length; i++){
          var candidates = nodes[i].children;
          for (var j=0; j < candidates.length; j++){
              if (candidates[j].visited == false && !next_layer.includes(candidates[j])){
                  next_layer.push(candidates[j]);
              }
          }
      }
      if (next_layer.length == 0){
          // find nodes not visited
          let non_visited = [];
          let orphans = [];
          this._nodes.forEach(function(node){
              if (node.visited == false){
                  if (isOrphan(node))
                      orphans.push(node);
                  else
                      non_visited.push(node);
              }
          });
          this.placeNew(non_visited, layer, 0.5);
          layer = this.placeOrphans(orphans);
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
      var nodes = this._nodes;
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
      // number of layers and max number of nodes in each layer
      // has to be found by making the layout
      // there are two approaches to finding the nodes in each layer:
      // 1) each layer has all the neighbors of the nodes in the previous layer
      // 2) follow links and then place non visited nodes on the layer of neighbors OR
      // this layout implements the second of these approaches.
      var depth = this.makeLayers(roots, 1);
      // each layer of tree x = [0+alpha,1-alpha]
      var stepx = (1-2*this.alphax)/(depth-1);
      // posx = alphax + stepx*(depth-1)
      for (var i=0; i<this._nodes.length; ++i){
          this._nodes[i].x = this.alphax + stepx*(this._nodes[i].layer - 1);
      }
  }
};
