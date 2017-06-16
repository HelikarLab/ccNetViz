/**
 *  Copyright (c) 2017, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Renato Fabbri
 */

getDepth = function (obj) {
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
  // make hierarchy of nodes if input is with node edge (default)
  // only one root node supported for now
  // left-right tree by default, let user choose
  // top-down, bottom-top, right-left
  // hierarchical layouts for non-trees (cyclical graphs) should be
  // implemented separately
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this.visited_leafts = 0;
    this.layer = 1;
    this.visited_leafs_all += 0;
  }

  centerNodesLayers(root){
      var visited_leafts = 0;
      // normalize y by the number of siblings
      var node = root;
      // get number of leafs and number of siblings
      // divide y by the number of siblings siby
      // divide siby by the number of leafs leafsy
      // posy = (siby/2)+(siby)*centered_siblings + (leafsy*leaf_step)/2
      // branch order is for now stable but unpredictable for an unknown graph at the moment
      // see layouts.cri
      node.children.forEach(function(child){
          if (child.centered == false){
              // find the number of visited leafs
              this.layer++;
              visited_leafs += centerNodes(child);
              this.layer--;
              // center node with respect to all leafts found
          }
      }
      if (node.children == 0){
          visited_leafs++;
      }
      // moving to parent, position node in the middle of all the
      // leafs found in all and from it
      this.visited_leafs_all += visited_leafs;
      node.y = stepy*(this.visited_lefts_all+visited_leafs/2) + alphay
      node.x = (this.layer-1)*stepx + alphax
      // make positions directly by the layer and the number of leafs
      // reachable from each node
      // posy = leafs+(stepy)*centered_siblings + (leafsy*leaf_step)/2
      // have to decide ordering of banches
      return visited_leafs;
  }
  drawTree (root){
      node = root;
      node.visited = true;
      node.x = alphax+stepx*(this.layer-1)
      node.y = alphay+stepy*(this.visited_leafs)
      // visit children until leafs
      node.children.forEach(function(child){
          if(child.visited != true){
              this.layer++; // walks to the right
              drawTree(chid);
          }
      }
      if(node.children.length == 0){
          this.visited_leafs++;
      });
      // visit parent until a child not visited is found
      node.parent_.children.forEach(function(sibling){
          if(sibling.visited != true){
              drawTree(sibling);
          }
      });
      this.layer--; // visited all siblings, go to the left
   }
}

  apply () {
      // nodes = this._nodes;
      // make hierarchy, annotate parent(s) and children in the nodes
      // this layout can be run on any graph actually
      // for which the children might be selected e.g. for their degree
      // draw can be decided on other measures, such as closeness centrality or clustering
      nodes.forEach(function(n,i){
          n.parents = [];
          n.children = [];
      });
      this._edges.forEach(function(e,i){
          e.source.children.push(e.target);
          e.target.parents.push(e.source);
      });
      // find the root
      nodes.every(function(node){
          if (node.parents.length == 0){
              root = node;
              return false
          }
          else return true
      });
      depth = getDepth(root);
      // each layer of tree x = [0+alpha,1-alpha]
      alphax = .05;
      stepx = (1-2*alphax)/(depth-1);
      // posx = alphax + stepx*(depth-1)

      // find the number of leafs to distribute nodes vertically
      var leafs = 0;
      nodes.forEach(function(node){
          if (node.children.length == 0){
              leafs++;
          }
      });
      // each leaf y = [0+alpha,1-alpha]
      alphay =  .05;
      stepy = (1-2*alphay)/(leafs-1);
      // posy = alphay + stepy*(leafn-1)
      
      // give nodes their positions
      // plot each branch in depth first,
      // increment y position for each leaf
      // backtracking to go from leaf to parents
      // and decide if parent is visited

      drawTree(root);
      this.step_leaf = 1/this.visited_leafs
      centerNodes(root);

      //bottom-up
      //nodes.forEach(function(node){
      //    if (node.children.length == 0){
      //        // leaft, start upwards march
      //        node.parents.forEach(function(parent_){
      //            // leaft's parents are aways visited
      //            parent_.children.forEach(function(child){
      //                if (!child.visited){
      //                    child.parentsforEach(function(cparent){
      //                        cparent.visited = true;
      //                    });

          }
      });
  }
};

