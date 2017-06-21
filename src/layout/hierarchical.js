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

export default class {
  // this layout should handle any digraph
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
  }

  makeLayers(nodes, layer){
      nodes.forEach(function(node, index){
          nodes.visited = true;
          nodes.layer = layer;
          nodes.order = index; // important to order nodes by connection with previous layer
      });
      var next_layer = [];
      for (var i=0; i<nodes.length; i++){
          for (var j=0; j<nodes[i].neighbors.length; j++){
              if (nodes[i].neighbors[j].visited == false){
                  next_layer.push(nodes[i].neighbors[j]);
              }
          }
      }
      this.makeLayers(nodes[i].children, layer+1);
  }

  apply () {
      // left-right tree by default, let user choose
      // top-down, bottom-top, right-left in subsequent versions
      // hierarchical layouts for trees (cyclic graphs) are
      // implemented separately for now
      var nodes = this._nodes;
      // make hierarchy, annotate parent(s) and children in the nodes
      nodes.forEach(function(n,i){
          n.neighbors = [];
          n.centered = false;
      });
      this._edges.forEach(function(e,i){
          e.source.neighbors.push(e.target);
          e.target.neiighbors.push(e.source);
      });
      // find the roots:
      // nodes defined by the user as roots OR
      // nodes with in-degree == 0 OR
      // nodes with greatest in-degree (or degree if undirected graph)
      var roots = [];
      for (var i = 0; i < nodes.length; i++){
          if (nodes[i].parents.length == 0){
              root.push.(nodes[i]);
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
      // var depth = getDepth(root);
      // number of layers and max number of nodes in each layer
      // has to be found by making the layout
      // there are two approaches to finding the nodes in each layer:
      // 1) follow links and then place non visited nodes on the layer of neighbors OR
      // 2) each layer has all the neighbors of the nodes in the previous layer
      // this layout implements the second of these approaches.
      this.makeLayers(roots,layer=1);
      // each layer of tree x = [0+alpha,1-alpha]
      this.alphax = .05;
      this.stepx = (1-2*this.alphax)/(depth-1);
      // posx = alphax + stepx*(depth-1)

      // find the number of leafs to distribute nodes vertically
      var leafs = 0;
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
