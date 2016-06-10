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
    
    function distance(x1,y1,x2,y2){
      var dx = x1 - x2;
      var dy = y1 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    
    this.find = (x,y, radius, nodes, edges) => {
      var ret = [];
      
      var data = rbushtree.search([x - radius, y - radius, x + radius, y + radius], true);
      
      for(var i = 0; i < data.length; i++){
	var e = data[i][4];
	if(e.node && nodes){
	  var dist = distance(x,y,e.node.x,e.node.y);
	  if(dist > radius)
	    continue;

	  ret.push({node:e.node, dist: dist});
	}
//	if(data[i].edge && edges){
//	  ret.push(data[i].edge);
//	}
      }
	
      return ret;
    }
    
    

    initTree();
};

module.exports = spatialIndex;

});