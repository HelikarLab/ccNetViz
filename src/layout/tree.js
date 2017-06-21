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


function drawTreeTop(root, visited_leafs_parent=0, layer=1){
    // each node is in vertically on the top of the stack of its leafs
    var node = root;
    node.visited = true;
    node.x = alphax+stepx*(layer-1)
    node.y = alphay+stepy*(visited_leafs_parent)
    // visit children until leafs
    visited_leafs = 0;
    node.children.forEach(function(child){
        if(child.visited != true){
            visited_leafs += drawTree(chid, layer+1);
        }
    });
    if(node.children.length == 0){
        visited_leafs++;
    }
    return visited_leafs;
}
export default class {
  // make hierarchy of nodes if input is with node edge (default)
  // only one root node supported for now
  // left-right tree by default, let user choose
  // top-down, bottom-top, right-left
  // hierarchical layouts for non-trees (cyclical graphs) should be
  // implemented separately
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
  }

  drawTreeCentered(root, visited_leafs_parent=0, layer=1){
      // each node is vertically centered with respect to nodes
      root.centered = true;
      // branch order is for now stable but unpredictable for an unknown graph at the moment, see layouts.cri
      var visited_leafs = 0;
      for (var i=0; i < root.children.length; i++){
          var child = root.children[i];
          if (child.centered != true){
              console.log("centering children");
              visited_leafs += this.drawTreeCentered(child, visited_leafs+visited_leafs_parent, layer+1);
          }
      }
      if (root.children == 0){
          visited_leafs++;
      }
      // moving to parent, position node in the middle of all the
      // leafs found in all and from it
      root.y = this.stepy*(visited_leafs_parent+(visited_leafs-1)/2) + this.alphay;
      root.vs=visited_leafs;
      root.vsp=visited_leafs_parent;
      root.x = (layer-1)*this.stepx + this.alphax;
      return visited_leafs;
  }
  apply () {
      console.log("applying tree layout");
      var nodes = this._nodes;
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
      for (var i = 0; i < nodes.length; i++){
          if (nodes[i].parents.length == 0){
              var root = nodes[i];
              break;
          }
      }
      var depth = getDepth(root);
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

      // give nodes their positions
      // plot each branch in depth first,
      // increment y position for each leaf
      // backtracking to go from leaf to parents
      // and decide if parent is visited (always in tree layout)

      // drawTreeTop(root); // an option to be implemented
      this.drawTreeCentered(root);
      console.log(this._nodes);
  }
};
