define(['./rbush'], function(rbush){

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska
 */

var spatialIndex = function(nodes, edges) {
    var i, j, d, rbushtree, EPS;
    
    EPS = Number.EPSILON || 1e-14;

    
    function getNodeBBox(node){
      return [node.x-EPS, node.y - EPS, node.x + EPS, node.y + EPS];
    }
    
    function getEdgeBBox(edge){
      var x1,x2,y1,y2;
      x1 = edge.source.x;
      y1 = edge.source.y;
      x2 = edge.target.x;
      y2 = edge.target.x;
      return [Math.min(x1,x2), Math.min(y1,y2), Math.max(x1,x2), Math.max(y1,y2)];
    }
   
    function initTree(){
      rbushtree = rbush();

      d = [];
      d.length = nodes.length + edges.length;

      for(i = 0, j = 0;i < nodes.length; i++){
	d[i] = getNodeBBox(nodes[i]);
	d[i].push({node:nodes[i]});
      }
      
      for(j = 0;j < edges.length;i++, j++){
	d[i] = getEdgeBBox(edges[j]);
	d[i].push({edge:edges[j]});
      }
      
      rbushtree.load(d);
    }
    
    
    //distance from point to point
    function distance(x1,y1,x2,y2){
      var dx = x1 - x2;
      var dy = y1 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    
    //distance from point to line
    function pDistance(x, y, x1, y1, x2, y2) {
      var A = x - x1;
      var B = y - y1;
      var C = x2 - x1;
      var D = y2 - y1;

      var dot = A * C + B * D;
      var len_sq = C * C + D * D;
      var param = -1;
      if (len_sq != 0) //in case of 0 length line
	  param = dot / len_sq;

      var xx, yy;

      if (param < 0) {
	xx = x1;
	yy = y1;
      }
      else if (param > 1) {
	xx = x2;
	yy = y2;
      }
      else {
	xx = x1 + param * C;
	yy = y1 + param * D;
      }

      var dx = x - xx;
      var dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    
    function sortByDistances(e1, e2){
      return e1.dist - e2.dist;
    }
    
    this.find = (x,y, radius, nodes, edges) => {
      var ret = {};
      if(edges)
	ret.edges = [];
      if(nodes)
	ret.nodes = [];
      
      var data = rbushtree.search([x - radius, y - radius, x + radius,  y+ radius], true);
      
      for(var i = 0; i < data.length; i++){
	var e = data[i][4];
	if(e.node && nodes){
	  var dist = distance(x,y,e.node.x,e.node.y);
	  if(dist > radius)
	    continue;

	  ret.nodes.push({node:e.node, dist: dist});
	}
	if(e.edge && edges){
	  var dist = pDistance(x,y,e.edge.source.x,e.edge.source.y,e.edge.target.x,e.edge.target.y);

	  if(dist > radius)
	    continue;
	  ret.edges.push({edge:e.edge, dist: dist});
	}
      }
      
      if(ret.nodes){
	ret.nodes.sort(sortByDistances);
      }
      if(ret.edges){
	ret.edges.sort(sortByDistances);
      }
	
      return ret;
    }
    
    

    initTree();
};

module.exports = spatialIndex;

});